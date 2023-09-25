using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ELPS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class ElephantRegisterController : ControllerBase
    {
        private readonly IConfiguration _config;
        public ElephantRegisterController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("CreateElephant")]
        public IActionResult Create()
        {
            return Ok("Success from Create Method");
        }
    }
}
