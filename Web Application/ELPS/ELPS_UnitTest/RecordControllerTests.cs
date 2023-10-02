using ELPS.Api.Controllers;
using ELPS.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class RecordControllerTests
{
    [Fact]
    public void AddRecord_ReturnsSuccess_WhenUserDoesNotExist()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ElephantsRecordsContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;

        using (var context = new ElephantsRecordsContext(options))
        {
            var elephantsRecordsController = new ElephantsRecordsController(null, context);

            var newUser = new ElephantsRecords
            {
                Name = "Test",
                Date = "Test",
                WeatherCondition = "Test",
                Time = "Test",
                Hours = "Test",
                Location = "Test",
            };

            // Act
            var result = elephantsRecordsController.Create(newUser);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.Equal("Success", okResult.Value);
        }
    }

    [Fact]
    public void GetRecords_ReturnsUsers_WhenUsersExist()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ElephantsRecordsContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;

        using (var context = new ElephantsRecordsContext(options))
        {
            var elephantsRecordsController = new ElephantsRecordsController(null, context);

            context.ElephantsRecord.Add(new ElephantsRecords { Name = "user", Date = "23/10/2023", WeatherCondition = "Rain", Time = "Test", Hours = "Test", Location = "Test" });
            context.ElephantsRecord.Add(new ElephantsRecords { Name = "users", Date = "23/10/2023", WeatherCondition = "Sunny", Time = "Test", Hours = "Test", Location = "Test" });
            context.SaveChanges();

            // Act
            var result = elephantsRecordsController.GetRecord();

            // Assert
            Assert.IsType<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;

            var elephantsRecords = Assert.IsAssignableFrom<IEnumerable<ElephantsRecords>>(okResult.Value);

            Assert.Equal(2, elephantsRecords.Count());
            Assert.Contains(elephantsRecords, u => u.Name == "user");
            Assert.Contains(elephantsRecords, u => u.Name == "users");
        }
    }
}