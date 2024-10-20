using System.ComponentModel.DataAnnotations;

namespace Coding_Game_Backend.Models.DTOs
{
    public class deleteTaskDto
    {
        [Required]
        public int TicketID {  get; set; }
    }
}
