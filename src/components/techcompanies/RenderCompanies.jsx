import React from "react";

function RenderCompanines(props) {
   console.log("i am props at render", props);
   const companies = props.co;
   const companiesImage = companies.images[0].imageUrl;
   const onLocalClickedForDelete = (e) => {
      e.preventDefault();
      props.onCoClickedForDelete(companies, e);
   };
   const onLocalClickedForEdit = (e) =>{
      e.preventDefault();
      console.log("check for Edit",companies);
      props.onCoClickedForEdit(companies);
   }
   return (
      <div className="col-md-3 pt-3" key={companies.id}>
         <div className="card">
            <img
               src={companiesImage}
               className="card-img-top"
               alt="I love code"
               onClick={onLocalClickedForDelete}
            />
            <div className="card-body">
               <h3 className="card-title">{companies.name}</h3>
               <h6 className="card-bio">{companies.profile}</h6>
               <p className="card-headline">{companies.headline}</p>
           
               <button
                  type="button"
                  className="link-btn btn btn-warning"
                  id="editId"
                  to={`/Companies/CompaniesForm/${companies.id}`}
                  onClick={onLocalClickedForEdit}>
                  Edit
               </button>
      
               <button
                  type="button"
                  className="link-btn btn btn-danger ms-3"
                  onClick={onLocalClickedForDelete}>
                  Delete
               </button>
              
            </div>
         </div>
      </div>
   );
}

export default React.memo(RenderCompanines) ;
