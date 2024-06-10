import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProductsTable from "./productsTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./searchBox";
import { getProducts, deleteProduct } from "../services/productService";
import { getPlaces } from "../services/placeService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Products extends Component {
  state = {
    products: [],
    pageSize: 4,
    currentPage: 1,
    place: [],
    searchQuery: "",
    selectedPlace: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const result = await getPlaces();
    const places = [{ _id: "", name: "All Places" }, ...result.data];
    const { data: products } = await getProducts();
    this.setState({ products, places });
  }

  handleDelete = async (product) => {
    const originalProducts = this.state.products;
    const products = originalProducts.filter((p) => p._id !== product._id);
    this.setState({ products });

    try {
      await deleteProduct(product._id, product.place._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This product has already been deleted.");
      this.setState({ products: originalProducts });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handlePlaceSelect = (place) => {
    this.setState({ selectedPlace: place, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedPlace: null, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedPlace,
      searchQuery,
      products: allProducts,
    } = this.state;

    let filtered = allProducts;
    if (searchQuery)
      filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (
      selectedPlace &&
      selectedPlace.name &&
      selectedPlace.name != "All Places"
    )
      filtered = allProducts.filter((p) => p.place.name === selectedPlace.name);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const products = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: products };
  };
  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    if (this.state.products.length === 0)
      return (
        <div>
          <p>There are no products in the database.</p>
          {user && (
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <Link className="btn btn-primary" to="/places/new">
                New Place
              </Link>
              <Link className="btn btn-primary" to="/products/new">
                New Product
              </Link>
            </div>
          )}
        </div>
      );

    const { totalCount, data: products } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-md-9">
          <ListGroup
            items={this.state.places}
            selectedItem={this.state.selectedPlace}
            onItemSelect={this.handlePlaceSelect}
          />
        </div>
        <div className="col-md-3">
          <Link className="btn btn-primary" to="/places/new">
            New Place
          </Link>
        </div>

        <div className="col">
          <p>Showing {totalCount} products in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <ProductsTable
            products={products}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          {user && (
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <Link className="btn btn-primary" to="/products/new">
                New Product
              </Link>
            </div>
          )}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Products;
