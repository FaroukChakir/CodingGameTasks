using Microsoft.EntityFrameworkCore;
using Coding_Game_Backend.Models;

namespace Coding_Game_Backend.Data
{
    public class ApiDbContext : DbContext
    {
        public DbSet<TasksModel> tasksModel { get; set; }

        // Pass the options to the base class constructor
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
        }
    }
}
