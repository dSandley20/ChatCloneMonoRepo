import { createSlice } from "@reduxjs/toolkit";

const serverSlice = createSlice({
    name: "servers",
    initialState: {
        servers: [
            {
                Id: 0,
                Name: "Category 1",
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
            {
                Id: 1,
                Name: "Category 2",
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
        ],
    },
    reducers: {

    }
})

export const { } = serverSlice.actions

export default serverSlice.reducer