// Dependencies
import React, { Component } from "react";

// import { Field, reduxForm } from "redux-form";

import { Form, FormGroup, Input, Label, Button } from "reactstrap";

import axios from "axios";

class ContactForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      message: "",
      successMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async handleSubmit(e) {
    e.preventDefault();

    const { name, email, message } = this.state;
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BACK_END}/api/form`,
        {
          name,
          email,
          message
        }
      );
      this.setState({ successMessage: response.data });
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div className="card-container">
        <div className="card2">
          <h1 className="product-title2"> CONTACT US</h1>
          <Form onSubmit={this.handleSubmit} style={{ width: "80%" }}>
            <FormGroup>
              <Label for="Name"></Label>
              <Input
                type="text"
                name="name"
                placeholder="Your Name.."
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="Email"></Label>
              <Input
                className="email"
                type="email"
                name="email"
                placeholder="Your Email.."
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="Message"></Label>
              <Input
                className="message"
                type="textarea"
                style={{ height: 200 }}
                name="message"
                placeholder="Your Message.."
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <Button className="submit-button">Submit</Button>
          </Form>
          <div>
            {this.state.successMessage ? (
              <p style={{ color: "green" }}>{this.state.successMessage}</p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;
