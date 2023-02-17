import React from "react";
import {useState, useEffect} from "react";
import "./App.css";

import {Routes, Route} from "react-router-dom";

import Home from "./components/Home";
import Friends from "./components/friends/Friends";
import Jobs from "./components/jobs/Jobs";
import Companies from "./components/techcompanies/Companies";
import CompaniesForm from "./components/techcompanies/CompaniesForm";
import Events from "./components/events/Events";
import EventsForm from "./components/events/EventsForm";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import Register from "./components/user/Register";
import PoliticalCandidates from "./components/codeChallenge/PoliticalCandidates";
import Cars from "./components/codeChallenge/Cars";
import AddorEdit from "./components/friends/addorEdit";
import JobsForm from "./components/jobs/jobsForm";
import Navigate from "./components/Navigate";
import File from "./components/fileUpload/fileUpload";
import userService from "./services/userService";
import Loki from "./components/ReactLoki/ReactLoki";

function App() {
   const [user, setUser] = useState({
      loginStatus: false,
      firstName: "Unknown",
      lastName: "User",
   });

   useEffect(() => {
      userService.getCurrent().then(currentUserSuccess).catch();
   }, []);

   function currentUserSuccess(response) {
      userService.getById(response.data.item.id).then(onGetByIdSuccess).catch();
   }

   const onGetByIdSuccess = (response) => {
      // console.log("i am onGetByIdSuccess", response);
      const firstName = response.data.item.firstName;
      const lastName = response.data.item.lastName;
      setUser((prevState) => {
         const newState = {...prevState};
         newState.firstName = firstName;
         newState.lastName = lastName;
         newState.loginStatus = true;
         return newState;
      });
   };

   return (
      <React.Fragment>
         <Navigate user={user}></Navigate>

         <div className="container ">
            <Routes>
               <Route
                  path="/"
                  element={<Home user={user} setState={setUser} />}></Route>
               <Route path="/Friends" element={<Friends />}></Route>
               <Route path="/Friends/addorEdit" element={<AddorEdit />}></Route>
               <Route
                  path="/Friends/addorEdit/:editId"
                  element={<AddorEdit />}></Route>
               <Route path="/Jobs" element={<Jobs />}></Route>
               <Route
                  path="/Jobs/jobsForm/:editId"
                  element={<JobsForm />}></Route>
               <Route path="/Jobs/jobsForm/" element={<JobsForm />}></Route>
               <Route path="/Companies" element={<Companies />}></Route>
               <Route
                  path="/Companies/CompaniesForm"
                  element={<CompaniesForm />}></Route>
               <Route
                  path="/Companies/CompaniesForm/:editId"
                  element={<CompaniesForm />}></Route>
               <Route path="/Events" element={<Events />}></Route>
               <Route
                  path="/Events/EventForm/"
                  element={<EventsForm />}></Route>
               <Route
                  path="/Events/EventForm/:editId"
                  element={<EventsForm />}></Route>
               <Route path="/File" element={<File />}></Route>
               <Route path="/Loki" element={<Loki />}></Route>
               <Route
                  path="/politicalcandidates"
                  element={<PoliticalCandidates />}></Route>
               <Route path="/cars" element={<Cars />}></Route>
               <Route
                  path="/Login"
                  element={<Login user={user} setState={setUser} />}></Route>
               <Route
                  path="/Logout"
                  element={<Logout user={user} setState={setUser} />}></Route>
               <Route path="/Register" element={<Register />}></Route>
            </Routes>
         </div>
      </React.Fragment>
   );
}

export default App;

// import React, {useState, useEffect} from "react";
// import "./App.css";
// import * as peopleService from "./services/peopleService";

// function App() {
//    //// this is for the array of people, but changed to peopledata and create the arrayofpeople in the useState
//    // const [arrayOfPeople,setArrayOfPeople] = useState([])

//    const [pageData, setPageData] = useState({
//       arrayOfPeople: [],
//       peopleComponents: [],
//    });
//    const [count, setCount] = useState(0);

//    const [company] = useState("Sabio");
//    const [arrayOfNumbers] = useState([1, 2, 3]);
//    const [arrayOfStrings] = useState(["Bob", "Susan", "Jody"]);
//    const [arrayOfPeople_og] = useState([
//       {email: "kdjfkd@df.com", id: 12314},
//       {email: "dkfjuiq@gmail.com", id: 1233214},
//       {email: "sdfkj@gmail.com", id: 1231214},
//    ]);

//    false && console.log(company);
//    false && console.log(arrayOfNumbers);
//    false && console.log(arrayOfStrings);
//    console.log(arrayOfPeople_og);
//    // console.log(arrayOfPeople);
//    console.log(pageData);

//    const mapString = (aPerson) => {
//       console.log("mapping", aPerson);
//       return (
//          <div className="col-md-3" key={aPerson.cell}>
//             <div className="card">
//                <img
//                   src={aPerson.picture.large}
//                   className="card-img-top"
//                   alt="I love code"
//                />
//                <div className="card-body">
//                   <h5 className="card-title">{aPerson.email}</h5>
//                   <p className="card-text">
//                      Some quick example text to build on the card title and make
//                      up the bulk of the card's content.
//                   </p>
//                   <button className="link-btn btn btn-primary">
//                      Go somewhere
//                   </button>
//                </div>
//             </div>
//          </div>
//       );
//    };

//    useEffect(() => {
//       console.log("firing useEffect for get people");
//       peopleService
//          .getPeople()
//          .then(onGetPeopleSuccess)
//          .catch(onGetPeopleError);
//    }, []);
//    ////this is a template of how the mapping reshape should look like
//    // const aMapping = aShape => {
//    //   return bShapeOut;
//    // }

//    const onGetPeopleSuccess = (data) => {
//       //got filtered out to data at the service file. globalsuccess handler at service helper
//       console.log(data);
//       let arrayOfPeeps = data.items;
//       console.log({arrayOfPeeps});
//       setPageData((prevState) => {
//          const pd = {...prevState};
//          pd.arrayOfPeople = arrayOfPeeps;
//          // pd.peopleComponents = arrayOfPeeps.map(mapString);
//          return pd;
//       });
//    };

//    const onGetPeopleError = (response) => {
//       console.error(response);
//    };

//    const onHeaderClicked = () => {
//       setCount((prevState) => {
//          return prevState + 1;
//       });
//    };

//    return (
//       <div className="container">
//          <h3 onClick={onHeaderClicked}>Rendering {count}</h3>
//          <div className="row">{pageData.arrayOfPeople.map(mapString)}</div>
//       </div>
//    );
// }

// export default App;

// import React, {useState} from "react";
// import "./App.css";

// function App() {
//   const [company] = useState ("Sabio");
//   const [arrayOfNumbers] = useState([1,2,3]);
//   const [arrayOfStrings] = useState(["Bob", "Susan", "Jody"]);
//   // const [arrayOfPeople] = use

//   false && console.log(company);
//   false && console.log(arrayOfNumbers);
//   false && console.log(arrayOfStrings);
//   // false && console.log(arrayOfPeople);

//   const mapString = (aString) => {
//     return (
//       <p>
//         <strong>{aString}</strong>
//       </p>
//     );
//   };

//   return (
//     <div className="container">
//       <h3>Rendering</h3>
//       <div className="row">
//         {arrayOfStrings.map(mapString)}
//       </div>
//     </div>
//   )

// }

// export default App;
