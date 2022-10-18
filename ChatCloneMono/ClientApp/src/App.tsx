import { useAuth0 } from "@auth0/auth0-react";
import React, { useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setToken } from "./api/Api";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Common/Layout";
import { useUserContext } from "./context/UserContext";
import "./custom.css";
import AuthPage from "./pages/AuthPage";
import LoadingPage from "./pages/LoadingPage";

const AuthRoutes = () => {
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </Layout>
  );
};

const DefaultRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
};

const LoadingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoadingPage />} />
    </Routes>
  );
};

const App = () => {
  // const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { user, setAuthStatus, isAuth } = useUserContext();
  const navigate = useNavigate();
  // const { data } = useGetUser();

  const [routes, setRoutes] = useState(<LoadingRoutes />);

  useMemo(async () => {
    console.log(isAuth);
    if (isAuthenticated) {
      const JWT = await getAccessTokenSilently();
      setAuthStatus(true);
      setToken(JWT);
    }
    if (isAuth) {
      setRoutes(<AuthRoutes />);
      navigate("/home");
    } else if (!isAuth) {
      console.log("hello?");
      setRoutes(<DefaultRoutes />);
      navigate("/auth");
    }
  }, [isAuthenticated, isAuth]);

  return routes;
};

export default App;
