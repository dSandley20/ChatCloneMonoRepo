namespace ChatCloneMono.Entities.Models
{
    public class Server
    {
        public int Id { get; set; }
        public string ServerName { get; set; }
        public User Creator { get; set; }
    }
}
