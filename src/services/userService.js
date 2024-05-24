import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiURL + "/auth/register";

export function register(user) {
  try {
    return http.post(apiEndpoint, {
      email: user.email,
      password: user.password,
      username: user.username,
    });
  } catch (e) {
    console.log(e);
  }
}
