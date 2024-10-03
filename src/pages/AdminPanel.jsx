import React, { useEffect } from "react";
import { useParams } from "react-router";
import AdminDrawerPanel from "../components/AdminDrawerPanel";
import Orders from "../components/AdminPanel/Orders";
import OrderDetailsPage from "../components/AdminPanel/OrderDetailsPage";
import PendingWork from "../components/AdminPanel/PendingWork";
import History from "../components/AdminPanel/History";
import AllUsers from "../components/AdminPanel/AllUsers";
import UserProfile from "../components/AdminPanel/UserProfile";
import CopyrightAdmin from "../components/AdminPanel/CopyrightAdmin";
import UserQueries from "../components/AdminPanel/UserQueries";
import EditOrder from "../components/AdminPanel/EditOrder";
import PendingProfiles from "../components/AdminPanel/PendingProfiles";

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
        {page === "copyright" && <CopyrightAdmin />}
        {page === "all-users" && <AllUsers />}
        {page === "user-profile" && <UserProfile />}
        {page === "user-queries" && <UserQueries />}
        {page === "pending-profile" && <PendingProfiles />}
        {id && !action && !page && <OrderDetailsPage />}
        {action === "edit" && <EditOrder />}
      </AdminDrawerPanel>
    </div>
  );
};

export default AdminPanel;
