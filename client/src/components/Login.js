import axios from "axios";
import React, { useState } from "react";
import Input from "./input";

export default function SignIn(){

    const [errors, setErrors] = useState({
        error: false,
        errorMessage: ""
    })

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    function handleChange(event){
        const name = event.target.name;
        const newValue = event.target.value;
        setUserInfo((oldUserInfo) =>{
            return {
                ...oldUserInfo,
                [name]: newValue
            }
        })
    }

async function loginUser(event){
    event.preventDefault();
    try {
        const userLogged = await axios.post("http://localhost:5000/auth/login", userInfo, {withCredentials: true})

        if(userLogged.data.success === false){
            setErrors({
                error: true,
                errorMessage: "Wrong password/Email combination"
            })
        }
        else{
            setErrors({
                error: false,
                errorMessage: ""
            })
        }
        console.log(userLogged)
    } catch (error) {
    }

}


    return(
        <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src="images/signin-image.jpg" alt="sing up img"/></figure>
                        <a href="/register" className="signup-image-link">Create an account</a>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Sign In</h2>
                        {errors.error ? <h1>{errors.errorMessage}</h1>: null}
                        <form onSubmit={loginUser} className="register-form" id="login-form">
                            <Input type="email"     function={handleChange} required="true" name="email" placeHolder="Email" icon="zmdi-email"/>
                            <Input type="password"  function={handleChange} required="true" name="password" placeHolder="Password" icon="zmdi-lock"/>

                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}