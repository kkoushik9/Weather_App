import React from 'react';
import './form.css';

function Form(props) {

    return(
        <div className="container mt-4 ">
            <div>{props.error ? error() : ""}</div>
            <form className=" row justify-content-center" onSubmit={props.loadweather}>
                <input placeholder="City..." className="w-50 mr-2" type="text" name="city" />
                <button className="btn btn-info" type="submit" name="submit">Submit</button> 
            </form>
            
        </div>
    );
}

const error= props =>{
    return(<div className="alert alert-danger mx-5 my-3 " role="alert">
    Please Valid Enter City Name...!
  </div>
  );
}

export default Form;