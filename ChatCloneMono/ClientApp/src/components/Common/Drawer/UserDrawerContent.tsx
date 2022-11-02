import { Box, List } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";

interface DrawerContentProps {
  handlerFunction: (value: boolean) => void;
}

const UserDrawerContent = (props: DrawerContentProps) => {
  const { handlerFunction } = props;

  const [isServerListOpen, setServerListOpen] = useState(false);
  const [isMessageListOpen, setMessageListOpen] = useState(false);
  const data = useAppSelector((state) => state.servers.servers);

  return (
    <Box
      sx={{ width: 250 }}
      onClick={() => {
        handlerFunction(false);
      }}
    >
      <List>
        {/* <CollapseDrawerList
          openHandler={() => {
            setServerListOpen(!isServerListOpen);
          }}
          isOpen={isServerListOpen}
          key={data[0].Id}
          data={data[0]}
        />
        <CollapseDrawerList
          openHandler={() => {
            setMessageListOpen(!isMessageListOpen);
          }}
          isOpen={isMessageListOpen}
          key={data[1].Id}
          data={data[1]}
        /> */}
      </List>
    </Box>
  );
};

export default UserDrawerContent;
