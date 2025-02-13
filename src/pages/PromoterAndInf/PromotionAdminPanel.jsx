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

const PromotionAdminPanel = () => {
  const page = useParams().page;
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
        {page === "wallet" && id && <UserWallet />}
        {(page === "influencer" || page == "promoter") && id && (
          <AdminUserProfile />
        )}
      </PromotionAdminDrawerPanel>
    </div>
  );
};

export default PromotionAdminPanel;
