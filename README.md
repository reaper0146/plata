## Plata Ethereum Blockchain DApp

This is an Ethereum-based DApp using IPFS. With this application users are able to sell and buy files (can be data files) using "ether". The file is stored on the InterPlanetary File Server (IPFS), a decentralized cloud storage platform. This application also requires the user to use the extenstion Metamask; one can download this extension at that the following site: https://metamask.io/

## For local development of frontend execute the following code:

1. Download and install Ganache and metamask extension in suitable browser (chrome/firefox)

Ganche: https://www.trufflesuite.com/ganache

Netmask: https://metamask.io/


2. Download the repository using git clone

3. Install necessary dependencies using npm

```
cd /plata
npm install
```

4. Run Ganache

See https://www.linkedin.com/pulse/using-ganache-ethereum-emulator-metamask-farhan-khan/

5. Deploy contract to ganache network using below command
```
npm install -g truffle
truffle migrate --network ganache  
```
6. Import ganache accounts to metamask using the private key

There is a key symbol beside each account, click one of the account address and copy the private key. Now open MetaMask settings and click the option of import accounts. Inside the “Private Key” field, just paste the copied key information.

7. Run on local machine
```
npm run dev
```
