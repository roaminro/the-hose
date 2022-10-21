/* eslint-disable no-multi-spaces */
import { utils } from 'koilib'

export const configs = [
  {
    rpcs: ['https://api.koinos.io'],                            // rpc urls to submit the transactions
    nbMaxTransactions: Number.MAX_SAFE_INTEGER,                 // number maximum of transactions to generate
    wif: '5KKuMC.......................',                       // wif of the account
    rcLimit: '100000000',                                       // rc limit for each transaction
    payer: '1LZgKPHVLqrVv418UbFCymU5NNwSG2sUpm',                // optional: set a payer for the rc
    contractId: '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ',           // id of the contract to call
    abi: utils.tokenAbi,                                        // abi of the contract to call
    func: 'transfer',                                           // name of the contract function to call
    args: {                                                     // arguments for the contract functions (a tKoin transfer in this case)
      from: '1DJ9fBYAvt........G7axPbir',
      to: '1LZgKPHVLqrVv418UbFCymU5NNwSG2sUpm',
      value: '1'
    }
  },
  {
    rpcs: ['https://api.koinos.io'],
    nbMaxTransactions: Number.MAX_SAFE_INTEGER,
    wif: '5KffRuAt................',
    rcLimit: '100000000',
    contractId: '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ',
    abi: utils.tokenAbi,
    func: 'transfer',
    args: {
      from: '1GEb7gdnjE8........uXM2J3BVs8',
      to: '1LZgKPHVLqrVv418UbFCymU5NNwSG2sUpm',
      value: '1'
    }
  }
]
