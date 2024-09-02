using Azure;
using Azure.Data.Tables;

namespace backend.Models
{
    public class UserComment : ITableEntity
    {
        public string PartitionKey { get; set; } // Required for table storage
        public string RowKey { get; set; } // Unique identifier (e.g., GUID)
        public string name { get; set; }
        public string email { get; set; }
        public string comment { get; set; }

        public DateTimeOffset? Timestamp { get; set; } // Required for table storage
        public ETag ETag { get; set; } // Required for table storage
    }
}
