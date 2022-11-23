import React from "react";
import { useQuery } from "react-query";
import EquipmentCards from "../components/EquipmentCards";
import NavBar from "../components/NavBar";
import apiClient from "../http-common";

function Index() {
  const fetchEquipment = async () => {
    return await apiClient.get("/api/equipment_list");
  };
  const {
    isLoading,
    data: equipment,
    isError,
  } = useQuery("equipmentList", fetchEquipment);

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <>An error occurred</>;
  }

  return (
    <>
      <NavBar />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 mb-3 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <EquipmentCards equipment={equipment?.data} />
          </div>
        </main>
      </div>
    </>
  );
}

export default Index;
