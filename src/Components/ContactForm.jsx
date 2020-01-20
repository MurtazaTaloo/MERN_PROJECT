// Dependencies
import React, { Component } from 'react';

import {Field,reduxForm} from 'redux-form';

import './Contact.css'
// Externals
// import Field from './Field';
// import Button from './Button';

const validate = (values) => {
  let errors = [];

  if(!values.name)
  {
    errors.name="This is a required field"
  }

  if(!values.email)
  {
    errors.email="This is a required field"
  }

  if(!values.message)
  {
    errors.message="This is a required field"
  }

  return errors;
  };

class ContactForm extends Component {

  renderField = ({input,type,label,meta:{touched,error,warning}}) => {
    return(
      <div>
        <label><h2>{label}:</h2></label>
        <input {...input} type={type} className="myInput" />
        {touched && 
        (error && <div style={{color: "red"}}>{error}</div>)}
      </div>
    )
  }

  renderMessageField = ({input,type,label,meta:{touched,error,warning}}) => {
    return(
      <div>
        <label><h2>{label}:</h2></label>
        <textarea rows="10" cols="56" {...input} type={type} className="myTextArea" />
        {touched && 
        (error && <div style={{color: "red"}}>{error}</div>)}
      </div>
    )
  }



  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="myContactForm">
        {/* Name field */}
        <Field
          label="Full Name" name="name" component={this.renderField} type="text"/>
      
        {/* Email field */}
        <Field
          label="Email" name="email" component={this.renderField} type="text" />
        {/* Message textarea */}
        <Field
          label="Message" name="message" component={this.renderMessageField} type="text"/>
        {/* Submit button */}
        <button style={{width:80,height:30,borderRadius:10,background:"white",fontSize:"20px"}} type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({form:'contact',validate})(ContactForm);