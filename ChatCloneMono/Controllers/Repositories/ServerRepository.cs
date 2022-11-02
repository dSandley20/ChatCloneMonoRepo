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
            var sql = @"INSERT INTO servers (server_name, creator_id) VALUES (@ServerName, @CreatorId) RETURNING Id";
            var insertId = connection.ExecuteScalar<Int32>(sql, new { ServerName = serverDetails.server_name, CreatorId = serverDetails.creator_id});
            Console.WriteLine("insert Id: " + Convert.ToString(insertId));
            connection.Execute("INSERT INTO user_servers (user_id, server_id) VALUES (@UserId, @ServerId )", new {UserId = serverDetails.creator_id, ServerId = insertId});
        }

        public ServerListItemDto GetServer(int serverId)
        {
            return connection.QueryFirstOrDefault<ServerListItemDto>("Select id, server_name FROM servers WHERE id = @Id",
                new { Id = serverId }
                );
        }

        public IEnumerable<ServerListItemDto> GetServers(int userId)
        {
            return connection.Query<ServerListItemDto>("Select s.id, s.server_name FROM user_servers us INNER JOIN servers s ON s.id = us.server_id WHERE us.user_id = @Id", new {Id = userId});
        }
    }
}
