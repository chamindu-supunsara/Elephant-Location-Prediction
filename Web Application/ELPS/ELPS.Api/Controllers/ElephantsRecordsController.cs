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
        public ElephantsRecordsController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("AddRecord")]
        public IActionResult Create()
        {
            return Ok("Success from Create Method");
        }
    }
}
