using ELPS.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ELPS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class ElephantsRecordsController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly ElephantsRecordsContext _context;
        public ElephantsRecordsController(IConfiguration config, ElephantsRecordsContext context)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("CreateRecord")]
        public IActionResult Create(ElephantsRecords elephantRecords)
        {
            if (_context.ElephantsRecord.Any(u => u.Name == elephantRecords.Name))
            {
                elephantRecords.RecordSince = DateTime.Now;
                _context.ElephantsRecord.Add(elephantRecords);
                _context.SaveChanges();

                return Ok("Success");
            }
            elephantRecords.RecordSince = DateTime.Now;
            _context.ElephantsRecord.Add(elephantRecords);
            _context.SaveChanges();
            return Ok("Success");
        }


        [HttpGet("GetRecord")]
        public IActionResult GetRecord()
        {
            var records = _context.ElephantsRecord.ToList();
            return Ok(records);
        }
    }
}
