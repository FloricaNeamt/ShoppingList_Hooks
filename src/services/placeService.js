import http from "./httpService";
import config from "../config.json";
import { getCookies } from "./authService";
import auth from "./authService";

const apiEndpoint = config.apiURL + "/places";
function placeUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export async function getPlaces() {
  getCookies();
  try {
    const result = await http.get(apiEndpoint, {
      withCredentials: true,
    });
    return result;
  } catch (e) {
    if (e.response && e.response.status === 403) {
      auth.logout();
      window.location = "/";
    } else {
      console.log(e);
    }
    return null;
  }
}
export function getPlace(placeId) {
  return http.get(placeUrl(placeId), { withCredentials: true });
}

export function savePlace(place) {
  if (place._id) {
    const body = { ...place };
    delete body._id;
    return http.put(productUrl(place._id), body, { withCredentials: true });
  }
  return http.post(apiEndpoint, place, {
    withCredentials: true,
  });
}
