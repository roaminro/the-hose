# the-hose
A tool to generate tons of transfers :)

## installation
- install NodeJS 16+
- download this repository
- install packages (`yarn install` or `npm install`)

## instructions

Open file `main.js` and add the accounts you want to use to generate the transfers.

Configuration example:
```js
const accounts = [
    {
        rpcs: ['https://api.koinos.io'],            // rpc urls to submit the transactions
        nbMaxTransactions: Number.MAX_SAFE_INTEGER, // number maximum of transactions to generate
        wif: '5Hs4H2Ks2EyF.......edNNBJC4jcM1nU',   // wif of the account
        to: '1LZgKPHVLqrVv418UbFCymU5NNwSG2sUpm',   // receiver of the transfer
        value: '1',                                 // amount to transfer
        rcLimit: '100000000'                        // rc limit for each transaction
    },
    {
        rpcs: ['https://api.koinos.io'],
        nbMaxTransactions: Number.MAX_SAFE_INTEGER,
        wif: '5Jzq...fmrC',
        to: '1LZgKPHVLqrVv418UbFCymU5NNwSG2sUpm',
        value: '1',
        rcLimit: '100000000'
    },
]
```