import { Signer, Contract, Provider, utils } from 'koilib'
import koinosProto from './node_modules/koilib/lib/protoModules/protocol-proto.js'
import { workerData } from 'worker_threads'

const { wif, nbMaxTransactions, rpcs, koinContractId, to, value, rcLimit } = workerData

const provider = new Provider(rpcs)
const signer = Signer.fromWif(wif)
signer.provider = provider

const koinContract = new Contract({
  id: koinContractId,
  abi: utils.tokenAbi,
  provider,
  signer,
});

const koin = koinContract.functions;

const chainId = await provider.getChainId()

let nonce = await provider.getNonce(signer.address)

console.log(`${signer.address}: nonce ${nonce}`)

const rc = await provider.getAccountRc(signer.address)
console.log(`${signer.address}: rc ${rc}`)

for (let index = 0; index < nbMaxTransactions; index++) {
  nonce++

  const message = koinosProto.koinos.chain.value_type.create({
    uint64_value: String(nonce),
  });

  const nonceEncoded = koinosProto.koinos.chain.value_type
    .encode(message)
    .finish()

  const b64Nonce = utils.encodeBase64url(nonceEncoded);

  try {
    const { transaction, receipt } = await koin.transfer({
      from: signer.address,
      to,
      value,
    }, {
      rcLimit,
      nonce: b64Nonce,
      chainId
    })
    
    console.log(`${signer.address}: tx #${index} / id ${transaction.id}`)
  } catch (error) {
    // if errors out just retry
    console.log(`${signer.address}:`, error)
    nonce--
  }
}
