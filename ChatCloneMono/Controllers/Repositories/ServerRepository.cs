using ChatCloneMono.Controllers.RepositoryInterfaces;
using ChatCloneMono.Entities.Dtos;
using Dapper;
using Npgsql;

namespace ChatCloneMono.Controllers.Repositories
{
    public class ServerRepository : IServerRepository
    {
        public readonly IConfiguration configuration;
        public NpgsqlConnection connection;

        public ServerRepository(IConfiguration _configuration)
        {
            configuration = _configuration;
            connection = new NpgsqlConnection(configuration["Database:Connection"]);
        }
        public void CreateServer(CreateServerDto serverDetails, int userId)
        {
            if(serverDetails.creator_id != userId)
            {
                throw new Exception("Creator Id does not match User Id");
            }
            var sql = @"INSERT into servers (server_name, creator_id) VALUES (@ServerName, @CreatorId)";
            connection.Execute(sql, new { ServerName = serverDetails.server_name, CreatorId = serverDetails.creator_id});

        }

        public ServerListItemDto GetServer(int serverId)
        {
            return connection.QueryFirstOrDefault<ServerListItemDto>("Select id, server_name FROM servers WHERE id = @Id",
                new { Id = serverId }
                );
        }

        public IEnumerable<ServerListItemDto> GetServers()
        {
            return connection.Query<ServerListItemDto>("Select id, server_name");
        }
    }
}
