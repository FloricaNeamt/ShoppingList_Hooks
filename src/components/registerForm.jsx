import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import { Navigate } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", username: "" },
    errors: {},
    registered: false,
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    username: Joi.string().required().label("Username"),
  };

  doSubmit = async () => {
    try {
      await userService.register(this.state.data);
      this.setState({ registered: true });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (this.state.registered) {
      return <Navigate to="/login" />;
    }
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("username", "Username")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
