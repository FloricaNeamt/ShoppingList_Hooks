import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { useNavigate, useParams } from "react-router-dom";

import { getPlaces } from "../services/placeService";
import { getProduct, saveProduct } from "../services/productService";

class ProductForm extends Form {
  state = {
    data: {
      name: "",
      placeId: "",
      quantity: "",
      category: "",
    },
    errors: {},
    places: [],
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    placeId: Joi.string().required().label("Place"),
    quantity: Joi.number().required().min(0).max(100).label("Quantity"),
    category: Joi.string().required().label("Category"),
  };
  async populatePlaces() {
    const { data: places } = await getPlaces();
    this.setState({ places });
  }
  async populateProduct() {
    try {
      const productId = this.props.params.id;
      if (productId === "new") return;
      const { data: product } = await getProduct(productId);
      this.setState({ data: this.mapToViewModel(product) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.navigate("/not-found");
    }
  }
  async componentDidMount() {
    await this.populatePlaces();
    await this.populateProduct();
  }

  mapToViewModel(product) {
    return {
      _id: product._id,
      name: product.name,
      placeId: product.place._id,
      quantity: product.quantity,
      category: product.category,
    };
  }
  doSubmit = async () => {
    await saveProduct(this.state.data);
    this.props.navigate("/products");
  };

  render() {
    return (
      <div>
        <h1>Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect(
            "placeId",
            "Place",
            this.state.places.sort((a, b) => {
              if (
                a.name === this.state.data.placeId &&
                b.name !== this.state.data.placeId
              ) {
                return -1;
              } else if (
                a.name !== this.state.data.placeId &&
                b.name === this.state.data.placeId
              ) {
                return 1;
              } else {
                return 0;
              }
            })
          )}
          {this.renderInput("quantity", "Quantity", "number")}
          {this.renderInput("category", "Category")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

function withRouter(Component) {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} params={params} />;
  };
}
export default withRouter(ProductForm);
