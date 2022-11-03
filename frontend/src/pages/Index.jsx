import axios from "axios";
import React, { useEffect, useState } from "react";
import EquipmentCards from "../components/EquipmentCards";

import NavBar from "../components/NavBar";

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [equipment, setEquipment] = useState({});

  useEffect(() => {
    const getEquipmentList = async () => {
      try {
        const response = await axios.post("/api/equipment_list");
        setEquipment(response.data);
      } catch (err) {
        console.error(err.response);
      }
      setIsLoading(false);
    };
    getEquipmentList();
  }, [setEquipment, setIsLoading]);

  if (isLoading) {
    return <></>;
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
            <EquipmentCards equipment={equipment} />
          </div>
        </main>
      </div>
    </>
  );
}

export default Index;
