import React, {useState} from "react";
import * as fileService from "../../services/fileService";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import RenderImg from "./renderImg";

function FileUpload() {
   const [files, setFiles] = useState(null);
   const [filesImage, setFilesImage] = useState({image: ""});

   function onFileChange(e) {
      console.log("onFileChange", e);
      setFiles(() => {
         let formData = new FormData();
         for (let i = 0; i < e.target.files.length; i++) {
            formData.append("file", e.target.files[i]);
         }
         return formData;
      });
   }

   //this is clicking the upload button, to activiate file service
   function onUploadClicked() {
      fileService.sendFile(files).then(onFileUploadSuccess).catch(onError);
   }

   const onError = () => {
      console.log("ErrorERRORERROR");
   };

   //on success will log the response.
   const onFileUploadSuccess = (response) => {
      console.log("onFileUploadSuccess", response);
      setFilesImage((prevState) => {
         const pd = {...prevState};
         pd.image = response;
         return pd;
      });
      console.log(filesImage);
   };


   const renderImage = () => {
      console.log("mapimg", filesImage);
      if (filesImage.image.length === 0) {
         return <div>Please upload the Image</div>;
      } else {
         return <RenderImg listImg={filesImage.image} />;
      }
   };

   return (
      <React.Fragment>
         <div className="container">
            <header className="pt-3">
               <h3>File</h3>
            </header>
            <div>
               <input type="file" onChange={onFileChange} multiple />
               <button
                  className="btn btn-primary btn-sm"
                  onClick={onUploadClicked}>
                  upload
               </button>
            </div>

            <div>
               {renderImage()}
            </div>
         </div>
      </React.Fragment>
   );
}

export default FileUpload;
