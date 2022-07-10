using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBookmarksAuth.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBookmarksAuth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private string _connectionString;

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("gettopfivebookmarks")]
        public List<BookmarkCount> GetTopFiveBookmarks()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetTopFiveBookmarks();
        }

        [HttpGet]
        [Authorize]
        [Route("mybookmarks")]
        public List<Bookmark> MyBookmarks(int id)
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetBookmarksByUserId(id);
        }

        [HttpPost]
        [Authorize]
        [Route("addbookmark")]
        public void AddBookmark(Bookmark bookmark)
        {
            var userRepo = new UserRepository(_connectionString);
            bookmark.UserId = userRepo.GetByEmail(User.Identity.Name).Id;
            var bookmarkRepo = new BookmarkRepository(_connectionString);   
            bookmarkRepo.AddBookmark(bookmark);
        }


        [HttpPost]
        [Authorize]
        [Route("updatebookmark")]
        public void UpdateBookmark(Bookmark bookmark)
        {
            var userRepo = new UserRepository(_connectionString);
            bookmark.UserId = userRepo.GetByEmail(User.Identity.Name).Id;
            var bookmarkRepo = new BookmarkRepository(_connectionString);
            bookmarkRepo.UpdateBookmarkTitle(bookmark);
        }

        [HttpPost]
        [Authorize]
        [Route("deletebookmark")]
        public void DeleteBookmark(Bookmark bookmark)
        {
            var bookmarkRepo = new BookmarkRepository(_connectionString);
            bookmarkRepo.DeleteBookmark(bookmark);
        }
    }
}