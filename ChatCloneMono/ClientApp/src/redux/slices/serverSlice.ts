import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const serverSlice = createSlice({
  name: "servers",
  initialState: {
    servers: {
      Id: 0,
      Name: "Servers",
      Sheets: [
        {
          Id: 1,
          Title: "Title 1",
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

    directMessages: {
      Id: 1,
      Name: "Messages",
      Sheets: [
        {
          Id: 4,
          Title: "Title 4",
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
  },
  reducers: {
    populateServers: (state, action: PayloadAction<any>) => {
      state.servers = action.payload;
    },
    populateMessages: (state, action: PayloadAction<any>) => {
      state.directMessages = action.payload;
    },
  },
});

export const { populateMessages, populateServers } = serverSlice.actions;

export default serverSlice.reducer;
