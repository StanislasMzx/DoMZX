import React from "react";

import NavBar from "../components/NavBar";
import Logs from "../components/Logs";

function PageLogs() {
  return (
    <>
      <NavBar currentPage={"Logs"} />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 mb-3 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Logs
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Logs />
          </div>
        </main>
      </div>
    </>
  );
}

export default PageLogs;
