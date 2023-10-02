using System;
using System.Linq;
using ELPS.Api.Controllers;
using ELPS.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;

public class RegiaterControllerTests
{
    [Fact]
    public void CreateElephant_ReturnsSuccess_WhenUserDoesNotExist()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ElephantRegisterContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;

        using (var context = new ElephantRegisterContext(options))
        {
            var elephantRegisterController = new ElephantRegisterController(null, context);

            var newUser = new ElephantRegister
            {
                Name = "newuser@example.com",
                Dob = "Test",
                Location = "Test",
                Remark = "Test",
            };

            // Act
            var result = elephantRegisterController.Create(newUser);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.Equal("Success", okResult.Value);
        }
    }

    [Fact]
    public void EditElephant_ReturnsSuccess_WhenElephantExists()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ElephantRegisterContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;

        using (var context = new ElephantRegisterContext(options))
        {
            var controller = new ElephantRegisterController(null, context);

            var existingElephant = new ElephantRegister
            {
                Name = "TestElephant",
                Dob = "TestDOB",
                Location = "TestLocation",
                Remark = "TestRemark"
            };

            context.ElephantRegisters.Add(existingElephant);
            context.SaveChanges();

            var updatedElephant = new ElephantRegister
            {
                Name = "TestElephant",
                Dob = "TestDOB1", // Update Dob
                Location = "UpdatedLocation1",    // Update Location
                Remark = "UpdatedRemark1"         // Update Remark
            };

            // Act
            var result = controller.EditElephant(updatedElephant);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.Equal("Success", okResult.Value);

            // Verify that the changes were applied to the database
            var editedElephant = context.ElephantRegisters.FirstOrDefault(u => u.Name == updatedElephant.Name);
            Assert.NotNull(editedElephant);
            Assert.Equal(updatedElephant.Dob, editedElephant.Dob);
            Assert.Equal(updatedElephant.Location, editedElephant.Location);
            Assert.Equal(updatedElephant.Remark, editedElephant.Remark);
        }
    }

    [Fact]
    public void EditElephant_ReturnsNotFound_WhenElephantDoesNotExist()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ElephantRegisterContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;

        using (var context = new ElephantRegisterContext(options))
        {
            var controller = new ElephantRegisterController(null, context);

            var updatedElephant = new ElephantRegister
            {
                Name = "NonExistentElephant",
                Dob = "TestDOB",
                Location = "UpdatedLocation",
                Remark = "UpdatedRemark"
            };

            // Act
            var result = controller.EditElephant(updatedElephant);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.Equal("Elephant not found", okResult.Value);
        }
    }

    [Fact]
    public void DeleteElephant_ReturnsSuccess_WhenElephantExists()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ElephantRegisterContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;

        using (var context = new ElephantRegisterContext(options))
        {
            var controller = new ElephantRegisterController(null, context);

            var existingElephant = new ElephantRegister
            {
                Name = "TestDel",
                Dob = "TestDel",
                Location = "TestDel",
                Remark = "TestDel"
            };

            context.ElephantRegisters.Add(existingElephant);
            context.SaveChanges();

            // Act
            var result = controller.DeleteElephant("TestElephant");

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.Equal("Success", okResult.Value);

            // Verify that the elephant was deleted from the database
            var deletedElephant = context.ElephantRegisters.FirstOrDefault(u => u.Name == "TestElephant");
            Assert.Null(deletedElephant);
        }
    }
}
