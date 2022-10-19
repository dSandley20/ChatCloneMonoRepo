import { api } from "../Api";

const serverService = api;
serverService.defaults.baseURL += "/server";

export default serverService;
