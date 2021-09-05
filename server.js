const express = require('express');
const fileUpload = require('express-fileupload');
const QRReader = require('qrcode-reader');
const fs = require('fs');

const app = express();
app.use(fileUpload());

app.listen(5000,()=>console.log("server started..."));

//Upload Endpoint
app.post('/upload',(req,res)=>{
    if(!req.files){
        return res.status(400).json({msg: "No file uploaded"});
    }

    const file = req.files.file;
    const path =`${__dirname}/client/public/uploads/${file.name}`;
    try {
        if(!fs.existsSync(path)){
            file.mv(path, err=>{
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }});
        }}catch(err){

        }

        async function run() {
            const img = file; //await jimp.read(path);
            const qr = new QRReader();
            const value = await new Promise((resolve, reject) => {
              qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
              qr.decode(img.bitmap);
            });
            return value.result;
          }
        
        run()
          .then((resp) => {
            res.json({
              fileName: file.name,
              filePath: `/uploads/${file.name}`,
              code: `${resp}`,
            });
          })
          .catch((error) => {
            console.log(error);
            res.json({
              error: "Please select an image with valid QR code",
              filePath: `/uploads/${file.name}`,
            });
          });
        
        
    });
