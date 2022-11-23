import { Outlet, Navigate } from "react-router-dom";
import apiClient from "../http-common";
import { useQuery } from "react-query";

function PrivateRoutes() {
  const fetchLogState = async () => {
    return await apiClient.get("/api/whoami");
  };
  const {
    isLoading,
    data: isLogged,
    isError,
  } = useQuery("logState", fetchLogState, {
    retry: 0,
  });

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoutes;
