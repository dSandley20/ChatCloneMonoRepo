using System;
using FluentMigrator;

namespace ChatCloneMono.Migrations
{
    [Migration(20221024180400)]
    public class Migration_20221024180400 : Migration
    {
        public override void Down()
        {
            Delete.Table("user_servers");
        }

        public override void Up()
        {
            Create.Table("user_servers")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("server_id").AsInt32().NotNullable()
                .WithColumn("user_id").AsInt32().NotNullable();
        }
    }
}

