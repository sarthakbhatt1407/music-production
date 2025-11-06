import React, { useEffect } from "react";
import { useParams } from "react-router";
import InfDrawerPanel from "../../components/Influencer/InfDrawerPanel";
import InfOrdersHistory from "../../components/Influencer/InfOrdersHistory";
import InfOrderDetailsPage from "../../components/Influencer/InfOrderDetailsPage";
import InfProfilePage from "../../components/Influencer/InfProfilePage";
import InfHome from "../../components/Influencer/InfHome";
import InfWallet from "../../components/Influencer/InfWallet";
import { useSelector } from "react-redux";

const InfAdminPanel = () => {
  const page = useParams().page;
  const id = useParams().id;
  const action = useParams().action;
  const adminView = useSelector((state) => state.adminView);
  console.log("adminview", adminView);

  useEffect(() => {}, [page]);
  return (
    <div>
      <InfDrawerPanel page={page}>
        {page === "home" && <InfHome />}
        {page == "orders" && <InfOrdersHistory />}
        {page === "order-details" && <InfOrderDetailsPage />}
        {page === "profile" && <InfProfilePage />}
        {page === "wallet" && <InfWallet />}
      </InfDrawerPanel>
    </div>
  );
};

export default InfAdminPanel;
