import React from "react";
import {NavLink} from "react-router-dom";

const Register = (props) => {
    const [user, setUser] = React.useState({
        FullName: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
    });

    const [userError, setUserError] = React.useState({
        FullName: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
    });

    function handleField(event){
        switch (event.target.name) {
            case "FullName":
                setUser({...user, FullName: event.target.value});
                validateField(event);
                break;
            case "Email":
                setUser({...user, Email: event.target.value});
                validateField(event);
                break;
            case "Password":
                setUser({...user, Password: event.target.value});
                validateField(event);
                break;
            case "ConfirmPassword":
                setUser({...user, ConfirmPassword: event.target.value});
                validateField(event);
                break;
        }
    }

    function validateField(event){
        let value = event.target.value;
        switch (event.target.name) {
            case "FullName":
                if (value.length > 0 && value.length <= 100){
                    setUserError({...userError, FullName: ""});
                } else {
                    setUserError({...userError, FullName: "Full Name is required (max length 100 characters)"});
                }
                break;
            case "Email":
                if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)){
                    setUserError({...userError, Email: ""});
                } else {
                    setUserError({...userError, Email: "Email is invalid"});
                }
                break;
            case "Password":
                if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)){
                    setUserError({...userError, Password: ""});
                } else {
                    setUserError({...userError, Password: "Min: 8 characters, One lowercase, One uppercase, One number or symbol character"});
                }
                break;
            case "ConfirmPassword":
                if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) && user.Password === value){
                    setUserError({...userError, ConfirmPassword: ""});
                } else {
                    setUserError({...userError, ConfirmPassword: "'ConfirmPassword' and 'Password' do not match."});
                }
                break;
        }
    }



    async function postData(url = '', data = {}, headers = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: data
        });
        return await response.json();
    }

    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();

        formData.append('FullName', user.FullName);
        formData.append('Email', user.Email);
        formData.append('Password', user.Password);
        formData.append('ConfirmPassword', user.ConfirmPassword);

        postData('http://31.131.21.188:7300/v1/Authentication/registration', formData)
        .then((data) => {
            console.log(data);
            //TODO
        }).catch(exception => {
            console.error(exception);
            //TODO
        });
    }

    return(
        <div>
            <h1>Register</h1>
            <div>
                <input type="text" name={"FullName"} value={user.FullName} onChange={handleField} placeholder='Full Name'/>
                <span className={"error"}>{userError.FullName}</span>
                <input type="text" name={"Email"} value={user.Email} onChange={handleField} placeholder='Email Address'/>
                <span className={"error"}>{userError.Email}</span>
                <input type="text" name={"Password"} value={user.Password} onChange={handleField} placeholder='Password'/>
                <span className={"error"}>{userError.Password}</span>
                <input type="text" name={"ConfirmPassword"} value={user.ConfirmPassword} onChange={handleField} placeholder='Re-enter Password'/>
                <span className={"error"}>{userError.ConfirmPassword}</span>
                <a onClick={handleSubmit}>Submit</a>

                <NavLink to={"/login"}>Login</NavLink>
            </div>
        </div>
    )
}

export default Register;