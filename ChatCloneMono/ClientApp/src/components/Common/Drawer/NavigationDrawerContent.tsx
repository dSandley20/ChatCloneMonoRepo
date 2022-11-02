import { Box, List } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { toggleDrawer } from "../../../redux/slices/appSlice";
import CollapseDrawerList from "./CollapseDrawerList";

interface DrawerContentProps {
  handlerFunction: (value: boolean) => void;
}

const NavigationDrawerContent = (props: DrawerContentProps) => {
  const { handlerFunction } = props;
  const navigate = useNavigate();

  const [isServerListOpen, setServerListOpen] = useState(false);
  const [isMessageListOpen, setMessageListOpen] = useState(false);
  const serversList = useAppSelector((state) => state.servers.servers);
  const messagesList = useAppSelector((state) => state.servers.directMessages);
  const dispatch = useDispatch();

  const navigateToServer = (ServerId: number) => {
    navigate(`server/${ServerId}`);
    dispatch(toggleDrawer(false));
  };

  const navigateToDM = (MessageThreadId: number) => {
    navigate(`thread/${MessageThreadId}`);
    dispatch(toggleDrawer(false));
  };

  return (
    <Box
      sx={{ width: 250 }}
      onClick={() => {
        handlerFunction(false);
      }}
    >
      <List>
        <CollapseDrawerList
          openHandler={() => {
            setServerListOpen(!isServerListOpen);
          }}
          isOpen={isServerListOpen}
          key={serversList.Id}
          data={serversList}
          navigationHandler={navigateToServer}
        />
        <CollapseDrawerList
          openHandler={() => {
            setMessageListOpen(!isMessageListOpen);
          }}
          isOpen={isMessageListOpen}
          key={messagesList.Id}
          data={messagesList}
          navigationHandler={navigateToDM}
        />
      </List>
    </Box>
  );
};

export default NavigationDrawerContent;
