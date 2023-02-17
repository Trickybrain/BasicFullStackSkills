import React, {useCallback, useEffect, useState} from "react";
import * as jobService from "../../services/jobsService";
import {useNavigate} from "react-router-dom";
import RenderJobs from "./renderJobs";

function Jobs() {
   const [jobData, setJobData] = useState({
      arrayOfJobs: [],
      jobsComponents: [],
      searchString: "",
   });

   useEffect(() => {
      jobService.getJobs().then(onGetJobsSuccess).catch(onError);
   }, []);

   const navigate = useNavigate();

   const onEditRequested = (jobPost) => {
      console.log(jobPost.id, "i am onEditRequested", jobPost);
      const stateForTransports = {type:"JOBPOST_VIEW", payload: jobPost};
      navigate(`/Jobs/jobsForm/${jobPost.id}`, {state: stateForTransports});
   }

   const onDeleteRequested = useCallback((jobPost, eObj) => {
      console.log("i am onDeleteRequested", jobPost, "eObj", eObj);

      const deleteSuccess = deleteSuccessHandler(jobPost.id);

      jobService.deleted(jobPost.id).then(deleteSuccess).catch(onError);
   }, []);

   const deleteSuccessHandler = (isDeleted) => {
      console.log("i am deleteSuccessHandler", isDeleted);

      return () => {
         console.log("i am delete success", isDeleted);
         setJobData((prevState) => {
            const newState = {...prevState};
            newState.arrayOfJobs = [...newState.arrayOfJobs];

            const indxOf = newState.arrayOfJobs.findIndex((jobList) => {
               let result = false;

               if (jobList.id === isDeleted) {
                  result = true;
               }
               return result;
            });

            if (indxOf >= 0) {
               newState.arrayOfJobs.splice(indxOf, 1);
               newState.jobsComponents = newState.arrayOfJobs.map(mapJobs);
            }
            return newState;
         });
      };
   };

   const onGetJobsSuccess = (response) => {
      console.log("i am onGetJobsSuccess", response.data.item.pagedItems);
      let newArrayOfJobs = response.data.item.pagedItems;
      setJobData((prevState) => {
         const pd = {...prevState};
         pd.arrayOfJobs = newArrayOfJobs;
         pd.jobsComponents = newArrayOfJobs.map(mapJobs);
         return pd;
      });
   };

   const mapJobs = (jobPost) => {
      console.log("i am mapjobs", jobPost);
      return (
         <RenderJobs
            job={jobPost}
            key={jobPost.id}
            onJobClickedForDelete={onDeleteRequested}
            onJobClickedForEdit = {onEditRequested}
         />
      );
   };

   const onFormFieldChange = (e) => {
      const target = e.target;
      const value = target.value;
      const name = target.name;

      setJobData((prevState) => {
         const newUserObject = {...prevState};
         newUserObject[name] = value;
         return newUserObject;
      });
      console.log("i am name", jobData.searchString);
   };

   const onSearch = () => {
      jobService
         .getSearch(jobData.searchString)
         .then(onGetJobsSuccess)
         .catch(onError);
   };

   const goToPage = (e) => {
      console.log(e.currentTarget.dataset.page);
      navigate(e.currentTarget.dataset.page);
   };

   const onError = () => {};

   return (
      <React.Fragment>
         <header>
            <div className="container">
               <h3 className="pt-2">Jobs</h3>
               <div className="pt-2">
                  <button
                     type="button"
                     className="link-btn btn btn-lg btn-primary"
                     id="addorEdit"
                     data-page="/Jobs/jobsForm"
                     onClick={goToPage}
                  >
                     New Jobs
                  </button>
                  <div className="col-md-4 pb-2 pad">
                     <input
                        type="text"
                        className="form p-2"
                        name="searchString"
                        placeholder="Search"
                        value={jobData.searchString}
                        onChange={onFormFieldChange}
                     />
                     <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        id="cmdSearch"
                        onClick={onSearch}>
                        Search
                     </button>
                  </div>
               </div>
            </div>
         </header>
         <div className="row">{jobData.jobsComponents}</div>
      </React.Fragment>
   );
}

export default Jobs;
