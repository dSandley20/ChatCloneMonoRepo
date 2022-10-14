import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../../context/UserContext";
import { IViewableUser } from "../../../interfaces/user";
import userService from "../../services/UserService";

const getUserRequest = async () => {
  return userService
    .get("")
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      throw new Error("No user found");
    });
};

const useGetUser = () => {
  const { saveUser } = useUserContext();

  return useQuery(["getUser"], () => getUserRequest(), {
    onSuccess: (response: IViewableUser) => {
      console.log(response);
      saveUser(response);
    },
  });
};

export default useGetUser;
