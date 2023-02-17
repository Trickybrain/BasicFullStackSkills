import React, {useState, useEffect} from "react";
import toastr from "toastr";
import * as friendsService from "../../services/friendsService";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function AddorEdit() {


   const [formData, setFormData] = useState({
      id:0,
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: 10,
      ImageTypeId:0,
      ImageUrl: "",
      skills:""
   });

   const navigate = useNavigate();
   const {state} = useLocation();

   useEffect(() => {
      console.log("pathname", state);
      if (
         state?.type === "FRIEND_VIEW" &&
         state.payload &&
         state.payload !== formData
      ) {
         setFormData((prevState) => {
            const newFriendId = {...prevState};
            newFriendId.id = state.payload.id;
            return newFriendId;
         });

         setFormData((prevState) => {
            const newFormData = {...prevState};
            newFormData.title = state.payload.title;
            newFormData.bio = state.payload.bio;
            newFormData.summary = state.payload.summary;
            newFormData.headline = state.payload.headline;
            newFormData.slug = state.payload.slug;
            newFormData.ImageTypeId = state.payload.primaryImage.typeId;
            newFormData.ImageUrl = state.payload.primaryImage.url;
            var captureSkill= "";
            if(state.payload.skills!==null)
            {
               for(let i = 0; i<state.payload.skills.length; i++)
               {
                  captureSkill += state.payload.skills[i].name;
                  if(i+1<state.payload.skills.length)
                  {
                     captureSkill+=",";
                  }
               }
            }
            newFormData.skills = captureSkill.split(",");;
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
         if(name === "skills"){
            newUserObject[name] = value.split(",");
         }
         else {
            newUserObject[name] = value;
         }
         return newUserObject;
      });
   };

   const onNewEditFriendClicked = () => {
      console.log("i am friendId", formData.id);
      if (formData.id <= 0) {
         friendsService
            .addFriend(formData)
            .then(onNewFriendSuccess)
            .catch(onNewEditFriendError);
      } else {
         friendsService
            .editFriend(formData.id, formData)
            .then(onEditFriendSuccess)
            .catch(onNewEditFriendError);
      }
   };

   const onEditFriendSuccess = () => {
      toastr.success("Edit Friend Successful");
      navigate(`/Friends`);
   };

   const onNewFriendSuccess = (response) => {
      toastr.success("Add Friend Successful");
      setFormData((prevState) => {
         const newFriendId = {...prevState};
         newFriendId.id = response.data.item;
         return newFriendId;
      });
      navigate(`/Friends`);
   };

   const onNewEditFriendError = () => {
      toastr.error("Add/Edit Friend Unsuccessful");
   };

   return (
      <React.Fragment>
         <div className="container form-fill">
            <div className="row">
               <header className="pt-3">
                  <h1>Add or Edit Friend</h1>
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
                        <label>Bio</label>
                        <input
                           type="text"
                           className="form-control"
                           id="inputBio"
                           name="bio"
                           placeholder="This is a Bio"
                           value={formData.bio}
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
                     {/* <div className="form-group pt-3">
                        <label>Image Type</label>
                        <select 
                        id="inputImageType" 
                        className="form-control"
                        name="ImageTypeId"
                        value={formData.ImageTypeId}
                        onChange={onFormFieldChange}
                        >
                           <option defaultValue>Please Select Image Type</option>
                           <option value="1">JPEG</option>
                           <option value="2">PNG</option>
                           <option value="3">GIF</option>
                           <option value="4">PDF</option>
                           <option value="5">RAW</option>
                        </select>
                    </div> */}
                       <div className="form-group pt-3">
                        <label>Image Type</label>
                        <input
                           type="text"
                           className="form-control"
                           id="inputImageType"
                           name="ImageTypeId"
                           placeholder="Image Type Id"
                           value={formData.ImageTypeId}
                           onChange={onFormFieldChange}
                        />
                     </div>
                     <div className="form-group pt-3">
                        <label>Image Url</label>
                        <input
                           type="text"
                           className="form-control"
                           id="inputImageUrl"
                           name="ImageUrl"
                           placeholder="Image Url"
                           value={formData.ImageUrl}
                           onChange={onFormFieldChange}
                        />
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
                        onClick={onNewEditFriendClicked}>
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

export default AddorEdit;
