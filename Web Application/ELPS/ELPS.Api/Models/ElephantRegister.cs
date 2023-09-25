using System.ComponentModel.DataAnnotations;

namespace ELPS.Api.Models
{
    public class ElephantRegister
    {
        [Key]
        public int ElephantID { get; set; }
        public string Name { get; set; }
        public string Dob { get; set; }
        public string Location { get; set; }
        public string Remark { get; set; }
        public DateTime RegisterSince { get; set; }
    }
}
