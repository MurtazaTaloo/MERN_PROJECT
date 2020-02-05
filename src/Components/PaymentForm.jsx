import React, { Component } from "react";
import { connect } from "react-redux";

import { Elements, StripeProvider } from "react-stripe-elements";

import Stripe from "./Stripe";

export class PaymentForm extends Component {
  render() {
    const data = this.props.products;
    const orderId = data && data[0]._id
    // console.log('data', data[0]._id)
    if (!data) {
      return <h1>no items in cart</h1>;
    }
    const totalCart = data.reduce((a, b) => {
      return a + parseFloat(b.price);
    }, 0);
    return (
      <StripeProvider
        apiKey="
      pk_test_rUJstJZFyU6dqDejrAXPdZ7I00a5ztU78b"
      >
        <div>
          <h1>Payment</h1>
          <h3>Total = {totalCart}</h3>
          <Elements>
            <Stripe cartData={data} cartTotal={totalCart} orderId={orderId}/>
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    products: state.cart.products
  };
};

export default connect(mapStateToProps)(PaymentForm);
