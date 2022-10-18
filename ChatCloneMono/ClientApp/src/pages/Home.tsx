import { useAuth0 } from "@auth0/auth0-react";
import { Button, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import { setToken } from "../api/Api";
import useGetUser from "../api/calls/user/getUser";
import LoginButton from "../components/Auth/LoginButton";
import LogoutButton from "../components/Auth/LogoutButton";
import UserDataCard from "../components/User/UserDataCard";
import { useUserContext } from "../context/UserContext";

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
      {isAuth && <UserDataCard />}
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
    </div>
  );
};

export default Home;
