import React, { Component } from "react";
import axios from "axios";
import AddToCart from "../components/AddToCart";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../components/products.css";
import "../components/Carousel.css";
import Carousel from "react-bootstrap/Carousel";

class Product extends Component {
  state = {
    product: null
  };

  componentDidMount = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK_END}/listings/${this.props.match.params.id}`
    );
    console.log(response.data);
    this.setState({ product: response.data });
  };

  checkImages = images => {
    if (!images) {
      return null;
    }
    if (typeof images === String) {
      return <img width="400" src={images} alt="product" />;
    }
    if (images.length === 0) {
      return null;
    }

    return (
      <div ClassName="photo">
        <Carousel id="product-carousel">
          {images.map(image => (
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-img"
                src={image}
                alt="Product"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  };

  // Line 66:38:  Emojis should be wrapped in <span>, have role="img", and have an accessible description with aria-label or aria-labelledby  jsx-a11y/accessible-emoji

  render() {
    const { product } = this.state;
    return (
      product && (
        <div className="Content2 d-flex container justify-content-center mt-5">
          <div className="l-side mt-5">
            <div className="carousel-img">
              {this.checkImages(product.image)}
            </div>
            <div className="product-price mt-3 mr-4">
              <h3>${product.price} HKD</h3>
            </div>
            <div className="in-stock ml-1">
              <h6>
                In Stock:{" "}
                {product.available ? (
                  <span role="img" aria-label="available">
                    {" "}
                    ✅
                  </span>
                ) : (
                  <span role="img" aria-label="unvailable">
                    {" "}
                    ❌
                  </span>
                )}
              </h6>
            </div>
            <div className="product-buttons d-flex align-items-center mt-3">
              {product.available ? <AddToCart product={product} /> : null}
              <br></br>
              <Link to={`/all_products`}>
                <Button
                  style={{ backgroundColor: "#000000" }}
                  size="md"
                  className="back-to-product-btn back-to-products"
                >
                  Back to Product page
                </Button>
              </Link>
            </div>
          </div>
          <div className="r-side mt-5 ml-4">
            <div className="ProductTitle">
              <h1>{product.title}</h1>
            </div>
            <div className="ProductDescription mt-3">
              <h2>Health Benefits:</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Product;
