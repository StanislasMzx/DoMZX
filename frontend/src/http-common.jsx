import axios from "axios";

export default axios.create({
  baseURL: "https://www.domzx.ovh",
  withCredentials: true,
  xsrfCookieName: "csrf_access_token",
  xsrfHeaderName: "X-CSRF-TOKEN",
  data: undefined,
});
