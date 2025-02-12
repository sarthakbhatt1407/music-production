import React, { useEffect } from "react";
import { useParams } from "react-router";
import PromotionAdminDrawerPanel from "../../components/PromotionAdmin/PromotionAdminDrawerPanel";
import AdminOrderHistory from "../../components/PromotionAdmin/AdminOrderHistory";
import AdminOrderDetails from "../../components/PromotionAdmin/AdminOrderDetails";
import AdminProfilePage from "../../components/PromotionAdmin/AdminProfilePage";
import AdminHome from "../../components/PromotionAdmin/AdminHome";

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
      </PromotionAdminDrawerPanel>
    </div>
  );
};

export default PromotionAdminPanel;
