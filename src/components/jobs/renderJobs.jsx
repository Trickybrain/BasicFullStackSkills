import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
// import React from "react";

function RenderJobs(props) {
   console.log("i am props at render", props);
   const jobCard = props.job;
   const jobCardImg = jobCard.techCompany.images[0].imageUrl;

   const onLocalClickedForDelete = (e) => {
      e.preventDefault();
      props.onJobClickedForDelete(jobCard, e);
   };
   const onLocalClickedForEdit = (e) => {
      e.preventDefault();
      props.onJobClickedForEdit(jobCard);
   };

   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <div className="col-md-3 pt-3" key={jobCard.id}>
         <div className="card">
            <img
               src={jobCardImg}
               className="card-img-top"
               alt="I love code"
               //   onClick={onLocalClickedForDelete}
            />
            <div className="card-body">
               <h3 className="card-title">{jobCard.title}</h3>
               <h6 className="card-description">{jobCard.description}</h6>
               <p className="card-pay">${jobCard.pay}</p>

               <button
                  type="button"
                  className="link-btn btn btn-warning"
                  id="editId"
                  to={`/Jobs/jobsForm/${jobCard.id}`}
                  onClick={onLocalClickedForEdit}>
                  Edit
               </button>

               <button
                  type="button"
                  className="link-btn btn btn-danger ms-3"
                  onClick={onLocalClickedForDelete}>
                  Delete
               </button>

               <Button
                  className="link-btn btn ms-3"
                  variant="info"
                  onClick={handleShow}>
                  View More
               </Button>

               <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                     <Modal.Title>Job Summary</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     {jobCard.summary}
                  </Modal.Body>
                  <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                        Close
                     </Button>
                  </Modal.Footer>
               </Modal>
            </div>
         </div>
      </div>
   );
}

export default RenderJobs;
