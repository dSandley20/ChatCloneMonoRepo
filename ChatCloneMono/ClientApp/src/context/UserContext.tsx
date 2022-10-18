import React, { createContext, useContext, useState } from "react";
import { IViewableUser } from "../interfaces/user";

export interface IUserContext {
  isAuth: boolean;
  setAuthStatus: (data: boolean) => void;
  user: null | IViewableUser | undefined;
  saveUser: (data: IViewableUser) => void;
  getUserName: () => string;
}

const UserContext = createContext<IUserContext>({
  isAuth: false,
  setAuthStatus(data) {},
  user: null,
  saveUser(data) {},
  getUserName() {
    return "";
  },
});

export default UserContext;

const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IViewableUser | undefined>();

  const setAuthStatus = (data: boolean) => {
    setIsAuth(data);
  };

  const saveUser = (data: IViewableUser) => {
    setUser(data);
  };

  const getUserName = () => {
    return `${user?.first_name} ${user?.last_name} `;
  };

  return (
    <UserContext.Provider
      value={{ user, saveUser, isAuth, setAuthStatus, getUserName }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUserContext() {
  const userContext = useContext(UserContext);
  if (userContext === undefined) {
    throw new Error("useServerContext failed");
  }
  return userContext;
}

export { UserProvider, UserContext, useUserContext };
