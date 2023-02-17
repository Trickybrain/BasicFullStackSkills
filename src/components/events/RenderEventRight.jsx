import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
 
function RenderEventRight(props) {
   const theEvent = props.theEvents;
   // console.log("i am props at renderright", props);

   const onLocalClickedForEdit = (e) => {
      e.preventDefault();
      props.onEventClickedForEdit(props.theEvents);
   };

   const onLocalClickedForRender = (e) => {
      e.preventDefault();
      props.onEventClickedForRender(props.theEvents);
   };

   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <div className="pt-3" key={theEvent.id}>
         <div className="card">
            <div className="card-body">
               <h3 className="card-title" onClick={onLocalClickedForRender}>
                  {theEvent.name}
               </h3>
               <h6 className="card-bio">{theEvent.headline}</h6>
               <p className="card-headline">{theEvent.summary}</p>

               <Button
                  type="button"
                  className="link-btn btn btn-info"
                  onClick={handleShow}>
                  View More
               </Button>

               <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                     <Modal.Title>Event Description</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{theEvent.description}</Modal.Body>
                  <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                        Close
                     </Button>
                  </Modal.Footer>
               </Modal>

               <button
                  type="button"
                  className="link-btn btn btn-warning ms-3"
                  id="editId"
                  to={`/Events/EventForm/${theEvent.id}`}
                  onClick={onLocalClickedForEdit}>
                  Edit
               </button>
            </div>
         </div>
      </div>
   );
}

export default React.memo(RenderEventRight);
