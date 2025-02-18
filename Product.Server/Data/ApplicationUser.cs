using Microsoft.AspNetCore.Identity;

namespace Product.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
