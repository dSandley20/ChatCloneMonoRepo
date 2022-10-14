using System;
using Microsoft.Data.SqlClient;
using Dapper;
using System.Data.SqlClient;
using System.Linq;
using Npgsql;

namespace ChatCloneMono.DbUtils
{
    public static class Database
    {
        public static void EnsureDatabase(string connectionString, string name)
        {
            var parameters = new DynamicParameters();
            parameters.Add("name", name);
            using var connection = new NpgsqlConnection(connectionString);
            var records = connection.Query("SELECT * FROM sys.databases WHERE name = @name",
                 parameters);
            if (!records.Any())
            {
                connection.Execute($"CREATE DATABASE {name}");
            }
        }
    }
}

