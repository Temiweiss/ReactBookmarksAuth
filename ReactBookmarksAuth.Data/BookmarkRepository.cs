using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactBookmarksAuth.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddBookmark(Bookmark bookmark)
        {
            using var ctx = new BookmarksAuthDataContext(_connectionString);
            ctx.Bookmarks.Add(bookmark);
            ctx.SaveChanges();
        }

        public List<Bookmark> GetBookmarksByUserId(int id)
        {
            using var ctx = new BookmarksAuthDataContext(_connectionString);
            return ctx.Bookmarks.Where(b => b.UserId == id).ToList();
        }

        public List<BookmarkCount> GetTopFiveBookmarks()
        {
            using var context = new BookmarksAuthDataContext(_connectionString);
            return context.Bookmarks.GroupBy(u => u.Url).Select(u => new BookmarkCount
            {
                Url = u.Key,
                Count = u.Count()
            }).OrderByDescending(u => u.Count).Take(5).ToList();
        }

        public void UpdateBookmarkTitle(Bookmark bookmark)
        {
            using var ctx = new BookmarksAuthDataContext(_connectionString);
            ctx.Bookmarks.Update(bookmark);
            ctx.SaveChanges();
        }

        public void DeleteBookmark(Bookmark bookmark)
        {
            using var ctx = new BookmarksAuthDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id= {bookmark.Id}");
            ctx.SaveChanges();
        }

    }
}
