using ReactBookmarksAuth.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBookmarksAuth.Web.Models
{
    public class SignupViewModel : User
    {
        public string Password { get; set; }
    }
}
