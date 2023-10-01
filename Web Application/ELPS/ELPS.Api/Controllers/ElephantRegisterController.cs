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
    public class ElephantRegisterController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly ElephantRegisterContext _context;
        public ElephantRegisterController(IConfiguration config, ElephantRegisterContext context)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("CreateElephant")]
        public IActionResult Create(ElephantRegister elephantRegister)
        {
            if (_context.ElephantRegisters.Where(u => u.Name == elephantRegister.Name).FirstOrDefault() != null)
            {
                return Ok("Already Exist");
            }
            elephantRegister.RegisterSince = DateTime.Now;
            _context.ElephantRegisters.Add(elephantRegister);
            _context.SaveChanges();
            return Ok("Success");
        }

        [HttpGet("GetElephant")]
        public IActionResult GetElephant()
        {
            var records = _context.ElephantRegisters.ToList();
            return Ok(records);
        }

        [HttpGet("SearchElephantByName")]
        public IActionResult SearchElephantByName([FromQuery] string name)
        {
            var foundElephant = _context.ElephantRegisters.FirstOrDefault(u => u.Name == name);

            if (foundElephant != null)
            {
                return Ok(foundElephant);
            }
            else
            {
                return Ok("notfound");
            }
        }

        [HttpPut("EditElephant")]
        public IActionResult EditElephant([FromBody] ElephantRegister updatedElephant)
        {
            var existingElephant = _context.ElephantRegisters.FirstOrDefault(u => u.Name == updatedElephant.Name);

            if (existingElephant == null)
            {
                return Ok("Elephant not found");
            }

            existingElephant.Name = updatedElephant.Name;
            existingElephant.Dob = updatedElephant.Dob;
            existingElephant.Location = updatedElephant.Location;
            existingElephant.Remark = updatedElephant.Remark;

            _context.SaveChanges();

            return Ok("Success");
        }

        [HttpDelete("DeleteElephant")]
        public IActionResult DeleteElephant([FromQuery] string name)
        {
            var elephantToDelete = _context.ElephantRegisters.FirstOrDefault(u => u.Name == name);

            if (elephantToDelete == null)
            {
                return Ok("Elephant not found");
            }

            _context.ElephantRegisters.Remove(elephantToDelete);
            _context.SaveChanges();

            return Ok("Success");
        }

    }
}
