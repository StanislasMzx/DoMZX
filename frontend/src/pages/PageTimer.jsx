import React from "react";

import NavBar from "../components/NavBar";
import Timer from "../components/Timer";

function PageTimer() {
  return (
    <>
      <NavBar currentPage={"Timer"} />

      <Timer />
    </>
  );
}

export default PageTimer;
