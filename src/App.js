import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import UserPanel from "./pages/UserPanel";

const App = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 650,
    });
    // const aosRefresh = setInterval(() => {
    //   AOS.refresh();
    // }, 500);
    return () => {
      // clearInterval(aosRefresh);
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/user-panel" exact element={<UserPanel />} />
        <Route path="/user-panel/:page" exact element={<UserPanel />} />
      </Routes>
    </div>
  );
};

export default App;
