import React, {useState, useEffect} from "react";
import toastr from "toastr";
import * as jobsService from "../../services/jobsService";
import {useLocation} from "react-router-dom";

function JobsForm () {
    const [jobId, setJobId] = useState({
        id: 0,
     });
  
     const [formData, setFormData] = useState({
        title: "a",
        description: "a",
        summary: "a",
        pay: "a",
        slug: "d",
        statusId: "Active",
        techCompanyId: 0,
        skills: ["af"],
     });

     const {state} = useLocation();

     useEffect(() => {
        console.log("pathname", state);
        if (
           state?.type === "JOBPOST_VIEW" &&
           state.payload &&
           state.payload !== formData
        ) {
            setJobId((prevState) => {
              const newJobId = {...prevState};
              newJobId.id = state.payload.id;
              return newJobId;
           });
  
           setFormData((prevState) => {
            console.log("i am setFormData", prevState, state.payload);
              const newFormData = {...prevState, ...state.payload};

              return newFormData;
           });
        }
     }, [state]);
 
     const onFormFieldChange = (e) => {
        const target = e.target;
        const value = target.value; 
        const name = target.name;
        
        setFormData((prevState) => {
           const newUserObject = {...prevState};
           newUserObject[name] = value;
           //if it's skills, then push to the array.
           return newUserObject;
        });
     };
 
     const onNewEditJobClicked = () => {
        console.log("i am jobId", jobId);
        if (jobId.id <= 0) {
            jobsService
              .addJobs(formData)
              .then(onNewJobSuccess)
              .catch(onNewEditJobError);
        } else {
            jobsService
              .editJobs(jobId.id, formData)
              .then(onEditJobSuccess)
              .catch(onNewEditJobError);
        }
     };

     const onEditJobSuccess = () => {
        toastr.success("Edit Successful");
     };
  
     const onNewJobSuccess = (response) => {
        toastr.success("Add Successful");
        setJobId((prevState) => {
           const newJobId = {...prevState};
           newJobId.id = response.data.item;
           return newJobId;
        });
     };
  
     const onNewEditJobError = () => {
        toastr.error("Add/Edit Unsuccessful");
     };
  

    return (
        <React.Fragment>
        <div className="container form-fill">
           <div className="row">
              <header className="pt-3">
                 <h1>Add or Edit Jobs</h1>
              </header>
              <div className="col-md-6">
                 <form className="pt-2" name="champInfoForm">
                    <div className="form-group">
                       <label>Title</label>
                       <input
                          type="text"
                          className="form-control"
                          id="inputTitle"
                          name="title"
                          placeholder="Title: Dwight Schrute"
                          value={formData.title}
                          onChange={onFormFieldChange}
                       />
                    </div>
                    <div className="form-group pt-3">
                       <label>Description</label>
                       <input
                          type="text"
                          className="form-control"
                          name="description"
                          placeholder="This is a Description"
                          value={formData.description}
                          onChange={onFormFieldChange}
                       />
                    </div>
                    <div className="form-group pt-3">
                       <label>Summary</label>
                       <input
                          type="text"
                          className="form-control"
                          id="inputSummary"
                          name="summary"
                          placeholder="Summary"
                          value={formData.summary}
                          onChange={onFormFieldChange}
                       />
                    </div>
                    <div className="form-group inputpad pt-3">
                       <label>Pay</label>
                       <input
                          type="text"
                          className="form-control"
                          id="inputpay"
                          name="pay"
                          placeholder="Pay Amount"
                          value={formData.pay}
                          onChange={onFormFieldChange}
                       />
                    </div>
                    <div className="form-group pt-3">
                       <label>Slug</label>
                       <input
                          type="text"
                          className="form-control"
                          id="inputSlug"
                          name="slug"
                          placeholder="Slug: www.schrutefarms.com"
                          value={formData.slug}
                          onChange={onFormFieldChange}
                       />
                    </div>
                    <div className="form-group pt-3">
                        <label>Tech Company Id</label>
                        <select 
                        id="inputCompany" 
                        className="form-control"
                        name="techCompanyId"
                        value={formData.techCompanyId}
                        onChange={onFormFieldChange}
                        >
                           <option defaultValue>Please Select a Company</option>
                           <option value="60652">Microsoft</option>
                           <option value="60651">HP</option>
                           <option value="60650">Cruise</option>
                           <option value="60649">Facebook</option>
                           <option value="60594">Google</option>
                        </select>
                    </div>
                    <div className="form-group pt-3">
                       <label>Skills</label>
                       <input
                          type="text"
                          className="form-control"
                          id="inputSkills"
                          name="skills"
                          placeholder="Skills"
                          value={formData.skills}
                          onChange={onFormFieldChange}
                       />
                    </div>
                    <button
                       type="button"
                       className="btn btn-primary btn-lg mt-4"
                       id="cmdSubmit"
                       onClick={onNewEditJobClicked}>
                       Submit
                    </button>
                 </form>
              </div>
           </div>
        </div>
        <div>
           <pre>
              <code>{JSON.stringify(formData, undefined, 2)}</code>
           </pre>
        </div>
     </React.Fragment>
    )
}

export default JobsForm;