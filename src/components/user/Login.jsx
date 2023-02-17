import React, {useState} from "react";
import toastr from "toastr";
import * as userService from "../../services/userService";
import {useNavigate} from "react-router-dom";
import debug from "sabio-debug";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

function Login(props) {
   const logInSchema = Yup.object().shape({
      email: Yup.string().email("Invalid email provided").required("Required"),
      password: Yup.string().required("Required"),
   });
   const _logger = debug.extend("Login");
   _logger("Starting login", props.location);

   // console.log("sign in",props);
   const navigate = useNavigate();
   const [state] = useState({
      email: "",
      password: "",
      tenantId: "U044A00FD8B",
   });

   // const onFormChange = (event) => {
   //    console.log("onChange", {syntheticEvent: event});
   //    const target = event.target;
   //    const newUserValue = target.value;
   //    const nameOfField = target.name;
   //    console.log({nameOfField, newUserValue});
   //    setState((prevState) => {
   //       console.log("updater onChange", prevState);
   //       const newUserObject = {
   //          ...prevState,
   //       };
   //       newUserObject[nameOfField] = newUserValue;

   //       return newUserObject;
   //    });

   //    console.log("end onChange");
   // };

   const onLogin = (values) => {
      userService.login(values).then(onSuccess).catch(onError);
   };

   const onSuccess = (response) => {
      console.log("i am response", response);
      toastr.success("Login Successful");

      userService.getCurrent().then(onGetCurrentSuccess).catch(onError);
   };

   const onGetCurrentSuccess = (response) => {
      console.log("i am getCurrentSuccess", response.data.item.id);
      //need to check response
      userService
         .getById(response.data.item.id)
         .then(onGetByIdSuccess)
         .catch(onError);
   };

   const onGetByIdSuccess = (response) => {
      console.log("i am onGetByIdSuccess", response);
      const firstName = response.data.item.firstName;
      const lastName = response.data.item.lastName;
      props.setState((prevState) => {
         prevState.firstName = firstName;
         prevState.lastName = lastName;
         prevState.loginStatus = true;
         return prevState;
      });
      navigate(`/`);
   };

   const onError = () => {
      toastr.error("Error");
   };
   console.log("i am state", state);
   return (
      <React.Fragment>
         <div className="container mt-5 fs-2">
            <div className="row">
               <div className="col-md-5">
                  {/* <form>
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
                     <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onLogin}>
                        Submit
                     </button>
                  </form> */}
                  <Formik
                     enableReinitialize={true}
                     initialValues={state}
                     onSubmit={onLogin}
                     validationSchema={logInSchema}>
                     <Form>
                        <div className="d-flex mb-3 justify-content-center">
                           <div className="col-3">
                              <p className="text-center">Please Log In</p>
                              <div className="form-group">
                                 <label htmlFor="email">Email</label>
                                 <Field
                                    type="email"
                                    className="form-control"
                                    name="email"
                                 />
                                 <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="has-error"
                                 />
                                 {/* value={userFormDataLog.email}
                onChange={onLogChange} */}
                              </div>
                              <div className="form-group">
                                 <label htmlFor="password">Password</label>
                                 <Field
                                    type="password"
                                    className="form-control"
                                    name="password"
                                 />
                                 <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="has-error"
                                 />
                              </div>
                              <button
                                 type="submit"
                                 className="btn btn-dark btn-lg ">
                                 Login
                              </button>
                           </div>
                        </div>
                     </Form>
                  </Formik>
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
   );
}

export default Login;
