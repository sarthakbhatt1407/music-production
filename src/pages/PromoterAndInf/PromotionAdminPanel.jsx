import React, { useEffect } from "react";
import { useParams } from "react-router";
import InfOrdersHistory from "../../components/Influencer/InfOrdersHistory";
import InfOrderDetailsPage from "../../components/Influencer/InfOrderDetailsPage";
import InfProfilePage from "../../components/Influencer/InfProfilePage";
import PromotionAdminDrawerPanel from "../../components/PromotionAdmin/PromotionAdminDrawerPanel";
import AdminOrderHistory from "../../components/PromotionAdmin/AdminOrderHistory";
import AdminOrderDetails from "../../components/PromotionAdmin/AdminOrderDetails";
import AdminProfilePage from "../../components/PromotionAdmin/AdminProfilePage";

const PromotionAdminPanel = () => {
  const page = useParams().page;
  const id = useParams().id;
  const action = useParams().action;
  useEffect(() => {}, [page]);
  return (
    <div>
      <PromotionAdminDrawerPanel page={page}>
        {page == "orders" && <AdminOrderHistory />}
        {page === "order-details" && <AdminOrderDetails />}
        {page === "profile" && <AdminProfilePage />}
      </PromotionAdminDrawerPanel>
    </div>
  );
};

export default PromotionAdminPanel;
