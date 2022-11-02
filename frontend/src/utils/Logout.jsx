import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect } from "react";
axios.defaults.baseURL = `http://localhost:8080`;

function Logout() {
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("/api/logout", { withCredentials: true })
      .then(() => nav("/login"));
  }, []);
}

export default Logout;
