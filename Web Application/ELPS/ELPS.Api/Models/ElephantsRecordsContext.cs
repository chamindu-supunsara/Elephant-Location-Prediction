using Microsoft.EntityFrameworkCore;

namespace ELPS.Api.Models
{
    public class ElephantsRecordsContext : DbContext
    {
        public ElephantsRecordsContext(DbContextOptions<ElephantsRecordsContext> options) : base(options)
        {

        }

        public DbSet<ElephantsRecords> ElephantsRecord { get; set; }
    }
}
