import React, {useState} from "react";
import * as politicalService from "./services/politicalCandidateService";
import toastr from "toastr";
import Card from "./PoliticalCandidateCard";

function PoliticalCandidates() {
   const [state, setState] = useState({
      firstName: "asdas",
      lastName: "fasas",
      party: "Democrat",
      currentVotes: 13,
      imageUrl:"https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt1259276b6d1efa78/5db05fa86e8b0c6d038c5ca2/RiotX_ChampionList_ahri.jpg?quality=90&width=250",
      tenantId: "U044A00FD8B",
   });

   const [state2, setState2] = useState({
      firstName2: "qweqw",
      lastName2: "dfaeqw",
      party2: "Democrat",
      currentVotes2: 6,
      imageUrl2:"https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt1259276b6d1efa78/5db05fa86e8b0c6d038c5ca2/RiotX_ChampionList_ahri.jpg?quality=90&width=250",
      tenantId: "U044A00FD8B",
   });

   let [show, setShow] = useState(false);
   let [show2, setShow2] = useState(false);

   const [cardId, setCardId] = useState({
      id: 0,
   });

   const [winner, setWinner] = useState({
      win: "not winner",
   });

   const onFormChange = (event) => {
      console.log("onChange", {syntheticEvent: event});
      const target = event.target;
      const newUserValue = target.value;
      const nameOfField = target.name;
      console.log({nameOfField, newUserValue});
      setState((prevState) => {
         console.log("updater onChange", prevState);
         const newUserObject = {
            ...prevState,
         };
         newUserObject[nameOfField] = newUserValue;
         return newUserObject;
      });
   };

   const onFormChange2 = (event) => {
      console.log("onChange", {syntheticEvent: event});

      //capture info you need from event here as the event object will fall out of scope quickly

      //the event.target will represent the input
      const target = event.target;

      //this is the value of the input, the value in the text box the user types into
      const newUserValue = target.value;

      //this is the name (so be sure to give your form fields a name attribute)
      const nameOfField = target.name;
      console.log({nameOfField, newUserValue});
      //set the new state using the old property name / object key and using the new value (updatedFormData)
      setState2((prevState) => {
         console.log("updater onChange", prevState);

         // copy the personData object from state using the spread operator
         const newUserObject = {
            ...prevState,
         };

         //change the value of the copied object using the name and using bracket notation
         newUserObject[nameOfField] = newUserValue;

         return newUserObject;
      });
   };

   const onResetClicked = (e) => {
      if (e.target.id === "reset") {
         setState((prevState) => {
            const ns = {...prevState};
            ns.firstName = "";
            ns.lastName = "";
            ns.party = "";
            ns.currentVotes = 0;
            ns.imageUrl = "";
            return ns;
         });
         setShow(!show);
      } else {
         setState2((ps) => {
            const ns = {...ps};
            ns.firstName2 = "";
            ns.lastName2 = "";
            ns.party2 = "";
            ns.currentVotes2 = 0;
            ns.imageUrl2 = "";
            return ns;
         });
         setShow2(!show2);
      }
   };

   const onRegister = (e) => {
      e.preventDefault();
      if (e.target.id === "submit1") {
         if (
            (state.firstName === "") |
            (state.lastName === "") |
            (state.imageUrl === "") |
            (state.party === "") |
            (state.currentVotes === 0)
         ) {
            toastr.success("Fill the form");
         } else {
            politicalService.add(state).then(onSuccessOne).catch(onError);
         }
      } else {
         if (
            (state2.firstName2 === "") |
            (state2.lastName2 === "") |
            (state2.imageUrl2 === "") |
            (state2.party2 === "") |
            (state2.currentVotes2 === 0)
         ) {
            toastr.success("Fill the form");
         } else {
            politicalService.add(state2).then(onSuccessTwo).catch(onError);
         }
      }
   };

   const onSuccessOne = (some) => {
      console.log("i am success left");
      toastr.success("Register Successful");
      setShow(!show);
      setCardId((ps) => {
         let ns = {...ps};
         ns.id = some.data.item;
         return ns;
      });
   };

   const onSuccessTwo = (some) => {
      console.log("i am success right");
      toastr.success("Register Successful");
      setShow2(!show2);
      setCardId((ps) => {
         let ns = {...ps};
         ns.id = some.data.item;
         return ns;
      });
   };

   const onError = () => {
      toastr.error("Register Unsuccessful");
   };

   const renderCardOne = () => {
      if (show) {
         return (
            <Card
               props={{
                  firstName: state.firstName,
                  lastName: state.lastName,
                  party: state.party,
                  currentVotes: state.currentVotes,
                  imageUrl: state.imageUrl,
               }}
               id={cardId.id}
               winner={winner.win}></Card>
         );
      }
   };

   const renderCardTwo = () => {
      if (show2) {
         return (
            <Card
               props={{
                  firstName: state2.firstName2,
                  lastName: state2.lastName2,
                  party: state2.party2,
                  currentVotes: state2.currentVotes2,
                  imageUrl: state2.imageUrl2,
               }}
               id={cardId.id}
               winner={winner.win}></Card>
         );
      }
   };

   const onWinnerClick = () => {
      console.log("onwinnerclick");
      if (state.currentVotes !== 0 || state2.currentVotes2 !== 0) {
         if (state.currentVotes < state2.currentVotes2) {
            setShow(!show);
            setWinner((ps) => {
               let ns = {...ps};
               ns.win = "winner";
               return ns;
            });
            return (
               <div>
                  <Card
                     props={state}
                     id={cardId.id}
                     winner={winner.win}></Card>
               </div>
            );
         } else {
            setShow2(!show2);
            setWinner((ps) => {
               let ns = {...ps};
               ns.win = "winner";
               return ns;
            });
            return (
               <Card props={state2} id={cardId.id} winner={winner.win}></Card>
            );
         }
      }
   };

   return (
      <React.Fragment>
         <div className="container">
            <div className="row">
               <div className="form-left col-5">
                  <button
                     id="showWinner"
                     type="button"
                     className="btn btn-warning"
                     onClick={onWinnerClick}>
                     Show Winner
                  </button>
                  <form>
                     <div className="mb-3 form-group">
                        <label>First Name</label>
                        <input
                           id="firstName"
                           name="firstName"
                           value={state.firstName}
                           onChange={onFormChange}
                        />
                     </div>
                     <div className="mb-3 form-group">
                        <label>Last Name</label>
                        <input
                           id="lastName"
                           name="lastName"
                           value={state.lastName}
                           onChange={onFormChange}
                        />
                     </div>
                     <div className="mb-3 form-group">
                        <label>Current Votes</label>
                        <input
                           id="currentVotes"
                           name="currentVotes"
                           value={state.currentVotes}
                           onChange={onFormChange}
                        />
                     </div>
                     <div className="mb-3 form-group">
                        <label>Party</label>
                        <select
                           className="form-control"
                           id="party"
                           name="party"
                           value={state.party}
                           onChange={onFormChange}>
                           <option value="">Select</option>
                           <option value="democrat">Democrat</option>
                           <option value="republican">Republican</option>
                           <option value="independent">Independent</option>
                        </select>
                     </div>
                     <div className="mb-3 form-group">
                        <label>ImageUrl</label>
                        <input
                           id="imageUrl"
                           name="imageUrl"
                           value={state.imageUrl}
                           onChange={onFormChange}
                        />
                     </div>
                     <button
                        id="submit1"
                        type="button"
                        className="btn btn-primary"
                        onClick={onRegister}>
                        Submit
                     </button>
                     <button
                        id="reset"
                        type="button"
                        className="btn btn-warning"
                        onClick={onResetClicked}>
                        Reset
                     </button>
                  </form>
                  {renderCardOne()}
               </div>
               <div className="col-2"></div>

               {/* left form ends */}
               <div className="form-right col-5">
                  <form>
                     <div className="mb-3 form-group">
                        <label>First Name</label>
                        <input
                           id="firstName2"
                           name="firstName2"
                           value={state2.firstName2}
                           onChange={onFormChange2}
                        />
                     </div>
                     <div className="mb-3 form-group">
                        <label>Last Name</label>
                        <input
                           id="lastName2"
                           name="lastName2"
                           value={state2.lastName2}
                           onChange={onFormChange2}
                        />
                     </div>
                     <div className="mb-3 form-group">
                        <label>Current Votes</label>
                        <input
                           id="currentVotes2"
                           name="currentVotes2"
                           value={state2.currentVotes2}
                           onChange={onFormChange2}
                        />
                     </div>
                     <div className="mb-3 form-group">
                        <label>Party</label>
                        <select
                           className="form-control"
                           id="party2"
                           name="party2"
                           value={state2.party2}
                           onChange={onFormChange2}>
                           <option value="">Select</option>
                           <option value="democrat">Democrat</option>
                           <option value="republican">Republican</option>
                           <option value="independent">Independent</option>
                        </select>
                     </div>
                     <div className="mb-3 form-group">
                        <label>ImageUrl</label>
                        <input
                           id="imageUrl2"
                           name="imageUrl2"
                           value={state2.imageUrl2}
                           onChange={onFormChange2}
                        />
                     </div>
                     <button
                        id="submit2"
                        type="button"
                        className="btn btn-primary"
                        onClick={onRegister}>
                        Submit
                     </button>
                     <button
                        id="reset2"
                        type="button"
                        className="btn btn-warning"
                        onClick={onResetClicked}>
                        Reset
                     </button>
                  </form>
                  {renderCardTwo()}
               </div>
            </div>
         </div>
         <div>
            <code>{JSON.stringify(state, undefined, 2)}</code>
         </div>
         <div>
            <code>{JSON.stringify(state2, undefined, 2)}</code>
         </div>
      </React.Fragment>
   );
}

export default PoliticalCandidates;
