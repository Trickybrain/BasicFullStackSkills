import React, {useState, useEffect} from "react";
import toastr from "toastr";
import * as eventService from "../../services/eventService";
import {useLocation} from "react-router-dom";

function EventsForm() {
   const [eventId, setEventId] = useState({
      id: 0,
   });

   const [formData, setFormData] = useState({
      name: "",
      description: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "Active",
      metaData:{
        dateStart:"",
        dateEnd:"",
        location: {
            latitude:0,
            longitude:0,
            zipCode:"",
            address:""
        }
      }
   });

   const {state} = useLocation();

   useEffect(() => {
      console.log("pathname", state);
      if (
         state?.type === "EVENT_VIEW" &&
         state.payload &&
         state.payload !== formData
      ) {
         setEventId((prevState) => {
            const newEventId = {...prevState};
            newEventId.id = state.payload.id;
            return newEventId;
         });

         setFormData((prevState) => {
            const newFormData = {...prevState, ...state.payload};
            return newFormData;
         });

      }
   }, [state]);

   const onFormFieldChange = (e) => {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      console.log("i am name", name);
      setFormData((prevState) => {
         const newUserObject = {...prevState};
         newUserObject[name] = value;
         return newUserObject;
      });
   };

   const onNewEditEventClicked = () => {
      console.log("i am eventId", eventId);
      if (eventId.id <= 0) {
        eventService
            .getAdd(formData)
            .then(onNewEventSuccess)
            .catch(onNewEditEventError);
      } else {
        eventService
            .getEdit(eventId.id, formData)
            .then(onEditEventSuccess)
            .catch(onNewEditEventError);
      }
   };

   const onEditEventSuccess = () => {
      toastr.success("Edit Event Successful");
   };

   const onNewEventSuccess = (response) => {
      toastr.success("Add Event Successful");
      setEventId((prevState) => {
         const newEventId = {...prevState};
         newEventId.id = response.data.item;
         return newEventId;
      });
   };

   const onNewEditEventError = () => {
      toastr.error("Add/Edit Event Unsuccessful");
   };

   return (
      <React.Fragment>
         <div className="container form-fill">
            <div className="row">
               <header className="pt-3">
                  <h1>Add or Edit Event</h1>
               </header>
               <div className="col-md-6">
                  <form className="pt-2" name="champInfoForm">
                     <div className="form-group">
                        <label>Name</label>
                        <input
                           type="text"
                           className="form-control"
                           name="name"
                           placeholder="Name: Dwight Schrute"
                           value={formData.name}
                           onChange={onFormFieldChange}
                        />
                     </div>
                     <div className="form-group pt-3">
                        <label>Description</label>
                        <input
                           type="text"
                           className="form-control"
                           name="Description"
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
                           id="inputHeadline"
                           name="headline"
                           placeholder="Headline"
                           value={formData.headline}
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
                        <label>Date Start</label>
                        <input
                           type="text"
                           className="form-control"
                           name="dateStart"
                           placeholder="Date Start"
                           value={formData.metaData.dateStart}
                           onChange={onFormFieldChange}
                        />
                     </div>
                     <div className="form-group pt-3">
                        <label>Date End</label>
                        <input
                           type="text"
                           className="form-control"
                           name="dateEnd"
                           placeholder="Date End"
                           value={formData.metaData.dateEnd}
                           onChange={onFormFieldChange}
                        />
                     </div>
                     <div className="form-group pt-3">
                        <label>Latitude</label>
                        <input
                           type="text"
                           className="form-control"
                           name="latitude"
                           placeholder="Latitude"
                           value={formData.metaData.location.latitude}
                           onChange={onFormFieldChange}
                        />
                     </div>
                     <div className="form-group pt-3">
                        <label>Longitude</label>
                        <input
                           type="text"
                           className="form-control"
                           name="longitude"
                           placeholder="longitude"
                           value={formData.metaData.location.longitude}
                           onChange={onFormFieldChange}
                        />
                     </div>
                     <div className="form-group pt-3">
                        <label>Zip Code</label>
                        <input
                           type="text"
                           className="form-control"
                           name="zipCode"
                           placeholder="Zip Code"
                           value={formData.metaData.location.zipCode}
                           onChange={onFormFieldChange}
                        />
                     </div>
                     <div className="form-group pt-3">
                        <label>Address</label>
                        <input
                           type="text"
                           className="form-control"
                           name="address"
                           placeholder="Address"
                           value={formData.metaData.location.address}
                           onChange={onFormFieldChange}
                        />
                     </div>
                     <button
                        type="button"
                        className="btn btn-primary btn-lg mt-4"
                        id="cmdSubmit"
                        onClick={onNewEditEventClicked}>
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
   );
}

export default EventsForm;
