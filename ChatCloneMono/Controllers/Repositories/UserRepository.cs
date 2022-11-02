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

        public AuthedUser GetViewableUser(int id)
        {
            var sql = @"SELECT u.id, u.first_name, u.last_name, u.email, s.id as server_id, s.server_name from users u INNER JOIN user_servers us ON u.id = us.user_id INNER JOIN servers s ON us.server_id = s.id ";

            var authedUser = connection.Query<AuthedUser, TestServer[], AuthedUser>(sql, (user, servers) => {
                user.servers = servers;
                return user;
            },
            splitOn: "server_id"
            );

            if(authedUser != null)
            {
                return authedUser.First();
            }

            return null;



            //return connection
            //    .QueryFirstOrDefault<ViewableUser>(
            //        "Select id, first_name, last_name, email from users WHERE id = @Id",
            //        new{ Id = id}
            //    );id
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

