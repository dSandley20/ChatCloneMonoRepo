import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  const drawerOpen = useAppSelector((state) => state.app.drawerOpen);
  const [marginWidth, setMarginWidth] = useState("0px");

  useMemo(() => {
    setMarginWidth(drawerOpen ? "250px" : "0px");
  }, [drawerOpen]);

  return (
    <div>
      <NavBar />
      <Box
        id="test"
        sx={{ transition: "all .2s ease-in-out", marginLeft: marginWidth }}
      >
        {children}
      </Box>
    </div>
  );
};

export default Layout;
