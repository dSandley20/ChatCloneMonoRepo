using BCrypt.Net;
using System;
namespace ChatCloneMono.Utils.GeneralUtils
{
    public class BCryptUtils
    {
        public static bool verifyPassword(string password, string existingPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, existingPassword);
        }

        public static string hashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}

