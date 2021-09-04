import React, { Fragment, useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState(null);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedFile(null);
  };


  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

        try {
        const res = await axios.post("/upload", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });

        const response = res.data;
        setUploadedFile(response);
        } catch (err) {
        if (err.response.status === 500) {
            console.log("Some problem with the server.");
        } else {
            console.log(err.response.data.msg);
        }
        }
  };

  let imgStyle = {
    height: "20%",
    width: "auto",
    "max-width": "600px",
    "max-height": "200px",
  };
 
  let getAlertView = () => {
    if (uploadedFile) {
      return uploadedFile.error ? (
        <>
          <img
            className="mt-4"
            style={imgStyle}
            src={uploadedFile.filePath}
            alt=""
          />

          <div className="alert alert-danger mt-4 text-center" role="alert">
            {uploadedFile.error}
          </div>
        </>
      ) : (
        <>
          <img
            className="mt-4"
            style={imgStyle}
            src={uploadedFile.filePath}
            alt=""
          />

          <div class="alert alert-success mt-4 text-center" role="alert">
            CODE : {uploadedFile.code}
          </div>
        </>
      );
    } else return null;
  };
  
  let oAlertView = getAlertView();
  let oPleaseSelectView = !file ?(
        <div class="alert alert-info mt-4 text-center" role="alert">
        Please select an image to upload.
        </div>): null;

  return (
    <Fragment>
      <form onSubmit={uploadFile}>
        <input
          type="file"
          className="form-control"
          style={{ width: "50%","display":"inline-block" }}
          id="inputGroupFile02"
          onChange={onFileChange}
        />
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary mt-4"
          style={{ width: "10%","display":"block" }}
        ></input>
        <div className="form-control mt-4 text-center" style={{ width: "50%","display":"inline-block" }}>
          {oAlertView || oPleaseSelectView}
        </div>
      </form>
    </Fragment>
  );

  
};
export default FileUpload;
