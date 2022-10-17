import { Worker } from 'worker_threads'

const koinContractId = '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ'

const accounts = [
    {
        rpcs: ['https://api.koinos.io'],
        nbMaxTransactions: Number.MAX_SAFE_INTEGER,
        wif: '5Hs4H2Ks2EyF.......edNNBJC4jcM1nU',
        to: '1LZgKPHVLqrVv418UbFCymU5NNwSG2sUpm',
        value: '1',
        rcLimit: '100000000'
    },
    {
        rpcs: ['https://api.api.koinos.io'],
        nbMaxTransactions: Number.MAX_SAFE_INTEGER,
        wif: '5Jzq...fmrC',
        to: '1LZgKPHVLqrVv418UbFCymU5NNwSG2sUpm',
        value: '1',
        rcLimit: '100000000'
    },
]

const workers = []

accounts.forEach((accounts) => {
    const { nbMaxTransactions, wif, rpcs, to, value, rcLimit } = accounts
    workers.push(new Worker("./worker.js", {
        workerData: {
            nbMaxTransactions,
            wif,
            rpcs,
            koinContractId,
            to,
            value, 
            rcLimit
        }
    }))
})
