import React from "react";
import {useNavigate} from "react-router-dom";


function Navigate(props) {
   // console.log("i am navigate",props.user);
   // const [state,setState] = useState ({
   //    fN: props.user.firstName,
   //    lN:props.user.lastName
   // })
   const navigate = useNavigate();
   const goToPage = (e) => {
      console.log(e.currentTarget.dataset.page);
      navigate(e.currentTarget.dataset.page);
   };

   return (
      <React.Fragment>
         <nav
            className="navbar navbar-expand-md navbar-dark bg-dark"
            aria-label="Fourth navbar example">
            <div className="container">
               <a className="navbar-brand" href="/">
                  <img
                     src="https://pw.sabio.la/images/Sabio.png"
                     width="30"
                     height="30"
                     className="d-inline-block align-top"
                     alt="Sabio"
                  />
               </a>
               <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarsExample04"
                  aria-controls="navbarsExample04"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>

               <div className="collapse navbar-collapse" id="navbarsExample04">
                  <ul className="navbar-nav me-auto mb-2 mb-md-0">
                     <li className="nav-item">
                        <button
                           type="button"
                           id="Home"
                           data-page="/"
                           className="nav-link px-2 text-white link-button"
                           onClick={goToPage}>
                           Home
                        </button>
                     </li>
                     <li className="nav-item">
                        <button
                           type="button"
                           id="Friends"
                           data-page="/Friends"
                           className="nav-link px-2 text-white link-button"
                           onClick={goToPage}>
                           Friends
                        </button>
                     </li>
                     <li className="nav-item">
                        <button
                           type="button"
                           id="Jobs"
                           data-page="/Jobs"
                           className="nav-link px-2 text-white link-button"
                           onClick={goToPage}>
                           Jobs
                        </button>
                     </li>
                     <li className="nav-item">
                        <button
                           type="button"
                           id="Companies"
                           data-page="/Companies"
                           className="nav-link px-2 text-white link-button"
                           onClick={goToPage}>
                           Tech Companies
                        </button>
                     </li>
                     <li className="nav-item">
                        <button
                           type="button"
                           id="Events"
                           data-page="/Events"
                           className="nav-link px-2 text-white link-button"
                           onClick={goToPage}>
                           Events
                        </button>
                     </li>
                     <li className="nav-item">
                        <button
                           type="button"
                           id="Home"
                           data-page="/"
                           className="nav-link px-2 text-white link-button"
                           onClick={goToPage}>
                           Test and Ajax Call
                        </button>
                     </li>
                     <li className="nav-item">
                        <button
                           type="button"
                           id="PoliticalCandidates"
                           data-page="/PoliticalCandidates"
                           className="nav-link px-2 text-white link-button"
                           onClick={goToPage}>
                           PoliticalCandidates
                        </button>
                     </li>
                     <li className="nav-item">
                        <button
                           type="button"
                           id="PoliticalCandidates"
                           data-page="/cars"
                           className="nav-link px-2 text-white link-button"
                           onClick={goToPage}>
                           Cars
                        </button>
                     </li>
                     <li className="nav-item">
                        <button
                           type="button"
                           id="File"
                           data-page="/File"
                           className="nav-link px-2 text-white link-button"
                           onClick={goToPage}>
                           File
                        </button>
                     </li>
                     <li className="nav-item">
                        <button
                           type="button"
                           id="Loki"
                           data-page="/Loki"
                           className="nav-link px-2 text-white link-button"
                           onClick={goToPage}>
                           Loki
                        </button>
                     </li>
                     
                  </ul>
                  <div className="text-end">
                     <a
                        href="/"
                        className="align-items-center me-2 mb-lg-0 text-white">
                        {props.user.firstName} {props.user.lastName} 
                     </a>
                     <button
                        type="button"
                        id="Login"
                        data-page={props.user.loginStatus? "/Logout" : "/Login"}
                        className="btn btn-outline-light me-2"
                        onClick={goToPage}>
                        {props.user.loginStatus? "Logout" : "Login"}
                     </button>
                     <button
                        type="button"
                        id="Register"
                        data-page="/Register"
                        className="btn btn-warning"
                        onClick={goToPage}>
                        Register
                     </button>
                  </div>
               </div>
            </div>
         </nav>
      </React.Fragment>
   );
}

export default Navigate;
