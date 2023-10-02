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

    [Fact]
    public void GetUsers_ReturnsUsers_WhenUsersExist()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<UserContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;

        using (var context = new UserContext(options))
        {
            var userController = new UserController(null, context);

            var user1 = new User { Email = "user1@example.com", FirstName = "John", LastName = "Doe", MobileNumber = "Test", Nic = "Test", EmpNo = "Test", Area = "Test", Password = "Test" };
            var user2 = new User { Email = "user2@example.com", FirstName = "Jane", LastName = "Doe", MobileNumber = "Test", Nic = "Test", EmpNo = "Test", Area = "Test", Password = "Test" };

            context.Users.Add(user1);
            context.Users.Add(user2);
            context.SaveChanges();

            // Act
            var result = userController.GetUsers();

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;

            var users = Assert.IsAssignableFrom<IEnumerable<User>>(okResult.Value);

            Assert.Equal(2, users.Count());
            Assert.Contains(users, u => u.Email == user1.Email);
            Assert.Contains(users, u => u.Email == user2.Email);
        }
    }
}
