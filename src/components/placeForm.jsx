import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { useNavigate } from "react-router-dom";

import { getPlace, savePlace } from "../services/placeService";

class PlaceForm extends Form {
  state = {
    data: {
      name: "",
    },
    errors: {},
    user: [],
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
  };

  async populatePlace() {
    try {
      const placeId = this.props.match.params.id;
      if (placeId === "new") return;
      const { data: place } = await getPlace(placeId);
      this.setState({ data: this.mapToViewModel(place) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
      this.props.navigate("/not-found");
    }
  }
  async componentDidMount() {
    await this.populatePlace();
  }

  mapToViewModel(place) {
    return {
      _id: place._id,
      name: place.name,
    };
  }
  doSubmit = async () => {
    await savePlace(this.state.data);
    this.props.navigate("/products");
  };

  render() {
    return (
      <div>
        <h1>Place Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

function withRouter(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
export default withRouter(PlaceForm);
