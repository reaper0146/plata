const express=require('express');
const cors=require('cors');
const IPFS = require('ipfs');
const {PythonShell} =require('python-shell');

const app=express();
app.use(express.json())
app.use(cors())

app.post('/runPython', (req,res)=> {
    const cid = String(req.body.cid)
    //const password = req.body.password
    //console.log(typeof(cid))
    //console.log(password)
    //initIPFS()
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


const PORT=process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
})

