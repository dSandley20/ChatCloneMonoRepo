import React from "react";
import Home from "./components/Home";
import Test from "./components/Test";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    index: true,
    Element: <Test />,
  },
];

export default AppRoutes;
