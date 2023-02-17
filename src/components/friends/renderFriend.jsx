import React from "react";
import PropTypes from "prop-types";

function renderFriend(props) { 
   // console.log("i am props at render", props);
   const aFriend = props.person;
   const onLocalClickedForDelete = (e) => {
      e.preventDefault();
      props.onFriendClickedForDelete(props.person, e);
   };
   const onLocalClickedForEdit = (e) =>{
      e.preventDefault();
      props.onFriendClickedForEdit(props.person);
   }
   return (
      <div className="col-md-3 pt-3" key={aFriend.id}>
         <div className="card">
            <img
               src={aFriend.primaryImage.imageUrl}
               className="card-img-top"
               alt="I love code"
               onClick={onLocalClickedForDelete}
            /> 
            <div className="card-body">
               <h3 className="card-title">{aFriend.title}</h3>
               <h6 className="card-bio">{aFriend.bio}</h6>
               <p className="card-headline">{aFriend.headline}</p>
           
               <button
                  type="button"
                  className="link-btn btn btn-warning"
                  id="editId"
                  to={`/Friends/addorEdit/${aFriend.id}`}
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

renderFriend.propTypes = {
   friend: PropTypes.shape({
     title: PropTypes.string.isRequired,
     bio: PropTypes.string.isRequired,
     headline: PropTypes.string.isRequired, // error because it's an object
     // primaryImage: PropTypes.shape({
     //   url: PropTypes.string.isRequired,
     // }), //end primaryImage
     id: PropTypes.number,
   })}

export default React.memo(renderFriend) ;
