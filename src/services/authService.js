import http from "./httpService";
import config from "../config.json";

const cookieName = "Flori-Auth";

const apiEndpoint = config.apiURL + "/auth/login";
const tokenKey = "token";
const options = {
  expires: new Date(Date.now() + 3600000),
  path: "/",
  domain: "http://localhost:5173",
  secure: true,
  sameSite: "None",
};
export async function login(email, password) {
  const result = await http.post(apiEndpoint, { email, password });
  let cookieData = {};
  cookieData[cookieName] = result.data.authentication.sessionToken;
  cookieData.username = result.data.username;

  http.setCookies(cookieData, options);
}

export function logout() {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `username=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
export function getCurrentUser() {
  try {
    const cookies = getCookies();
    const sessionToken = cookies[cookieName];
    return cookies;
  } catch (ex) {
    return null;
  }
}
export const navigateToLogin = (navigate) => {
  navigate("/login");
};
export function getCookies() {
  const cookies = {};
  document.cookie.split(";").forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name && value) cookies[name] = value;
  });
  if (Object.keys(cookies).length) return cookies;
  return null;
}
export default { login, logout, getCurrentUser, navigateToLogin };
