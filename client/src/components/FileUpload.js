import React,{Fragment, useState} from 'react'
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState();
    const [uploadedFile, setUploadedFile] = useState(null);
    const onFileChange = e =>{
        setFile(e.target.files[0]);
    }
    const uploadFile = async e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try{
            const res = await axios.post('/upload', formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            });

            const response = res.data;
            setUploadedFile(response); 

        }catch(err){
            if(err.response.status === 500){
                console.log("Some problem with the server.")
            }else{
                console.log(err.response.data.msg)
                ;
            }
        }
    }; 
    let imgStyle ={
        'height':'20%',
        'width':'30%',
        "max-width":"200px"
    }
    let getAlertView =()=>{
        if(uploadedFile){
        return uploadedFile.error ? (<>
            
                <img className="mt-4" style={imgStyle}src = {uploadedFile.filePath} alt=""/>
               
                      <div className="alert alert-danger mt-4 text-center" role="alert">
                        {uploadedFile.error}
            </div></>) :  (<>
		                        <img className="mt-4" style={imgStyle} src = {uploadedFile.filePath} alt=""/>
	                    
                            <div class="alert alert-success mt-4 text-center" role="alert">
                                CODE : {uploadedFile.code}
                        </div>
                      </>);
        }else
        return null;
    }      
    let oAlertView = getAlertView();            
    return (
        <Fragment>
            <form onSubmit={uploadFile}>
                <input type="file" className="form-control" id="inputGroupFile02" onChange={onFileChange}/>
                <input type="submit" value="Upload" className="btn btn-primary mt-4" ></input>
            </form>
            {/* <div className="form-control"> */}
            {oAlertView}
            {/* </div> */}
        </Fragment>
    )
}
 export default FileUpload;