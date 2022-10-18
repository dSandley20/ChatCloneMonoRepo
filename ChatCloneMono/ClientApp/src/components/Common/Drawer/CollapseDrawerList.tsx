import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

interface CollapseDrawerListProps {
  isOpen: boolean;
  data: any;
  openHandler: () => void;
}

const CollapseDrawerList = (props: CollapseDrawerListProps) => {
  const { isOpen, data, openHandler } = props;
  return (
    <Box>
      <ListItem
        button
        key={data.Id}
        onClick={() => {
          console.log("hi?");
          openHandler();
        }}
      >
        <ListItemText primary={data.Name} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse key={data.Sheets.Id} in={isOpen} timeout="auto">
        <List component="li" key={data.Id} sx={{ maxHeight: "400px" }}>
          {data.Sheets.map((sheet) => {
            console.log(sheet);
            return (
              <ListItem button key={sheet.Id}>
                <ListItemIcon>
                  {/* <InsertDriveFileTwoToneIcon /> */}
                </ListItemIcon>
                <ListItemText key={sheet.Id} primary={sheet.Title} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider />
    </Box>
  );
};

export default CollapseDrawerList;
