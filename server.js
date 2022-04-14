const express=require('express');
const cors=require('cors');
const IPFS = require('ipfs');
const {PythonShell} =require('python-shell');
const CryptoJS = require('crypto-js');
const fs = require('fs')
const execSync = require('child_process').execSync;

const app=express();
app.use(express.json())
app.use(cors())


const decryptWithAES = (ciphertext, de_key) => {
    const passphrase = String(de_key);
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

app.post('/runPython', async (req,res)=> {
    const cid = String(req.body.cid);
    console.log(cid);
    const decryptKey = String(req.body.key);
    console.log(decryptKey);
    var url = 'curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=' + cid+ '\"'
    //console.log(url)
    const output = execSync(url, { encoding: 'utf-8' });
    decrypted = decryptWithAES(output, decryptKey)
    console.log(decrypted)
      
    // Write data to 'Output.txt' .
    fs.writeFile('data/hash.json', decrypted, (err) => {
      
    // In case of a error throw err.
    if (err) throw err;
})

    let options = {
        mode: 'text',
        pythonOptions: ['-u'] // get print results in real-time
          //scriptPath: 'path/to/my/scripts' //If you are having python_test.py script in same folder, then it's optional.
        //args: [cid] //An argument which can be accessed in the script using sys.argv[1]
    };
     
    PythonShell.run('requestor.py', options, function (err, result){
          // result is an array consisting of messages collected
          //during execution of script.
          console.log('result: ', result.toString());
          //delete the file after it's used
        fs.unlink('data/hash.json', (err) => {
            if (err) {
            console.error(err)
            return
        }
    });
      
          //res.send(result.toString())
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