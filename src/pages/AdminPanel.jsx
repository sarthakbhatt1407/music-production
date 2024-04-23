import React, { useEffect } from "react";
import { useParams } from "react-router";
import AdminDrawerPanel from "../components/AdminDrawerPanel";
import Orders from "../components/AdminPanel/Orders";
import OrderDetailsPage from "../components/AdminPanel/OrderDetailsPage";
import PendingWork from "../components/AdminPanel/PendingWork";
import History from "../components/AdminPanel/History";
import AllUsers from "../components/AdminPanel/AllUsers";
import UserProfile from "../components/AdminPanel/UserProfile";

const AdminPanel = () => {
  const page = useParams().page;
  const id = useParams().id;
  const action = useParams().action;
  useEffect(() => {}, [page]);
  return (
    <div>
      <AdminDrawerPanel page={page}>
        {page === "orders" && <Orders />}
        {page === "pending-work" && <PendingWork />}
        {page === "history" && <History />}
        {page === "all-users" && <AllUsers />}
        {page === "user-profile" && <UserProfile />}
        {id && !action && !page && <OrderDetailsPage />}
      </AdminDrawerPanel>
    </div>
  );
};

export default AdminPanel;
