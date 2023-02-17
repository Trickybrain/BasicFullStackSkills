import React from "react";

function PoliticalCandidateCard(props) {
   console.log("PoliticalCandidateCard", props);

   const aPC = props.props;
   console.log("hope", props);
   let styling = {};
   if (props.winner === "winner") {
      styling = {border: "green 10px solid"};
   }

   return (
      <React.Fragment>
         <div className="col-md-5 p-2" key={props.id} winner={props.winner}>
            <div className="row">
               <div className="card" style={styling}>
                  <img
                     src={aPC.imageUrl}
                     className="card-img-top"
                     alt="currentCard"
                  />
                  <div className="card-body">
                     <h5 className="card-title">
                        {aPC.firstName} {aPC.lastName}
                     </h5>
                     <p className="card-text">{aPC.party}</p>
                     <p className="card-text">{aPC.currentVotes}</p>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
}

export default PoliticalCandidateCard;
