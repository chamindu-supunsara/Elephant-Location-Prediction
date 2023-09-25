using System.ComponentModel.DataAnnotations;

namespace ELPS.Api.Models
{
    public class ElephantsRecords
    {
        [Key]
        public int ElephantID { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string WeatherCondition { get; set; }
        public string Time { get; set; }
        public string Hours { get; set; }
        public string Location { get; set; }
        public DateTime RecordSince { get; set; }
    }
}
