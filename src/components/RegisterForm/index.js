import React from "react";
import {NavLink} from "react-router-dom";

const RegisterForm = (props) => {
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
        <section className="auth-page__section section-right">
            <div className="section-right__inner">
                <div className="section-right__content">
                    <div className="section-right__title-wrap">
                        <div className="section-right__title">
                            <div className="section-right__title section-right__title--primary">Register</div>
                            <div>Condo Corporation</div>
                        </div>
                    </div>

                    <form action="" className="section-right__form form">
                        <div className="form__row">
                            <div className="form__col">
                                <div className="input">
                                    <input type="text" placeholder="Full Name" className="input__inner"/>
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <div className="form__col">
                                <div className="input">
                                    <input type="text" placeholder="Email Address" className="input__inner"/>
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <div className="form__col">
                                <div className="input">
                                    <input type="password" placeholder="Password" className="input__inner"/>
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <div className="form__col">
                                <div className="input">
                                    <input type="password" placeholder="Re-enter Password" className="input__inner"/>
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <div className="form__col">
                                <button type="button" className="btn btn--primary is-plain">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="section-right__message">
                        Already have an account? Go back to <a href="/" className="section-right__message-link">Log
                        In</a> page.
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterForm;
