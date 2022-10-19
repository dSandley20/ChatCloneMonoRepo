using FluentMigrator;

namespace ChatCloneMono.Migrations
{
    [Migration(20221018111400)]
    public class Migration_20221018111400 : Migration
    {
        public override void Down()
        {
            Delete.ForeignKey();
        }

        public override void Up()
        {
            Create.ForeignKey()
                 .FromTable("servers").ForeignColumn("creator_id")
                 .ToTable("users").PrimaryColumn("id");
        }
    }
}
