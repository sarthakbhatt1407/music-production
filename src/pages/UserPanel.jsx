import React, { useEffect, useState } from "react";
import DrawerPanel from "../components/DrawerPanel";
import { useParams } from "react-router";
import Form from "../components/UserPanel/Form";
import History from "../components/UserPanel/History";
import OrderDetailsPage from "../components/UserPanel/OrderDetailsPage";
import EditOrder from "../components/UserPanel/EditOrder";
import UserPanelHome from "../components/UserPanel/UserPanelHome";
import ProfilePage from "../components/UserPanel/ProfilePage";
import CopyRightPage from "../components/UserPanel/CopyRightPage";
import { PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import LegalDoc from "../components/UserPanel/LegalDoc";

const UserPanel = () => {
  const page = useParams().page;
  const id = useParams().id;
  const action = useParams().action;
  const [open, setOpen] = useState(false);
  const onChange = (checked) => {
    setOpen(!open);
  };

  useEffect(() => {}, [page]);

  return (
    <div>
      <div>
        {" "}
        <FloatButton.Group
          open={open}
          onClick={onChange}
          trigger="click"
          style={{
            right: 30,
            transform: "scale(1.5)",
            zIndex: 1,
          }}
          tooltip={<div>Contact us</div>}
          icon={<PhoneOutlined />}
        >
          <FloatButton
            onClick={() => {
              window.open("tel:+918384864363", "_blank");
              setOpen(!open);
            }}
            tooltip={<div>Phone</div>}
            icon={
              <PhoneOutlined
                style={{
                  color: "#2178e9e0",
                }}
              />
            }
          />
          <FloatButton
            style={{}}
            onClick={() => {
              window.open("https://wa.me/+918126770620", "_blank");
              setOpen(!open);
            }}
            tooltip={<div>Whatsapp</div>}
            icon={
              <WhatsAppOutlined
                style={{
                  color: "#50CC5E",
                }}
              />
            }
          />
        </FloatButton.Group>
        <DrawerPanel page={page}>
          {page === "home" && <UserPanelHome />}
          {page === "profile" && <ProfilePage />}
          {page === "upload" && <Form />}
          {page === "history" && <History />}
          {page === "copyright" && <CopyRightPage />}
          {page === "legal-document" && <LegalDoc />}
          {id && !action && <OrderDetailsPage />}
          {action === "edit" && <EditOrder />}
        </DrawerPanel>{" "}
      </div>
    </div>
  );
};

export default UserPanel;
