using ChatCloneMono.Controllers.RepositoryInterfaces;
using ChatCloneMono.Entities.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace ChatCloneMono.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/server")]
    public class ServerController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IServerRepository repository;

        public ServerController(IConfiguration _configuration, IServerRepository _serverRepository)
        {
            configuration = _configuration;
            repository = _serverRepository;
        }

        [HttpGet]
        public IEnumerable<ServerListItemDto> GetServerList()
        {
            return repository.GetServers();
        }

        [HttpGet("{id}")]
        public IActionResult GetServer([FromRoute] int id)
        {
            var existingServer = repository.GetServer(id);
            if(existingServer != null)
            {
                return Ok(existingServer);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult CreateServer(CreateServerDto serverDetails)
        {
            repository.CreateServer(serverDetails, GetJwtUserId());
            return Ok();
        }

        public int GetJwtUserId()
        {
            var authHeader = Request.Headers["Authorization"].ToString();
            var stream = authHeader.Substring(7);
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);
            var tokenS = jsonToken as JwtSecurityToken;
            var jti = tokenS.Claims.First(claim => claim.Type == "sub");
            return Convert.ToInt32(jti.Value.Substring(6));
        }
    }
}
