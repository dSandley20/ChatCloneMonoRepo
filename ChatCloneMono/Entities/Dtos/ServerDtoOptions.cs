namespace ChatCloneMono.Entities.Dtos
{
    public class ServerListItemDto
    {
        public int Id { get; set; }
        public string server_name { get; set; }
    }

    public class CreateServerDto
    {
        public string server_name { get; set; }
        public int creator_id { get; set; }
    }

    public class TestServer
    {
        public int server_id { get; set; }
        public string server_name { get; set; }
    }
}
