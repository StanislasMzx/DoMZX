import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

function PrivateRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.post("/api/auth");
        setIsLoggedIn(response.data.logged_in);
      } catch (err) {
        setIsLoggedIn(false);
        console.error(err.response);
      }
      setIsLoading(false);
    };
    checkLogin();
  }, [setIsLoading, setIsLoggedIn]);

  if (isLoading) {
    return <></>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoutes;
