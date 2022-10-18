import React from "react";
import Home from "./pages/Home";
import Test from "./pages/Test";

const AppRoutes = [
  {
    index: true,
    path: "/home",
    element: <Home />,
  },
  {
    index: true,
    path: "/test",
    element: <Test />,
  },
];

export default AppRoutes;
