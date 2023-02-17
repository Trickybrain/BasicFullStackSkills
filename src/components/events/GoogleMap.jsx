import {useMemo} from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import "./mapStyle.css"

export default function Home(props) {
   const {isLoaded} = useLoadScript({
      googleMapsApiKey: "AIzaSyCeT-7B0Bi52lCOwU13TjGqc5Fe73dp_uo",
   });
   if (!isLoaded) return <div>Loading...</div>;
   return <Map props={props}/>;
}

function Map(props) {
   // console.log("i am map at google",props);

   const center = useMemo(()=>({lat: props.props.lat, lng: props.props.lng}),[])

   return (
      <GoogleMap
         zoom={10}
         center={center}
         mapContainerClassName="map-container">
            <Marker
            position={center} 
            ></Marker>
         </GoogleMap>
   );
}

