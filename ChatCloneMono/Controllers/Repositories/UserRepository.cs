using System;
using ChatCloneMono.Controllers.RepositoryInterfaces;
using ChatCloneMono.Entities.Dtos;
using ChatCloneMono.Utils.GeneralUtils;
using Npgsql;
using Dapper;
using RestSharp;
using Newtonsoft.Json.Linq;

namespace ChatCloneMono.Controllers.Repositories
{
    public class UserRepository : IUserRepository
    {
        public readonly IConfiguration configuration;
        public NpgsqlConnection connection;
        public UserRepository(IConfiguration _configuration)
        {
            configuration = _configuration;
            connection = new NpgsqlConnection(configuration["Database:Connection"]);
        }

        public string CreateNewUser(CreateUpdateUser user)
        {
            if (user.Password is null)
            {
                return "Needs a password";
            }
            else
            {
                var sql = @"INSERT INTO users (first_name, last_name, email, password) VALUES (@FirstName, @LastName, @Email, @Password)";

                connection.Execute(sql,
                    new
                    {
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Password = BCryptUtils.hashPassword(user.Password)
                    });

                var client = new RestClient("https://dev-a27rucnc.us.auth0.com/oauth/token");
                var request = new RestRequest("",Method.Post);
                request.AddHeader("content-type", "application/x-www-form-urlencoded");
                request.AddParameter("application/x-www-form-urlencoded", $"grant_type=password" +
                    $"&username={user.Email}" +
                    $"&password={user.Password}" +
                    $"&audience={configuration["Auth0:Audience"]}" +
                    $"&scope=read%3Asample" +
                    $"&client_id={configuration["Auth0:ClientId"]}" +
                    $"&client_secret={configuration["Auth0:ClientSecret"]}", ParameterType.RequestBody);
                var response = client.Execute(request);
                //return response;
                JObject json = JObject.Parse(response.Content);
                if (json["access_token"] != null)
                {
                    return json["access_token"].ToString();
                }
                return "No valid token";
            }

        }

        public ViewableUser GetViewableUser(int id)
        {
            return connection
                .QueryFirstOrDefault<ViewableUser>(
                    "Select id, first_name, last_name, email from users WHERE id = @Id",
                    new{ Id = id}
                );
        }

        public ViewableUser UpdateExistingUser(CreateUpdateUser user, int id)
        {
            var sql = @"UPDATE users SET first_name = @FirstName, last_name = @LastName, email = @Email WHERE id = @Id";

            connection.Execute(sql, new
            {
                Id = id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email= user.Email
            });

            return connection.QueryFirstOrDefault<ViewableUser>("Select id, first_name, last_name, email FROM users WHERE id = @Id", new { Id = id });
        }
    }
}

