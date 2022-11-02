using System;
using FluentMigrator;

namespace ChatCloneMono.Migrations
{
    [Migration(20221024181100)]
    public class Migration_20221024181100 : Migration
    {
        public override void Down()
        {
            Delete.ForeignKey();
        }

        public override void Up()
        {
            Create.ForeignKey()
                .FromTable("user_servers").ForeignColumn("user_id")
                .ToTable("users").PrimaryColumn("id");
        }
    }
}

