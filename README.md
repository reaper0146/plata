## Plata Ethereum Blockchain DApp

This is an Ethereum-based DApp using IPFS. With this application users are able to sell and buy files (can be data files) using "ether". The file is stored on the InterPlanetary File Server (IPFS), a decentralized cloud storage platform. The file that is stored on the server is encrypted. Access control has also been added for the files such that once a file is bought it can be accessed again in the future without buying it again. This application also requires the user to use the extenstion Metamask; one can download this extension at that the following site: https://metamask.io/

Plata video: https://youtu.be/SnVOjttbFm4
Plata plus Golem: https://www.youtube.com/watch?v=gdRlzyWdEwE

## For local development of frontend execute the following code:

Dependencies: Node 16.10, Golem, Javascript, Python3

1. Download and install Ganache and metamask extension in suitable browser (chrome/firefox)

Ganche: https://www.trufflesuite.com/ganache

Metamask: https://metamask.io/

2. Run Ganache
Ganche: https://www.trufflesuite.com/ganache

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
```

7. Compile and then deploy contract to ganache network using below command
```
truffle compile
truffle migrate 
```

8. Run website on local machine
```
npm run dev
```

9. The website is now hosted at
```
localhost:3000/
```

10. Install and setup Golem by following the tutorial in the link
```
https://handbook.golem.network/requestor-tutorials/flash-tutorial-of-requestor-development
```
11. After Golem setup run
```
node server
```

12. Refer to videos on how it works after it is hosted on localhost