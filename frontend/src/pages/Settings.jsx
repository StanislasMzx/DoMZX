import React from "react";
import EquipmentList from "../components/EquipmentList";
import NavBar from "../components/NavBar";
import Users from "../components/Users";
import Divider from "../components/Divider";

function Settings() {
  return (
    <>
      <NavBar />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 mb-3 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Settings
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Divider title="USERS" />
            <Users />
            <Divider title="EQUIPMENT" />
            <EquipmentList />
          </div>
        </main>
      </div>
    </>
  );
}

export default Settings;
