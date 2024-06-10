import http from "./httpService";
import config from "../config.json";
import { getCookies } from "./authService";
import { toast } from "react-toastify";

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
export async function saveProduct(product) {
  try {
    if (product._id) {
      const body = { ...product };
      const productId = body._id;
      delete body._id;
      await http.patch(productUrl(productId), body, { withCredentials: true });
    } else {
      await http.post(apiEndpoint, product, { withCredentials: true });
    }
  } catch (error) {
    toast.error("An error occurred while saving the product");
    console.log(error);
  }
}
export async function deleteProduct(productId, placeId) {
  const params = { place: placeId };
  try {
    await http.delete(productUrl(productId), {
      params,
      withCredentials: true,
    });
  } catch (error) {
    toast.error("An error occurred while deleting the product");
    console.log(error);
  }
}
