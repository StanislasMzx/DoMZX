import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  xsrfCookieName: "csrf_access_token",
  xsrfHeaderName: "X-CSRF-TOKEN",
  data: undefined,
});
