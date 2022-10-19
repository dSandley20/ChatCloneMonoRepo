using FluentMigrator;
using FluentMigrator.Postgres;
using System;
namespace ChatCloneMono.Migrations
{
    [Migration(20221018101700)]
    public class Migration_20221018101700 : Migration
    {
        public override void Down()
        {
            Delete.Table("servers");
        }

        public override void Up()
        {
            Create.Table("servers")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("server_name").AsString().NotNullable()
                .WithColumn("creator_id").AsInt32().NotNullable();

            
        }
    }
}
