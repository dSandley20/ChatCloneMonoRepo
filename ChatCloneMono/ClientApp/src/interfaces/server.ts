export interface IServerListItem {
    id: number;
    server_name: string;
}

export interface ICreateServer {
    server_name: string;
    creator_id: number;
}