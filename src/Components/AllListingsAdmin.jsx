import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

export class AllListingAdmin extends Component {
  state = {
    data: null
  };
  async componentDidMount() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACK_END + "/listings/all"
      );
      const { data } = response;

      this.setState({ data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { data } = this.state;

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Listing title</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((listing, index) => {
              return (
                <tr key={index}>
                  <td>{listing._id}</td>
                  <td>{listing.title}</td>
                  <td>${listing.price}</td>
                  <td>
                    <Link to={`/edit_listing/${listing._id}`}>
                      <Button>Edit</Button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/delete_listing/${listing._id}`}>
                      <Button style={{ backgroundColor: "#000000" }} size="sm">
                        Delete
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/listing/${listing._id}`}>
                      <Button style={{ backgroundColor: "orange" }} size="sm">
                        Preview
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  }
}

export default AllListingAdmin;
