using System;
using FluentMigrator;

namespace ChatCloneMono.Migrations
{
    [Migration(20221024181000)]
    public class Migration_20221024181000 : Migration
    {
        public override void Down()
        {
            Delete.ForeignKey();
        }

        public override void Up()
        {
            Create.ForeignKey()
                .FromTable("user_servers").ForeignColumn("server_id")
                .ToTable("servers").PrimaryColumn("id");
        }
    }
}

