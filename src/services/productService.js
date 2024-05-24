import http from "./httpService";
import config from "../config.json";
import { getCookies } from "./authService";
const apiEndpoint = config.apiURL + "/products";

function productUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getProducts() {
  getCookies();
  return http.get(apiEndpoint, { withCredentials: true });
}
export function getProduct(productId) {
  return http.get(productUrl(productId), { withCredentials: true });
}
export function saveProduct(product) {
  if (product._id) {
    const body = { ...product };
    delete body._id;
    return http.put(productUrl(product._id), body, { withCredentials: true });
  }
  return http.post(apiEndpoint, product, {
    withCredentials: true,
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Content-Type": "application/json",
    // },
  });
}
export function deleteProduct(productId) {
  return http.delete(productUrl(productId));
}
