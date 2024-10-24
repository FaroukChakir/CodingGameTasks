using Microsoft.AspNetCore.Mvc;
using Coding_Game_Backend.Data;
using Microsoft.EntityFrameworkCore;
using Coding_Game_Backend.Models;
using Coding_Game_Backend.Models.DTOs;

namespace Coding_Game_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksManagementController : ControllerBase
    {
        private readonly ILogger<TasksManagementController> _logger;
        private readonly ApiDbContext _dbContext;

        public TasksManagementController(ApiDbContext dbContext, ILogger<TasksManagementController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        // GET: api/TasksManagement/GetTasks
        [HttpGet("GetTasks")]
        public async Task<IActionResult> GetTasks(int pageNumber, int itemsPerPage)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (itemsPerPage < 1) itemsPerPage = 1;

            var totalTasks = await _dbContext.tasksModel.CountAsync();

            var tasks = await _dbContext.tasksModel
                .Skip((pageNumber - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .Select(task => new getTasksDto
                {
                    TicketID = task.TicketID,
                    Description = task.Description,
                    Status = task.Status,
                    Date = task.Date
                })
                .ToListAsync();

            return Ok(new
            {
                TotalCount = totalTasks,
                PageNumber = pageNumber,
                ItemsPerPage = itemsPerPage,
                Tasks = tasks
            });
        }

        // POST: api/TasksManagement/CreateTask
        [HttpPost("CreateTask")]
        public async Task<IActionResult> CreateTask([FromBody] addTaskDto addtaskDto)
        {
            if (addtaskDto == null)
            {
                return BadRequest(new { message = "Task cannot be null." });
            }

            try
            {
                var taskModel = new TasksModel
                {
                    Description = addtaskDto.Description,
                    Status = addtaskDto.Status,
                    Date = addtaskDto.Date
                };

                await _dbContext.tasksModel.AddAsync(taskModel);
                await _dbContext.SaveChangesAsync();

                return Ok(new
                {
                    message = "Task created successfully.",
                    task = taskModel
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the task.", error = ex.Message });
            }
        }

        // POST: api/TasksManagement/EditTask
        [HttpPost("EditTask")]
        public async Task<IActionResult> EditTask([FromBody] updateTaskDto existingtaskDto)
        {
            if (existingtaskDto == null)
            {
                return BadRequest(new { message = "Task cannot be null." });
            }

            try
            {
                var newTaskDto = await _dbContext.tasksModel.SingleAsync(x=>x.TicketID== existingtaskDto.TicketID);

                newTaskDto.Status= existingtaskDto.Status;
                newTaskDto.Date= existingtaskDto.Date;
                newTaskDto.Description= existingtaskDto.Description;

                await _dbContext.SaveChangesAsync();

                return Ok(new
                {
                    message = "Task updated successfully.",
                    task = newTaskDto
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the task.", error = ex.Message });
            }
        }


        // POST: api/TasksManagement/DeleteTask
        [HttpPost("DeleteTask")]
        public async Task<IActionResult> DeleteTask([FromBody] deleteTaskDto deleteTaskDto)
        {
            if (deleteTaskDto == null)
            {
                return BadRequest(new { message = "Task cannot be null." });
            }

            try
            {
                var newTaskDto = await _dbContext.tasksModel.SingleAsync(x=>x.TicketID == deleteTaskDto.TicketID);

                _dbContext.tasksModel.Remove(newTaskDto);

                await _dbContext.SaveChangesAsync();

                return Ok(new
                {
                    message = "Task deleted successfully."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while deleting the task.", error = ex.Message });
            }
        }

    }
}
