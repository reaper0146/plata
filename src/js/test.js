const CryptoJS = require('crypto-js');

const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules

const output = execSync('curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=QmRaDMVjWzVTXTxij2H12Voh9AKAyUYsBcBdYXV5o4pbL8\"', { encoding: 'utf-8' });  // the default is 'buffer'
//console.log('Output was:\n', output);


const decryptWithAES = (ciphertext) => {
    const passphrase = '123';
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

data='U2FsdGVkX19yavjp4l5SMkZbzFpspFX2PrRD9dluwcr7Y+c2EPjDyjFt5LjuX3Tlb8QCk4HxuWHxi0mT+P+z3qC9vP5sjG5IxkSB6taT5ZfTYvMjwrS7gb608rk8F29HZ46iX+XuzwCzYcPXxkH+/iO+sUczXlI4dc10AUlLmbG3fdpqXCaqWyZilnXSk/+k1oj2zQ37ZsNwFc2MC5zFNXRBpy6OfrO8hBLWLcS10WKtqzsCAMHYyPMxK/62g0Vb62KVyITzsTrK0ZaTSaqyOSaviEQa83TYNvj4tk91LxbIXKx3FMAxaJ4n7fYFmKVCMbgXywPd+1zPhFumsYFuxCc+/YOv8xpsGXa1/TlzHfJFxBQkZqD8JfCci5gYithYGrtkKezoEKtg7oCfI4DXoAMvLLcZv6CqyUDL3qPkDrLOxYAIwjdXVEaaPvUW+G8ZRjiyK44XgC+eltuOO4CbtnGRIvsmgh7Zy37pdeN5oaKwVzLqPccu1Qi6rMWuHBxC9hAprkf/v4INLpHV3ZtmlP734rTtkgvfU1d4YU3sV4IkyLkh0yyORMHD5FCua30ShXOAr2cYkX3t91kQgoAtrzoDAg1+PsQzOI2RWcpYPY3BMKcEq42DAoaqieDa2xvZ'
console.log(typeof(decryptWithAES(output)))

decrypted = decryptWithAES(output)

const fs = require('fs')
  
  
// Write data in 'Output.txt' .
fs.writeFile('Output.txt', decrypted, (err) => {
      
    // In case of a error throw err.
    if (err) throw err;
})