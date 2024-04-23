import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import UserPanel from "./pages/UserPanel";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isAdmin = useSelector((state) => state.isAdmin);

  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 650,
    });
    const localStr = JSON.parse(localStorage.getItem("state"));

    if (localStr) {
      dispatch({ type: "reload", data: { ...localStr } });
    }
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
        <Route path="/login" exact element={<Login />} />
        {isLoggedIn && !isAdmin && (
          <>
            <Route path="/user-panel/:page" exact element={<UserPanel />} />
            <Route path="/user-panel/order/:id" exact element={<UserPanel />} />
            <Route
              path="/user-panel/order/:id/:action"
              exact
              element={<UserPanel />}
            />
          </>
        )}
        {isLoggedIn && isAdmin && (
          <>
            <Route path="/admin-panel/:page" exact element={<AdminPanel />} />
            <Route
              path="/admin-panel/order/:id"
              exact
              element={<AdminPanel />}
            />
            <Route
              path="/admin-panel/:page/:id"
              exact
              element={<AdminPanel />}
            />
          </>
        )}
        <Route path="*" exact element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
