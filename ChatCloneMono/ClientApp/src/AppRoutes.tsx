import React from "react";
import Home from "./pages/Home";
import ServerPage from "./pages/ServerPage";
import Test from "./pages/Test";

const AppRoutes = [
  {
    index: true,
    path: "/",
    element: <Home />,
  },
  {
    index: true,
    path: "/test",
    element: <Test />,
  },
  {
    index: true,
    path: "/server/:id",
    element: <ServerPage />,
  },
];

export default AppRoutes;
