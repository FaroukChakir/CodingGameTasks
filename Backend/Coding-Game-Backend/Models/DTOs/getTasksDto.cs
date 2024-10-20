using System.ComponentModel.DataAnnotations;

namespace Coding_Game_Backend.Models.DTOs
{
    public class getTasksDto
    {
        public int TicketID {  get; set; }
        public string Description { get; set; } = string.Empty;
        public bool Status { get; set; }
        public DateTime Date { get; set; }
    }
}
