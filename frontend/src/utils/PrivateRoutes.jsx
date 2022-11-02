import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = `http://localhost:8080`;

function PrivateRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("/api/auth", {
          withCredentials: true,
        });
        setIsLoggedIn(response.data.logged_in);
      } catch (err) {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    };
    checkLogin();
  }, [setIsLoading, setIsLoggedIn]);

  if (isLoading) {
    return <>Checking auth status..</>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoutes;
