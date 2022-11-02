using ChatCloneMono.Entities.Dtos;

namespace ChatCloneMono.Controllers.RepositoryInterfaces
{
    public interface IServerRepository
    {
        public void CreateServer(CreateServerDto serverDetails, int userId);
        public ServerListItemDto GetServer(int serverId);
        public IEnumerable<ServerListItemDto> GetServers(int userId);
    }
}
