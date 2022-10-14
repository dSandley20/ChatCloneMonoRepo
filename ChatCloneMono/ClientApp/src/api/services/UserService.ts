import { api } from "../Api";

const userService = api;
userService.defaults.baseURL += "/user";

export default userService;
