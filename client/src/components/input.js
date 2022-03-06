import React from "react";

export default function Input(props) {

    let requiredFlag = false;
    if(props.required !== 'undefined')
        requiredFlag = true;

    return (
        <div className="form-group">
            <label htmlFor={props.name}><i className={`zmdi ${props.icon}`}></i></label>
            <input type={props.type} required={requiredFlag ? true : false} onChange={(event) =>{
                props.function(event);
            }} name={props.name} id="name" placeholder={props.placeHolder}/>
        </div>)
 }