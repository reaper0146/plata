const IPFS = require('ipfs-mini');
const CryptoJS = require("crypto-js");
const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

const encrypt = (text) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

const decrypt = (data) => {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

uploadFile = () => {
  const file = document.getElementById('input').files[0];
  let reader = new window.FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = () => convertToBuffer(reader);

  convertToBuffer = async(reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS
      const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
      //setState({buffer});
 //   console.log(data1);\
 ipfs.add(buffer, async (err,hash) => {
      if (err) {
          return console.log(err)
      }
      
      $('#hashvalue').text(hash);
      $('#ipfslinktitle').text('Your IPFS Link');
      $('#ipfslink').text('https://ipfs.infura.io/ipfs/' + hash);
      const hashenc = encrypt(hash)
      console.log(test)
      console.log(hashenc)
      $('#hashvalue1').text(hashenc);


      
      
      });
  };

};

submitFile = () => {
$('#hashvalue').text('');
$('#ipfslink').text('');
$('#ipfslinktitle').text('');
     
  console.log("Submitted!")

};

getLink = () => {
  //hash = 'hello'
  enchash = $('#purchaselink').text();
  const hash = decrypt(enchash)
  
  //test2 = $('#purchaselink').val();
  //$('#ipfslink').text('');
  //$('#ipfslinktitle').text('https://ipfs.infura.io/ipfs/' + hash);
  console.log(hash)
  $('#testlink').text('https://ipfs.infura.io/ipfs/' + hash);
  //console.log(test2)     
  console.log("Get link!")
  
  };