import "./styles.css";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";

import Loki from "react-loki";
import * as userService from "../../services/userService";


const ComplexDemo = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
        tenantId: "U044A00FD8B"
    });


    const mergeValues = (values) => {
        console.log("step21", values);
        setState((prevState) => {
            let ns = { ...prevState };
            return ns;
        });
        console.log("step2", state);
    };



    const finishWizard = () => {
        // const data = JSON.stringify(this.state.user);
        // alert(`This is your data ${data}`);
        console.log("i am finish wizard", state);
        //axios request(state);
        userService.login(state).then(loginSuccess).catch(loginError)
    };

    const loginSuccess = () => {
        console.log("login success");
    }

    const loginError = () => {
        console.log("loginError");
    }

    const onFormFieldChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        console.log("i am name", value);
        setState((prevState) => {
            const newUserObject = { ...prevState };
            newUserObject[name] = value;
            return newUserObject;
        });
        console.log("i am name2", state.name);
    };

    const complexSteps = [
        {
            label: "Step 1",
            icon: <FaUser className="mt-3" />,
            component: (
                <input
                    type="text"
                    name="email"
                    value={state.email}
                    onChange={onFormFieldChange}></input>
            ),
        },


        {
            label: "Step 2",
            icon: <FaLock className="mt-3" />,
            component: (
                <input
                    type="text"
                    name="password"
                    value={state.password}
                    onChange={onFormFieldChange}
                ></input>
            ),
        },
    ];

    return (
        <div className="Demo">
            <Loki
                steps={complexSteps}
                onNext={mergeValues.bind(this)}
                onBack={mergeValues.bind(this)}
                onFinish={finishWizard.bind(this)}
            />


        </div>
    );
};
export default ComplexDemo;
