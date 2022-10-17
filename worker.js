import { Signer, Contract, Provider, utils } from 'koilib'
import koinosProto from './node_modules/koilib/lib/protoModules/protocol-proto.js'
import { workerData } from 'worker_threads'

const {
  wif,
  nbMaxTransactions,
  rpcs,
  rcLimit,
  contractId,
  func,
  args,
  abi
} = workerData

const provider = new Provider(rpcs)
const signer = Signer.fromWif(wif)
signer.provider = provider

const contract = new Contract({
  id: contractId,
  abi,
  provider,
  signer
})

const chainId = await provider.getChainId()

let nonce = await provider.getNonce(signer.address)
console.log(`${signer.address}: nonce ${nonce}`)

const rc = await provider.getAccountRc(signer.address)
console.log(`${signer.address}: rc ${rc}`)

const nonceMessage = koinosProto.koinos.chain.value_type.create({
  uint64_value: String(nonce)
})

let nonceEncoded
let b64Nonce

for (let index = 0; index < nbMaxTransactions; index++) {
  nonce++

  nonceMessage.uint64_value = `${nonce}`

  nonceEncoded = koinosProto.koinos.chain.value_type
    .encode(nonceMessage)
    .finish()

  b64Nonce = utils.encodeBase64url(nonceEncoded)

  try {
    const { transaction, receipt } = await contract.functions[func](args, {
      rcLimit,
      nonce: b64Nonce,
      chainId
    })

    console.log(`${signer.address}: tx #${index} / id ${transaction.id} / mana: disk ${receipt.disk_storage_used ?? 0} | compute ${receipt.compute_bandwidth_used ?? 0} | network ${receipt.network_bandwidth_used ?? 0}`)
  } catch (error) {
    // if errors out just retry
    console.log(`${signer.address}:`, error)
    nonce--
  }
}
