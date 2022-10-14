using System;
using FluentMigrator;
using FluentMigrator.Postgres;
namespace ChatCloneMono.Migrations

//Users Table Migration 
{
    [Migration(20220809145400)]
    public class Migration_20220809145400 : Migration
    {

        public override void Down()
        {
            Delete.Table("users");
        }

        public override void Up()
        {
            Create.Table("users")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("first_name").AsString().NotNullable()
                .WithColumn("last_name").AsString().NotNullable()
                .WithColumn("email").AsString().NotNullable()
                .WithColumn("password").AsString().NotNullable();
        }
    }
}

