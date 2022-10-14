import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../../../context/UserContext";
import { ICreateUser } from "../../../interfaces/user";
import { setToken } from "../../Api";
import userService from "../../services/UserService";

const createUserRequest = async (data: ICreateUser) => {
  return userService
    .post("", data)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      throw new Error("Could not create a new user");
    });
};

const useCreateUser = () => {
  const { setAuthStatus } = useUserContext();
  const queryClient = useQueryClient();

  return useMutation(createUserRequest, {
    onSuccess: (response) => {
      setToken(response.data);
      setAuthStatus(true);
      queryClient.invalidateQueries(["getUser"]);
    },
  });
};

export default useCreateUser;
