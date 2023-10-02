using ELPS.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;

namespace ELPS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserContext _context;

        public UserController(IConfiguration config, UserContext context)
        {
            _config = config;
            _context = context;
        }

        public UserController(IConfiguration config, UserContext context, JwtService @object) : this(config, context)
        {
        }

        [AllowAnonymous]
        [HttpPost("CreateUser")]
        public IActionResult Create(User user)
        {
            try
            {
                if (_context.Users.Any(u => u.Email == user.Email))
                {
                    return Ok("Already Exist");
                }

                user.MemberSince = DateTime.Now;
                _context.Users.Add(user);
                _context.SaveChanges();

                return Ok("Success");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public IActionResult Login(Login user)
        {
            try
            {
                var userAvailable = _context.Users
                    .FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password);

                if (userAvailable != null)
                {
                    return Ok(new JwtService(_config).GenerateToken(
                        userAvailable.UserID.ToString(),
                        userAvailable.Email,
                        userAvailable.FirstName,
                        userAvailable.LastName,
                        userAvailable.MobileNumber,
                        userAvailable.Nic,
                        userAvailable.EmpNo,
                        userAvailable.Area
                    ));
                }

                return Ok("Failure");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetUsers")]
        public IActionResult GetUsers()
        {
            try
            {
                var users = _context.Users.ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
