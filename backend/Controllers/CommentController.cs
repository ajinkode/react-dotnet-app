using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Azure.Data.Tables;
using System;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/comment")]
    public class CommentController : ControllerBase
    {
        private readonly TableClient _tableClient;

        public CommentController()
        {
            // Initialize the TableClient with your storage account connection string and table name
            var connectionString = "your-connecion-string-here";
            var tableName = "your-table-name-here";
            var tableServiceClient = new TableServiceClient(connectionString);
            _tableClient = tableServiceClient.GetTableClient(tableName);
        }

        [HttpPost]
        [Route("submit")]
        public IActionResult SubmitComment([FromBody] FormData formData)
        {
            
            if (ModelState.IsValid)
            {

                UserComment comment = new()
                {
                    name = formData.name,
                    email = formData.email,
                    comment = formData.comment,

                    RowKey = Guid.NewGuid().ToString(),
                    PartitionKey = "CommentsPartition"
                };


                // Save the comment to Azure Table Storage
                _tableClient.UpsertEntity(comment);

                return Ok(new { Message = "Comment submitted successfully!"});
            }
            return BadRequest(ModelState);
        }

        [HttpGet]
        [Route("getAll")]
        public IActionResult GetAllComments()
        {
            try
            {
                var comments = _tableClient.Query<UserComment>().ToList();
                var sortedComments = comments.OrderByDescending(c => c.Timestamp).ToList();

                return Ok(sortedComments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
