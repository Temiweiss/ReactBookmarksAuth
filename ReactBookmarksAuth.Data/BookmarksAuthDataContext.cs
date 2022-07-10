using Microsoft.EntityFrameworkCore;
using ReactBookmarksAuth.Data;

namespace ReactBookmarksAuth.Data
{
    public class BookmarksAuthDataContext : DbContext
    {
        private readonly string _connectionString;

        public BookmarksAuthDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}