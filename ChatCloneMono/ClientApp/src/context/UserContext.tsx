import React, { createContext, useContext, useState } from "react";
import { IViewableUser } from "../interfaces/user";

export interface IUserContext {
  isAuth: boolean;
  setAuthStatus: (data: boolean) => void;
  user: null | IViewableUser | undefined;
  saveUser: (data: IViewableUser) => void;
}

const UserContext = createContext<IUserContext>({
  isAuth: false,
  setAuthStatus(data) {},
  user: null,
  saveUser(data) {},
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

  return (
    <UserContext.Provider value={{ user, saveUser, isAuth, setAuthStatus }}>
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
