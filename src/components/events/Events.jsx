import React, {useState, useEffect} from "react";
import "./eventStyle.css";
import * as eventService from "../../services/eventService";
import RenderEventLeft from "./RenderEventLeft";
import RenderEventRight from "./RenderEventRight";

import {useNavigate} from "react-router-dom";

import toastr from "toastr";

import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";

function Events() {
   const [pageData, setPageData] = useState({
      arrayOfEvent: [],
      eventComponents: [],
      firstEventComponents: [],
      pageIndex: 1,
      pageSize: 5,
      total: 10,
   });

   const [searchData, setSearchData] = useState({
      searchStart: "2022-12-01",
      searchEnd: "2022-12-8",
   });

   const [emailData] = useState({
      to: ["user@example.com"],
      bcc: "user@example.com",
      body: "fdsafadfasdfadf",
      name: "string",
   });

   const [files, setFiles] = useState(null);

   // const [filesImage, setFilesImage] = useState({image: ""});

   const onFormFieldChange = (e) => {
      const target = e.target;
      const value = target.value;
      const name = target.name;

      setSearchData((prevState) => {
         const newUserObject = {...prevState};
         newUserObject[name] = value;
         return newUserObject;
      });
      console.log("i am name", searchData.searchString);
   };

   const navigate = useNavigate();

   const onEditRequested = (anEvent) => {
      console.log("i am anEvent", anEvent);
      const stateForTransports = {type: "EVENT_VIEW", payload: anEvent};
      console.log("i am stateForTransports", stateForTransports);
      navigate(`/Events/EventForm/${anEvent.id}`, {state: stateForTransports});
   };
 
   useEffect(() => {
      eventService
         .getEventPaginatedFeeds(pageData.pageIndex - 1, pageData.pageSize)
         .then(onGetEventSuccess)
         .catch(onGetEventError);
   }, []);

   // for feeds
   // const onGetEventSuccess = (response) => {
   //    let tempArrayEvent = response.data.item;
   //    let keys = Object.keys(tempArrayEvent);
   //    console.log("i am onGetEventSuccess", keys, tempArrayEvent);
   //    let newArrayEvent = [];
   //    for (let i = 0; i < keys.length; i++) {
   //       newArrayEvent.push(...tempArrayEvent[keys[i]]);
   //    }
   //    setPageData((prevState) => {
   //       const pd = {...prevState};
   //       pd.arrayOfEvent = newArrayEvent;
   //       pd.eventComponents = newArrayEvent.map(mapString);
   //       pd.firstEventComponents = mapFirstEvent(newArrayEvent[0]);
   //       return pd;
   //    });
   // };

   const onGetEventSuccess = (response) => {
      let tempArrayEvent = response.data.item.pagedItems;
      console.log("i am onGetEventSuccess", tempArrayEvent);
      let newArrayEvent = [];
      for (let i = 0; i < tempArrayEvent.length; i++) {
         newArrayEvent.push(tempArrayEvent[i]);
      }
      setPageData((prevState) => {
         const pd = {...prevState};
         pd.arrayOfEvent = newArrayEvent;
         pd.eventComponents = newArrayEvent.map(mapString);
         pd.firstEventComponents = mapFirstEvent(newArrayEvent[0]);
         return pd;
      });
   };

   const onGetEventError = () => {
      toastr.error("Error");
      console.log("ErrorERRORERROR");
   };

   const onEmailSuccess = () => {
      console.log("Good Great Email Success");
   };

   const onRenderRequested = (anEvent) => {
      console.log("onRenderRequested", anEvent);
      setPageData((prevState) => {
         const pd = {...prevState};
         pd.firstEventComponents = mapFirstEvent(anEvent);
         return pd;
      });

      eventService
         .sendEmail(emailData)
         .then(onEmailSuccess)
         .catch(onGetEventError);
   };


   // this is like onformfield change , change the input of the field
   //push the data on to the form
   function onFileChange(e) {
      console.log("onFileChange",e);
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
      eventService
         .sendFile(files)
         .then(onFileUploadSuccess)
         .catch(onGetEventError);
   }

   //on success will log the response.
   const onFileUploadSuccess = (response) => {
      console.log("onFileUploadSuccess", response);
      // let mappedFiles = response.map(mapFile);
      // console.log("mappedFiles", mappedFiles);
      
   };

   // function mapFile(files) {
   //    return {src: files};
   // }

   const mapString = (eventPost) => {
      return (
         <RenderEventRight
            theEvents={eventPost}
            key={eventPost.id}
            onEventClickedForEdit={onEditRequested}
            onEventClickedForRender={onRenderRequested}
         />
      );
   };

   const mapFirstEvent = (eventPost) => {
      // console.log("i am mapFirstEvent", eventPost);
      return (
         <RenderEventLeft
            theEvents={eventPost}
            key={eventPost.id}
         />
      );
   };

   const paginationStyle = {textAlign: "center"};

   const pagination = (current) => {
      setPageData((prevState) => {
         const newPage = {...prevState};
         newPage.pageIndex = current;
         return newPage;
      });
      eventService
         .getEventPaginatedFeeds(current - 1, pageData.pageSize)
         .then(onGetEventSuccess)
         .catch(onGetEventError);
   };

   const renderEventRight = () => {
      // console.log("i am mapstring", pageData.eventComponents);

      return (
         <div>
            <Pagination
               style={paginationStyle}
               className="friendsPagination"
               locale={locale}
               current={pageData.pageIndex}
               pageSize={pageData.pageSize}
               total={pageData.total}
               onChange={pagination}></Pagination>
            {pageData.eventComponents}
         </div>
      );
   };

   // const renderFileImg = () => {
   //    // console.log("i am files", files);
   //    return <div>{filesImage.image}</div>;
   // };

   const renderEventLeft = () => {
      // console.log("i am mapstring", pageData.firstEventComponents);

      return <div>{pageData.firstEventComponents}</div>;
   };

   const goToPage = (e) => {
      console.log(e.currentTarget.dataset.page);
      navigate(e.currentTarget.dataset.page);
   };

   const onSearch = () => {
      eventService.getSearch().then(onGetEventSuccess).catch(onGetEventError);
   };

   return (
      <React.Fragment>
         <div className="container ">
            <header className="pt-3">
               <h3>Events</h3>
               <input type="file" onChange={onFileChange} multiple />
               <button className="btn btn-primary" onClick={onUploadClicked}>
                  upload
               </button>
            </header>

            <div className="row pt-3">
               <div className="col-7 border rounded">
                  {renderEventLeft()}
               </div>
               <div className="col-2"></div>
               <div className="col-3 rounded ">
                  <div className="text-center pb-3">
                     <div className="input-group input-daterange pb-3">
                        <input
                           type="text"
                           className="form-control col-5"
                           value={searchData.searchStart}
                           onChange={onFormFieldChange}
                        />
                        <h2 className="input-group-addon">-</h2>
                        <input
                           type="text"
                           className="form-control col-5"
                           value={searchData.searchEnd}
                           onChange={onFormFieldChange}
                        />
                        <button
                           type="button"
                           className="link-btn btn btn-sm btn-success "
                           id="cmdSearch"
                           onClick={onSearch}>
                           Search
                        </button>
                     </div>
                  </div>
                  <div className="text-center pb-3">
                     <button
                        type="button"
                        className="link-btn btn btn-lg btn-primary"
                        id="addorEdit"
                        data-page="/Events/EventForm"
                        onClick={goToPage}>
                        New Event
                     </button>
                  </div>

                  {renderEventRight()}
               </div>
            </div>
         </div>
      </React.Fragment>
   );
}

export default Events;
