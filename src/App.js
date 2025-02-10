import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import UserPanel from "./pages/UserPanel";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import AdminPanel from "./pages/AdminPanel";
import Register from "./pages/Register";
import Error from "./pages/Error";
import ProAndInfLogin from "./pages/PromoterAndInf/Login";
import BrandAdminPanel from "./pages/PromoterAndInf/BrandAdminPanel";
import InfAdminPanel from "./pages/PromoterAndInf/InfAdminPanel";

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
  console.log(process.env.REACT_APP_BASE_URL);

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        {!isLoggedIn && <Route path="/login" exact element={<Login />} />}
        {!isLoggedIn && (
          <Route path="/promotions/login" exact element={<ProAndInfLogin />} />
        )}
        {isLoggedIn && isAdmin && (
          <Route
            path="/login"
            exact
            element={<Navigate to="/admin-panel/orders" />}
          />
        )}
        {isLoggedIn && !isAdmin && (
          <Route
            path="/login"
            exact
            element={<Navigate to="/user-panel/home" />}
          />
        )}
        {!isLoggedIn && <Route path="/register" exact element={<Register />} />}

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
            />{" "}
            <Route
              path="/admin-panel/order/:id/:action"
              exact
              element={<AdminPanel />}
            />
          </>
        )}
        <Route
          path="/promotor-admin-panel/:page"
          exact
          element={<BrandAdminPanel />}
        />
        <Route
          path="/promotor-admin-panel/:page/:id"
          exact
          element={<BrandAdminPanel />}
        />
        <Route
          path="/influencer-admin-panel/:page"
          exact
          element={<InfAdminPanel />}
        />
        <Route
          path="/influencer-admin-panel/:page/:id"
          exact
          element={<InfAdminPanel />}
        />

        <Route path="*" exact element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
