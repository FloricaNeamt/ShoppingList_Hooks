import React, { Component } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ProductForm from "./components/productForm";
import PlaceForm from "./components/placeForm";
import Products from "./components/products";
import NavBar from "./components/navbar";
import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/products/:id" element={<ProductForm />} />
            <Route
              path="/products"
              element={
                user ? (
                  <Products user={this.state.user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/places/:id" element={<PlaceForm />} />

            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
