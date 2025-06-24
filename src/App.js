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
import PromotionAdminPanel from "./pages/PromoterAndInf/PromotionAdminPanel";
import DualLoginPage from "./pages/DualLoginPage";
import MusicDistLogin from "./pages/MusicDistLogin";

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const type = useSelector((state) => state.type);
  const isAdmin = useSelector((state) => state.isAdmin);
  console.log(`${process.env.PUBLIC_URL}`);

  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 650,
    });
    const localStr = JSON.parse(localStorage.getItem("state"));

    if (localStr && !localStr.type) {
      dispatch({ type: "logout" });
      return;
    }

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
        {!isLoggedIn && (
          <Route path="/login" exact element={<MusicDistLogin />} />
        )}
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
        )}{" "}
        <Route path="/select-login" exact element={<DualLoginPage />} />
        {!isLoggedIn && <Route path="/register" exact element={<Register />} />}
        {isLoggedIn && !isAdmin && type == "music-user" && (
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
        {isLoggedIn && isAdmin && type == "music-admin" && (
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
        {type == "promoter" && (
          <>
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
          </>
        )}
        {type == "influencer" && (
          <>
            {" "}
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
          </>
        )}
        {type == "promotion-admin" && (
          <>
            {" "}
            <Route
              path="/admin-admin-panel/:page"
              exact
              element={<PromotionAdminPanel />}
            />
            <Route
              path="/admin-admin-panel/:page/:id"
              exact
              element={<PromotionAdminPanel />}
            />
          </>
        )}
        <Route path="*" exact element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
