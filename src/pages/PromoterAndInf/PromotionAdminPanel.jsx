import React, { useEffect } from "react";
import { useParams } from "react-router";
import PromotionAdminDrawerPanel from "../../components/PromotionAdmin/PromotionAdminDrawerPanel";
import AdminOrderHistory from "../../components/PromotionAdmin/AdminOrderHistory";
import AdminOrderDetails from "../../components/PromotionAdmin/AdminOrderDetails";
import AdminProfilePage from "../../components/PromotionAdmin/AdminProfilePage";
import AdminHome from "../../components/PromotionAdmin/AdminHome";
import Users from "../../components/PromotionAdmin/Users";
import AdminUserProfile from "../../components/PromotionAdmin/AdminUserProfile";
import UserWallet from "../../components/PromotionAdmin/UserWallet";
import Packages from "../../components/PromotionAdmin/Packages";
import AdminNoti from "../../components/PromotionAdmin/AdminNoti";

const PromotionAdminPanel = () => {
  const page = useParams().page;
  console.log(page);

  const id = useParams().id;
  const action = useParams().action;
  useEffect(() => {}, [page]);
  return (
    <div>
      <PromotionAdminDrawerPanel page={page}>
        {page === "home" && <AdminHome />}
        {page == "orders" && <AdminOrderHistory />}
        {page === "order-details" && <AdminOrderDetails />}
        {page === "profile" && <AdminProfilePage />}
        {page === "users" && <Users />}
        {page === "packages" && <Packages />}
        {page === "wallet" && id && <UserWallet />}
        {page === "notification" && <AdminNoti />}
        {(page === "influencer" || page == "promoter") && id && (
          <AdminUserProfile />
        )}
      </PromotionAdminDrawerPanel>
    </div>
  );
};

export default PromotionAdminPanel;
