import React, {useEffect} from "react";
import * as userService from "../../services/userService";


function Logout(props) {
    console.log("i am logout",props);
    // const [state, setState] = useState({
    //     logoutStatus: false,
    //  });

    useEffect(() => {
        userService.logout().then(logoutSuccess).catch();
     }, []);


     const logoutSuccess =() => {
        props.setState((prevState)=>{
            const newState = {...prevState};
            newState.loginStatus = false;
            newState.firstName = "Unknown";
            newState.lastName = "User";
            return newState;
        })
     }
    

    return (
      <React.Fragment>
        <h3>{props.user.loginStatus ? "Logout Unsuccessful" : "Logout Successful"}</h3>
      </React.Fragment>
    );
  }
  
  export default Logout;