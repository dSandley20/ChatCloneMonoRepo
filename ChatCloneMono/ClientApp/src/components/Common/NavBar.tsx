import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Button } from "reactstrap";
import { useUserContext } from "../../context/UserContext";
import DrawerContent from "./Drawer/DrawerContent";

const NavBar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (value: boolean) => {
    setDrawerOpen(value);
  };

  const { getUserName } = useUserContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              toggleDrawer(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {getUserName()}
          </Typography>
          <Button color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <DrawerContent
          handlerFunction={() => {
            //toggleDrawer(false);
          }}
        />
      </Drawer>
    </Box>
  );
};

export default NavBar;
