using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using ChatCloneMono.Controllers.RepositoryInterfaces;
using ChatCloneMono.Entities.Dtos;
using ChatCloneMono.Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace ChatCloneMono.Controllers
{
    [ApiController]
    [Route("/user")]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IUserRepository repository;
       
        public UsersController(IConfiguration _configuration, IUserRepository _repository)
        {
            configuration = _configuration;
            repository = _repository;
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetExistingUser([FromRoute] int id)
        {
            var existingUser = repository.GetViewableUser(id);
            if (existingUser != null)
            {
                return Ok(existingUser);
            }
            return NotFound();
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetMyUser()
        {
            var myUserId = GetJwtUserId();
            var myUser = repository.GetViewableUser(myUserId);
            return Ok(myUser);
        }

        [HttpPost]
        public IActionResult CreateNewUser(CreateUpdateUser userDetails)
        {
            var userToken = repository.CreateNewUser(userDetails);
            var response = new ServerResponse() { Message = "Testing" , Data = userToken};
            return Ok(response);
        }

        [HttpPut]
        [Authorize]
        public IActionResult UpdateExistingUser([FromBody]CreateUpdateUser userDetails)
        {
            var userId = GetJwtUserId();
            repository.UpdateExistingUser(userDetails, userId);
            return GetExistingUser(userId);
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

