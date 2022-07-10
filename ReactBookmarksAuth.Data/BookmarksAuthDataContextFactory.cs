using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace ReactBookmarksAuth.Data
{
    public class BookmarksAuthDataContextFactory : IDesignTimeDbContextFactory<BookmarksAuthDataContext>
    {
        public BookmarksAuthDataContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactBookmarksAuth.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new BookmarksAuthDataContext(config.GetConnectionString("ConStr"));
        }
    }


}