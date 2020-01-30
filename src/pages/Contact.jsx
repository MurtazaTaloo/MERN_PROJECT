import React, { Component } from "react";
import ContactForm from "../Components/ContactForm";

class Contact extends Component {
  submit = values => {
    console.log(values);
  };

  render() {

    return (
      <div>
        <h1>Contact Form</h1>
        <ContactForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default Contact;
