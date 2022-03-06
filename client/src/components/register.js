import React, { useState } from "react";
import Input from "./input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    let navigator = useNavigate();

    const [errors, setErrors] = useState({
        error: false,
        errorMessage: ""
    })

    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confPassword: ""
    })

async function registerUser(event){
    event.preventDefault();

    if(userInfo.password != userInfo.confPassword){
        setErrors({
            error: true,
            errorMessage: "Passwords don't match"
        })
        console.log(errors)
        return;
    }
    else{
        setErrors({
            error: false,
            errorMessage: ""
        })
    }

    try {
        const isUserRegister = await axios.post("http://localhost:5000/auth/register", userInfo, {
            withCredentials: true,
        })
        if(isUserRegister.data.success === true)
            navigator("/login")
    } catch (error) {
        if (error.message.includes(400)){
            setErrors({
                error: true,
                errorMessage: "Email already taken"
            })
            return;
        }
    }
}

function handleChange(event){
    const name = event.target.name;
    const newValue = event.target.value;

    setUserInfo((oldInfo) =>{
        return {
            ...oldInfo,
            [name]: newValue
        }
    })

}

    return (
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        {errors.error ? <h1>{errors.errorMessage}</h1>: null}
                        <form onSubmit={registerUser} method="POST" className="register-form" id="register-form">
                            <Input name="firstName"     required="true"    function={handleChange}  type="text"     placeHolder="First Name"           icon="zmdi-account material-icons-name"/>
                            <Input name="lastName"      required="true"    function={handleChange}  type="text"     placeHolder="Last Name"            icon="zmdi-account material-icons-name"/>
                            <Input name="email"         required="true"    function={handleChange}  type="email"    placeHolder="Your Email"           icon="zmdi-email"/>
                            <Input name="password"      required="true"    function={handleChange}  type="password" placeHolder="Password"             icon="zmdi-lock"/>
                            <Input name="confPassword" function={handleChange}  type="password" placeHolder="Repeat yout password" icon="zmdi-lock-outline"/>

                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img alt="Sign Up img" src="images/signup-image.jpg"/></figure>
                        <a href="/login" className="signup-image-link">I am already member</a>
                    </div>
                </div>
            </div>
    )
}