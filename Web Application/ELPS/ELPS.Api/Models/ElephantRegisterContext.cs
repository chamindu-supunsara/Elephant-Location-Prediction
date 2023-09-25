using Microsoft.EntityFrameworkCore;

namespace ELPS.Api.Models
{
    public class ElephantRegisterContext : DbContext
    {
        public ElephantRegisterContext(DbContextOptions<ElephantRegisterContext> options) : base(options)
        {

        }

        public DbSet<ElephantRegister> ElephantRegisters { get; set; }
    }
}
