import React from "react";
import { Route } from "react-router-dom";
import Login from "../../components/Login";
import Register from "../../components/Register";

const AuthPage = () => {
    return(
        <div>
            <h1>AuthPage</h1>
            <Route path="/login" exact>
                <Login/>
            </Route>
            <Route path="/register" exact>
                <Register/>
            </Route>
        </div>
    )
}

export default AuthPage;