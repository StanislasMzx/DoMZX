import React from "react";
import EquipmentList from "../components/EquipmentList";
import NavBar from "../components/NavBar";
import Users from "../components/Users";

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
            <div className="mb-6">
              <h2 className="text-2xl text-gray-900 text-center font-medium uppercase text-yellow-400 mb-3">
                Users
              </h2>
              <Users />
            </div>
            <div className="mb-6">
              <h2 className="text-2xl text-gray-900 text-center font-medium uppercase text-yellow-400 mb-3">
                Equipment
              </h2>
              <EquipmentList />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Settings;
