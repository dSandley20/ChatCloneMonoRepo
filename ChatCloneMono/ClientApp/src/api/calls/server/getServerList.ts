import { useQuery } from "@tanstack/react-query";
import { IServerListItem } from "../../../interfaces/server";
import serverService from "../../services/ServerService";

const getServerListRequest = async () => {
    return serverService
        .get(``)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            throw new Error("No servers found");
        });
};

const useGetServerList = () => {
    return useQuery(["getServerList"], () => getServerListRequest(), {
        onSuccess: (response: IServerListItem) => {
            console.log(response);
        },
    });
};

export default useGetServerList;
