import { useAuth0 } from "@auth0/auth0-react";
import { Button, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import { setToken } from "../api/Api";
import useGetUser from "../api/calls/user/getUser";
import { useUserContext } from "../context/UserContext";
import LoginButton from "./Auth/LoginButton";
import LogoutButton from "./Auth/LogoutButton";
import CreateUserForm from "./CreateUserForm/CreateUserForm";
import UserData from "./UserData/UserData";

const Home = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { user, setAuthStatus, isAuth } = useUserContext();
  const { data } = useGetUser();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useMemo(async () => {
    if (isAuthenticated) {
      const JWT = await getAccessTokenSilently();
      setAuthStatus(true);
      setToken(JWT);
    }
  }, [isAuthenticated, isAuth]);

  return (
    <div>
      {isAuth && <UserData />}
      <Stack direction="row" sx={{ ml: "50px" }}>
        {!isAuth ? <LoginButton /> : <LogoutButton />}
        <Button
          variant="outlined"
          sx={{ ml: "40px" }}
          onClick={handleClickOpen}
          data-cy="createUpdateUser"
        >
          {!isAuth ? "Create User" : "Update User"}
        </Button>
      </Stack>
      <CreateUserForm onClose={handleClose} open={open} />
    </div>
  );
};

export default Home;
