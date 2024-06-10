import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Logging the error", error);
    toast("an unexpected error occured.");
  }
  return Promise.reject(error);
});

function setCookies(cookies) {
  Object.keys(cookies).forEach((cookieName) => {
    document.cookie = `${cookieName}=${cookies[cookieName]}; path=/`;
  });
}
export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  setCookies,
};
