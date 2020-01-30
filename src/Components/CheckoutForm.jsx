import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
const axios = require("axios");

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    const { currentTarget } = ev;
    const fD = new FormData(currentTarget);

    const customerInfo = {
      name: fD.get("name"),
      address: fD.get("address"),
      email: fD.get("email")
    };

    let { token } = await this.props.stripe.createToken();

    const itemsInCart = this.props.cartData;

    const cartTotal = this.props.cartTotal;

    // axios request to the backend with token to process the payment
    axios
      .post("/charge", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        tokenId: token.id,
        orderData: { itemsInCart, customerInfo, cartTotal }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.log("this is the error" + err));
  }

  render() {
    const fieldStyle = {
      color: "black",
      width: "100%"
    };
    return (
      <div
        style={{
          width: "100%"
        }}
      >
        <form onSubmit={this.submit}>
          <p>Would you like to complete the purchase?</p>

          <input
            style={fieldStyle}
            type="text"
            name="name"
            placeholder="Card Holder's Name"
          />

          <input
            style={fieldStyle}
            type="text"
            name="address"
            placeholder="Delivery address"
          />

          <input
            style={fieldStyle}
            type="text"
            name="email"
            placeholder=" email address"
          />

          <CardElement />
          <button type="submit">Pay</button>
        </form>
        {/* <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button> */}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
