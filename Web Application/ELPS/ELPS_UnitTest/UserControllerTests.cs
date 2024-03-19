using System;
using System.Linq;
using ELPS.Api.Controllers;
using ELPS.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;

public class UserControllerTests
{
    [Fact]
    public void CreateUser_ReturnsSuccess_WhenUserDoesNotExist()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<UserContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;

        using (var context = new UserContext(options))
        {
            var userController = new UserController(null, context);

            var newUser = new User
            {
                Email = "newuser@example.com",
                FirstName = "Test",
                LastName = "Test",
                MobileNumber = "Test",
                Nic = "Test",
                EmpNo = "Test",
                Area = "Test",
                Password = "Test",
            };

            // Act
            var result = userController.Create(newUser);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.Equal("Success", okResult.Value);
        }
    }
}
