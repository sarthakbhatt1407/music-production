import React, { useEffect } from "react";
import DrawerPanel from "../components/DrawerPanel";
import { useParams } from "react-router";
import Form from "../components/UserPanel/Form";
import History from "../components/UserPanel/History";
import OrderDetailsPage from "../components/UserPanel/OrderDetailsPage";
import EditOrder from "../components/UserPanel/EditOrder";
import DeletedOrders from "../components/UserPanel/DeletedOrders";
import UserPanelHome from "../components/UserPanel/UserPanelHome";
import ProfilePage from "../components/UserPanel/ProfilePage";

const UserPanel = () => {
  const page = useParams().page;
  const id = useParams().id;
  const action = useParams().action;

  useEffect(() => {}, [page]);

  return (
    <div>
      <DrawerPanel page={page}>
        {page === "home" && <UserPanelHome />}
        {page === "profile" && <ProfilePage />}
        {page === "upload" && <Form />}
        {page === "history" && <History />}
        {/* {page === "deleted" && <DeletedOrders />} */}
        {id && !action && <OrderDetailsPage />}
        {action === "edit" && <EditOrder />}
      </DrawerPanel>
    </div>
  );
};

export default UserPanel;
