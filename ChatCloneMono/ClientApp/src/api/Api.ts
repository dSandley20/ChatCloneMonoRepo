import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44458",
});

const setToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export { api, setToken };
