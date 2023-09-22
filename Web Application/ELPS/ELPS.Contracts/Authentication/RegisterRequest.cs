using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ELPS.Contracts.Authentication
{
    public class RegisterRequest
    {
        public string FirstName;
        public string LastName;
        public string Email;
        public string Nic;
        public string Mobile;
        public string Address;
        public string Password;
    }
}
