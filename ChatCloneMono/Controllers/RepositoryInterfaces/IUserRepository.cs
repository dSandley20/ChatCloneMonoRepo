using System;
using ChatCloneMono.Entities.Dtos;
namespace ChatCloneMono.Controllers.RepositoryInterfaces
{
    public interface IUserRepository
    {
        public ViewableUser GetViewableUser(int id);
        public string CreateNewUser(CreateUpdateUser user);
        public ViewableUser UpdateExistingUser(CreateUpdateUser user, int id);
    }
}

