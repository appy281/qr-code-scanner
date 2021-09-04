const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(fileUpload());

app.listen(5000,()=>console.log("server started..."));



//Upload Endpoint
app.post('/upload',(req,res)=>{
    if(req.files === null){
        return res.status(400).json({msg: "No file uploaded"});
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads${file.name}`, err=>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
    });
});