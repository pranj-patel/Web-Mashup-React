import React from "react";
// import Navbar from "./pages/header/Navbar";
import { Outlet } from "react-router-dom";
import Navbar2 from "./pages/header/Navbar2";

const App = () => {
  return (
    <div className="Container">
      <Navbar2 />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
