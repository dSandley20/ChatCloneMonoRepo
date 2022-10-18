import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import LoginButton from "../components/Auth/LoginButton";
import CreateUserForm from "../forms/User/CreateUserForm";

const AuthPage = () => {
  return (
    <Card
      sx={{
        width: "400px",
        backgroundColor: "#9DD1F1",
        ml: "auto",
        mr: "auto",
        mt: "8%",
      }}
    >
      <CardContent>
        <Stack sx={{ alignItems: "center" }} spacing={2}>
          <Avatar>DS</Avatar>
          <Typography variant="h5">Welcome To ChatClone</Typography>
          <CreateUserForm />
          <Divider sx={{ width: "100%", backgroundColor: "rgba(0,0,0,1)" }} />
          <LoginButton />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AuthPage;
