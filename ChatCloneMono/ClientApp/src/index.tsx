import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import {Provider} from 'react-redux'
import store from './redux/store'
const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <Auth0Provider
    domain="dev-a27rucnc.us.auth0.com"
    clientId="I9BM0uxe11esDBUydrhY3aeQ22JA7idm"
    redirectUri={window.location.origin}
  >
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
      </Provider>
    </QueryClientProvider>
  </Auth0Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
