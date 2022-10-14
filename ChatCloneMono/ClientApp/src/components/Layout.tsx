import React from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div>
      <NavMenu />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
