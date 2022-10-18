import { Box, List } from "@mui/material";
import React, { useState } from "react";
import CollapseDrawerList from "./CollapseDrawerList";

interface DrawerContentProps {
  handlerFunction: (value: boolean) => void;
}

const DrawerContent = (props: DrawerContentProps) => {
  const { handlerFunction } = props;

  const [isServerListOpen, setServerListOpen] = useState(false);
  const [isMessageListOpen, setMessageListOpen] = useState(false);

  const data = {
    documents: [
      {
        Id: 0,
        Name: "Category 1",
        Sheets: [
          {
            Id: 1,
            Title: "Title1 ",
          },
          {
            Id: 2,
            Title: "Title 2",
          },
          {
            Id: 3,
            Title: "Title 3",
          },
        ],
      },
      {
        Id: 1,
        Name: "Category 2",
        Sheets: [
          {
            Id: 4,
            Title: "Title4 ",
          },
          {
            Id: 5,
            Title: "Title 5",
          },
          {
            Id: 6,
            Title: "Title 6",
          },
        ],
      },
    ],
  };
  console.log(data.documents);
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
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
          key={data.documents[0].Id}
          data={data.documents[0]}
        />
        <CollapseDrawerList
          openHandler={() => {
            setMessageListOpen(!isMessageListOpen);
          }}
          isOpen={isMessageListOpen}
          key={data.documents[1].Id}
          data={data.documents[1]}
        />
      </List>
    </Box>
  );
};

export default DrawerContent;
