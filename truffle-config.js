const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();

module.exports = {
     // See <http://truffleframework.com/docs/advanced/configuration>
     // to customize your Truffle configuration!
     networks: {
          ganache: {
               host: "localhost",
               port: 7545,
               network_id: '*', // Match any network id
               gas: 4700000
          },
          rinkeby: {
               host: "localhost",
               port: 8545,
               network_id: 4,
               gas: 4700000
          },
          ropsten: {
               provider: () => {
                    return new HDWalletProvider(
                         process.env.MNEMONIC,
                         "https://ropsten.infura.io/v3/" + process.env.INFURA_PROJECT_ID);
          },
               network_id: 3,
               gas: 4500000,
               gasPrice: 10000000000
          }
     }
};