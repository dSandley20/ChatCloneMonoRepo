import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import React, { useMemo, useState } from "react";
import { useUserContext } from "../../context/UserContext";

const UserData = () => {
  const { user } = useUserContext();
  const [initials, setInitials] = useState("N/A");

  useMemo(() => {
    if (user) {
      setInitials(
        user.first_name.substring(0, 1) + user.last_name.substring(0, 1)
      );
    }
  }, [user]);
  return (
    <Card
      sx={{
        width: "400px",
        height: "180px",
        backgroundColor: blue[100],
        mb: "15px",
      }}
    >
      <CardHeader
        sx={{ width: "100%", ml: "135px" }}
        avatar={
          <Avatar data-cy="userAvatar" sx={{ bgcolor: red[500] }}>
            {initials}
          </Avatar>
        }
      />
      <CardContent>
        <Stack>
          <Stack direction="row" sx={{ width: "80%", ml: "20px" }}>
            <Typography variant="h6" sx={{ width: "50%" }}>
              First Name
            </Typography>
            <Typography
              variant="h6"
              sx={{ ml: "80px", width: "50%", textAlign: "left" }}
              data-cy="userFName"
            >
              {user?.first_name}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ width: "80%", ml: "20px" }}>
            <Typography variant="h6" sx={{ width: "50%" }}>
              Last Name
            </Typography>
            <Typography
              variant="h6"
              sx={{ ml: "80px", width: "50%", textAlign: "left" }}
              data-cy="userLName"
            >
              {user?.last_name || "N/A"}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ width: "80%", ml: "20px" }}>
            <Typography variant="h6" sx={{ width: "50%" }}>
              Email
            </Typography>
            <Typography
              variant="h6"
              data-cy="userEmail"
              sx={{
                ml: "120px",
                width: "80%",
                textOverflow: "ellipsis",
                overflow: "hidden",
                textAlign: "left",
              }}
            >
              {user?.email || "N/A"}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserData;
