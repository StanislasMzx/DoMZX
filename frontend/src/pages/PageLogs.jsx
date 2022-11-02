import React from "react";

import NavBar from "../components/NavBar";
import Logs from "../components/Logs";

function PageLogs() {
  return (
    <>
      <NavBar currentPage={"Logs"} />

      <Logs />
    </>
  );
}

export default PageLogs;
