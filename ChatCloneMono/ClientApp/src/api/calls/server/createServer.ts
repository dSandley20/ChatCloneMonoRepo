import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateServer } from "../../../interfaces/server";
import serverService from "../../services/ServerService";

const createUserRequest = async (data: ICreateServer) => {
    return serverService
        .post("", data)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            throw new Error("Could not create a new server");
        });
};

const useCreateServer = () => {
    const queryClient = useQueryClient();

    return useMutation(createUserRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries(["getServerList"]);
        },
    });
};

export default useCreateServer;
