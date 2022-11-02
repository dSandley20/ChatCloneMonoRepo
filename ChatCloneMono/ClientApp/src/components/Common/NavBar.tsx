import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Button } from "reactstrap";
import { useUserContext } from "../../context/UserContext";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggleDrawer } from "../../redux/slices/appSlice";
import NavigationDrawerContent from "./Drawer/NavigationDrawerContent";

const NavBar = () => {
  const isDrawerOpen = useAppSelector((state) => state.app.drawerOpen);
  const dispatch = useAppDispatch();

  const toggleDrawerState = (value: boolean) => {
    dispatch(toggleDrawer(value));
  };

  const { getUserName } = useUserContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ zIndex: 1400, position: "relative" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              toggleDrawerState(!isDrawerOpen);
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
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        hideBackdrop
        onClose={() => {
          toggleDrawerState(false);
        }}
      >
        <Toolbar />
        <NavigationDrawerContent
          handlerFunction={() => {
            //toggleDrawerState(false);
          }}
        />
      </Drawer>
      <Typography>hello?</Typography>
    </Box>
  );
};

export default NavBar;
