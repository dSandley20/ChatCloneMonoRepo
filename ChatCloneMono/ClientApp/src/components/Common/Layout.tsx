import React from "react";
import { Container } from "reactstrap";
import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div>
      <NavBar />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
