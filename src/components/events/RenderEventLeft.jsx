import React from "react";
import GoogleMap from "./GoogleMap";

function RenderEventLeft(props) {
   console.log("i am props at renderleft", props);
   const theEvent = props.theEvents;
   const lat = theEvent.metaData.location.latitude;
   const lng = theEvent.metaData.location.longitude;
   return (
      <div className="pt-3" key={theEvent.id}>
         <div className="panel panel-default">
            <h1 className="panel-heading">{theEvent.name}</h1>
            <img
               src={theEvent.slug}
               className="card-img-top"
               alt="I love code"
            />
            <h3 className="panel-body">{theEvent.headline}</h3>
            <GoogleMap lat={lat} lng={lng}/>
         </div>
        
      </div>
   );
}

export default React.memo(RenderEventLeft);
