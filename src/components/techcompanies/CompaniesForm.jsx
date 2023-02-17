import React, {useState, useEffect} from "react";
import toastr from "toastr";
import * as techCompanies from "../../services/techCompanies";
import {useLocation} from "react-router-dom";

function CompaniesForm () {
    const [coId, setCoId] = useState({
        id: 0,
     });
  
     const [formData, setFormData] = useState({
        name: "aad",
        profile: "adf",
        summary: "adf",
        headline: "sdfa",
        contactInformation:"dkfuq",
        slug: "ddfg",
        statusId: "Active",
        images: [
            {
              imageTypeId: 1,
              imageUrl: "string"
            }
          ],
        urls: ["af"],
        tages:["dfkdsjl"],
        friendIds: [
            0
          ]
     });

     const {state} = useLocation();

     useEffect(() => {
        console.log("pathname", state);
        if (
           state?.type === "TECHCO_VIEW" &&
           state.payload &&
           state.payload !== formData
        ) {
            setCoId((prevState) => {
              const newCoId = {...prevState};
              newCoId.id = state.payload.id;
              return newCoId;
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
        console.log("i am coId", coId);
        if (coId.id <= 0) {
            techCompanies
              .addCompanies(formData)
              .then(onNewCoSuccess)
              .catch(onNewEditCoError);
        } else {
            techCompanies
              .editCompanies(coId.id, formData)
              .then(onEditCoSuccess)
              .catch(onNewEditCoError);
        }
     };

     const onEditCoSuccess = () => {
        toastr.success("Edit Successful");
     };
  
     const onNewCoSuccess = (response) => {
        toastr.success("Add Successful");
        setCoId((prevState) => {
           const newCoId = {...prevState};
           newCoId.id = response.data.item;
           return newCoId;
        });
     };
  
     const onNewEditCoError = () => {
        toastr.error("Add/Edit Unsuccessful");
     };
  

    return (
        <React.Fragment>
        <div className="container form-fill">
           <div className="row">
              <header className="pt-3">
                 <h1>Add or Edit Tech Companies</h1>
              </header>
              <div className="col-md-6">
                 <form className="pt-2" name="champInfoForm">
                    <div className="form-group">
                       <label>Name</label>
                       <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Name: Company Name"
                          value={formData.name}
                          onChange={onFormFieldChange}
                       />
                    </div>
                    <div className="form-group pt-3">
                       <label>Profile</label>
                       <input
                          type="text"
                          className="form-control"
                          name="profile"
                          placeholder="This is a profile"
                          value={formData.profile}
                          onChange={onFormFieldChange}
                       />
                    </div>
                    <div className="form-group pt-3">
                       <label>Summary</label>
                       <input
                          type="text"
                          className="form-control"
                          name="summary"
                          placeholder="Summary"
                          value={formData.summary}
                          onChange={onFormFieldChange}
                       />
                    </div>
                    <div className="form-group inputpad pt-3">
                       <label>Headline</label>
                       <input
                          type="text"
                          className="form-control"
                          name="headline"
                          placeholder="Headline"
                          value={formData.headline}
                          onChange={onFormFieldChange}
                       />
                    </div>
                    <div className="form-group inputpad pt-3">
                       <label>Contact Information</label>
                       <input
                          type="text"
                          className="form-control"
                          name="contactInformation"
                          placeholder="Contact Information"
                          value={formData.contactInformation}
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

export default CompaniesForm;