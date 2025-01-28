import React, { useEffect } from "react";
import { useParams } from "react-router";

import BrandDrawerPanel from "../../components/Brand/BrandAdminPanelDrawer";
import OrderCreator from "../../components/Brand/OrderCreator";
import OrdersHistory from "../../components/Brand/OrdersHistory";
import OrderDetailsPage from "../../components/Brand/OrderDetailsPage";
import ChatScreen from "../../components/Brand/ChatScreen";
import ProfilePage from "../../components/Brand/ProfilePage";

const BrandAdminPanel = () => {
  const page = useParams().page;
  const id = useParams().id;
  const action = useParams().action;
  useEffect(() => {}, [page]);
  return (
    <div>
      <BrandDrawerPanel page={page}>
        {page === "new-order" && <OrderCreator />}
        {page === "order-history" && <OrdersHistory />}
        {page === "order-details" && id && <OrderDetailsPage />}
        {page === "chat" && <ChatScreen />}
        {page === "profile" && <ProfilePage />}
        {/* {page === "pending-work" && <PendingWork />}
        {page === "history" && <History />}
        {page === "copyright" && <CopyrightAdmin />}
        {page === "all-users" && <AllUsers />}
        {page === "notification" && <Notification />}
        {page === "user-profile" && <UserProfile />}
        {page === "user-queries" && <UserQueries />}
        {page === "pending-profile" && <PendingProfiles />}
        {id && !action && !page && <OrderDetailsPage />}
        {action === "edit" && <EditOrder />} */}
      </BrandDrawerPanel>
    </div>
  );
};

export default BrandAdminPanel;
