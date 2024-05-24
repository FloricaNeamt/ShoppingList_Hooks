import React, { Component } from "react";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
class ProductsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (product) => (
        <Link to={`/products/${product._id}`}>{product.name}</Link>
      ),
    },
    { path: "place.name", label: "Place" },
    { path: "quantity", label: "Quantity" },
    { path: "category", label: "Category" },
    {
      key: "like",
      content: (product) => (
        <Like
          liked={product.liked}
          onClick={() => this.props.onLike(product)}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete  ",
    content: (product) => (
      <button
        onClick={() => this.props.onDelete(product)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { products, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={products}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProductsTable;
