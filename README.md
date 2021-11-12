## Plata Ethereum Blockchain DApp

This is an Ethereum-based DApp using IPFS. With this application users are able to sell and buy files (can be data files) using "ether". The file is stored on the InterPlanetary File Server (IPFS), a decentralized cloud storage platform. This application also requires the user to use the extenstion Metamask; one can download this extension at that the following site: https://metamask.io/

Youtube: https://www.youtube.com/watch?v=_nVEWs2B1_I

## For local development of frontend execute the following code:

1. Download and install Ganache and metamask extension in suitable browser (chrome/firefox)

Ganche: https://www.trufflesuite.com/ganache

Netmask: https://metamask.io/

2. Run Ganache

3. Import ganache accounts to metamask using the private key

There is a key symbol beside each account, click one of the account address and copy the private key. Now open MetaMask settings and click the option of import accounts. Inside the “Private Key” field, just paste the copied key information.

4. Change metamask network to localhost 7545

Click top right icon -> settings -> networks -> local host 8545 -> change name and port to 7545 -> save

See similar details at https://www.linkedin.com/pulse/using-ganache-ethereum-emulator-metamask-farhan-khan/

5. Download the repository using git clone

6. Install necessary dependencies using npm

```
cd plata
npm install
npm install -g truffle
```

7. Deploy contract to ganache network using below command
```
truffle migrate --network ganache  
```

8. Run website on local machine
```
npm run dev
```
