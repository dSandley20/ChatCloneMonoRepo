import { Drawer, Toolbar } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import UserDrawerContent from "../components/Common/Drawer/UserDrawerContent";

const ServerPage = () => {
  let { id } = useParams();
  return (
    <div>
      <h3>ID: {id}</h3>
      <Drawer
        variant="permanent"
        anchor="right"
        open={true}
        hideBackdrop
        onClose={() => {}}
      >
        <Toolbar />
        <UserDrawerContent
          handlerFunction={() => {
            //toggleDrawer(false);
          }}
        />
      </Drawer>
    </div>
  );
};

export default ServerPage;
