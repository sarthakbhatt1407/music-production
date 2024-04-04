import React, { useEffect } from "react";
import DrawerPanel from "../components/DrawerPanel";
import { useParams } from "react-router";
import Form from "../components/UserPanel/Form";

const UserPanel = () => {
  const page = useParams().page;

  useEffect(() => {}, [page]);

  return (
    <div>
      <DrawerPanel page={page}>
        {page === "home" && <Form />}
        {page === "history" && <h1>history</h1>}
      </DrawerPanel>
    </div>
  );
};

export default UserPanel;
