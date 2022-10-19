import { useQuery } from "@tanstack/react-query";
import { IServerListItem } from "../../../interfaces/server";
import serverService from "../../services/ServerService";

const getServerRequest = async (id: number) => {
    return serverService
        .get(`/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            throw new Error("No server found");
        });
};

const useGetServer = (id: number) => {
    return useQuery(["getServer"], () => getServerRequest(id), {
        onSuccess: (response: IServerListItem) => {
            console.log(response);
        },
    });
};

export default useGetServer;
