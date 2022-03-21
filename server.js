const express=require('express');
const cors=require('cors');
const IPFS = require('ipfs');
const {PythonShell} =require('python-shell');
const CryptoJS = require('crypto-js');
const fs = require('fs')

const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules


const app=express();
app.use(express.json())
app.use(cors())


const decryptWithAES = (ciphertext, de_key) => {
    const passphrase = String(de_key);
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };


app.post('/runPython', (req,res)=> {
    const cid = String(req.body.cid);
    //const password = req.body.password
    console.log(cid);
    const decryptKey = String(req.body.key);
    console.log(decryptKey);
    //console.log(password)
    //initIPFS() QmRaDMVjWzVTXTxij2H12Voh9AKAyUYsBcBdYXV5o4pbL8
    var url = 'curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=' + cid+ '\"';
    //console.log(url)
    const output = execSync(url, { encoding: 'utf-8' });  // the default is 'buffer'
//console.log('Output was:\n', output);
    console.log(output);



//data='U2FsdGVkX19yavjp4l5SMkZbzFpspFX2PrRD9dluwcr7Y+c2EPjDyjFt5LjuX3Tlb8QCk4HxuWHxi0mT+P+z3qC9vP5sjG5IxkSB6taT5ZfTYvMjwrS7gb608rk8F29HZ46iX+XuzwCzYcPXxkH+/iO+sUczXlI4dc10AUlLmbG3fdpqXCaqWyZilnXSk/+k1oj2zQ37ZsNwFc2MC5zFNXRBpy6OfrO8hBLWLcS10WKtqzsCAMHYyPMxK/62g0Vb62KVyITzsTrK0ZaTSaqyOSaviEQa83TYNvj4tk91LxbIXKx3FMAxaJ4n7fYFmKVCMbgXywPd+1zPhFumsYFuxCc+/YOv8xpsGXa1/TlzHfJFxBQkZqD8JfCci5gYithYGrtkKezoEKtg7oCfI4DXoAMvLLcZv6CqyUDL3qPkDrLOxYAIwjdXVEaaPvUW+G8ZRjiyK44XgC+eltuOO4CbtnGRIvsmgh7Zy37pdeN5oaKwVzLqPccu1Qi6rMWuHBxC9hAprkf/v4INLpHV3ZtmlP734rTtkgvfU1d4YU3sV4IkyLkh0yyORMHD5FCua30ShXOAr2cYkX3t91kQgoAtrzoDAg1+PsQzOI2RWcpYPY3BMKcEq42DAoaqieDa2xvZ'
//console.log(typeof(decryptWithAES(output)))

    decrypted = decryptWithAES(output, decryptKey);


  
  
// Write data in 'Output.txt' .
    fs.writeFile('Output.txt', decrypted, (err) => {
      
    // In case of a error throw err.
    if (err) throw err;
})

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
          //scriptPath: 'path/to/my/scripts' //If you are having python_test.py script in same folder, then it's optional.
        args: [cid] //An argument which can be accessed in the script using sys.argv[1]
    };
     
    PythonShell.run('fetch.py', options, function (err, result){
          if (err) throw err;
          // result is an array consisting of messages collected
          //during execution of script.
          console.log('result: ', result.toString());
          //res.send(result.toString())
    

    /*db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], 
    (err,result) => {console.log(err);}
    );*/
});
})

app.post('/testPy', (req,res)=> {
    const username = req.body
    //const password = req.body.password
    console.log(username)

})


const PORT=process.env.PORT || 5002;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
})

