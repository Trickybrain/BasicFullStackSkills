import React, {useState} from "react";
import toastr from "toastr";
import * as  userService from "../../services/userService";

function Register() {
  const [state,setState] = useState({
    email:"",
    firstName:"",
    lastName:"",
    password:"",
    passwordConfirm:"",
    avatarUrl:"",
    tenantId:"U044A00FD8B"  
  });
 
  const onFormChange = event => {
    console.log("onChange", { syntheticEvent: event });

    //capture info you need from event here as the event object will fall out of scope quickly

    //the event.target will represent the input
    const target = event.target;
    console.log("target", target);
    //this is the value of the input, the value in the text box the user types into
    const newUserValue = target.value;
    console.log("newUserValue", newUserValue);
    //this is the name (so be sure to give your form fields a name attribute)
    const nameOfField = target.name;
    console.log("nameOfField", nameOfField);
    //set the new state using the old property name / object key and using the new value (updatedFormData)
    setState((prevState) => {
      console.log("updater onChange", prevState);

      // copy the personData object from state using the spread operator
      const newUserObject = {
        ...prevState
      };

      //change the value of the copied object using the name and using bracket notation
      newUserObject[nameOfField] = newUserValue;

      return newUserObject;
    });

    console.log("end onChange");
  };
 


  const onRegister=()=>{
    userService.register(state).then(onSuccess).catch(onError)
  }

  const onSuccess = ()=>{
    toastr.success("Register Successful");
  }

  const onError = ()=>{
    toastr.error("Register Unsuccessful");
  }
  
    return (
      <React.Fragment>
        <div className="container mt-5 fs-2">
        <div className="row">
          <div className="col-md-5">
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control  form-control-lg"
                  id="inputEmail"
                  name="email"
                  placeholder="Please Enter Your Email"
                  value={state.email}
                  onChange={onFormChange}
                />
              </div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control  form-control-lg"
                id="firstName"
                name="firstName"
                placeholder="Please Enter Your First Name"
                value={state.firstName}
                onChange={onFormChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control  form-control-lg"
                id="lastName"
                name="lastName"
                placeholder="Please Enter Your Last Name"
                value={state.lastName}
                onChange={onFormChange}
              />
            </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control  form-control-lg"
                  id="inputPassword"
                  name="password"
                  placeholder="Please Enter Your Password"
                  value={state.password}
                  onChange={onFormChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputConfirmPassword" className="form-label">
                  Password Confirm
                </label>
                <input
                  type="password"
                  className="form-control  form-control-lg"
                  id="inputConfirmPassword"
                  name="passwordConfirm"
                  placeholder="Please Confirm Your Password"
                  value={state.passwordConfirm}
                  onChange={onFormChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputUrl" className="form-label">
                  Profile Url
                </label>
                <input
                  type="text"
                  className="form-control  form-control-lg"
                  id="inputUrl"
                  name="avatarUrl"
                  placeholder="Provide a URL to an Image"
                  value={state.avatarUrl}
                  onChange={onFormChange}
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={onRegister}>
                Submit
              </button>
            </form>
          </div>
          {/* <div className="col-md-5">
            <h4>Output</h4>
            <pre>
              <code>{JSON.stringify(userFormData,undefined,2)}</code>
            </pre>
          </div> */}
        </div>
      </div>
      </React.Fragment>
    )
}

export default Register;