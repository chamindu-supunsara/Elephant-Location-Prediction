namespace ELPS.Api.Models
{
    public class User
    {
        public int UserID{ get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? MobileNumber { get; set; }
        public string? Nic { get; set; }
        public string? EmpNo { get; set; }
        public string? Area { get; set; }
        public string? Password { get; set; }
        public DateTime MemberSince { get; set; }
    }
}
