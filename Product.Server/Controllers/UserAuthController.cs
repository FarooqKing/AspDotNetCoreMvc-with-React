using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Product.Server.Data;
using Product.Server.Model;
namespace Product.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly string? _JwtKey;
        private readonly string? _JwtIssuer;
        private readonly string? _JwtAudience;
        private readonly int _JwtExpirey;

        public UserAuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _JwtKey = configuration["Jwt:Key"];
            _JwtIssuer = configuration["Jwt:Issuer"];
            _JwtAudience = configuration["Jwt:Audience"];
            _JwtExpirey = int.Parse(configuration["Jwt:Expirey"]);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel register)
        {
            if(register == null || string.IsNullOrEmpty(register.Name)
                || string.IsNullOrEmpty(register.Email)
                || string.IsNullOrEmpty(register.Password)
                ) 
            {
                return BadRequest("Invalid Register Detail");
            }

            var excistngUser = await _userManager.FindByEmailAsync(register.Email); 
            if(excistngUser != null)
            
                {
                    return Conflict("Email already User");
                }
            var user = new ApplicationUser
            {
                UserName = register.Email,
                Email = register.Email,
                Name = register.Name
            };

         var result =  await  _userManager.CreateAsync(user,register.Password);

            if (!result.Succeeded) {
                return BadRequest(result.Errors);
            }

            return Ok("Registerd Successfully");
        
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);

            if ((user == null))
            {
                return Unauthorized(new { success = false, message = "Invalid Email or Password" });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, login.Password,false);

            if (!result.Succeeded) { 
                return Unauthorized(new {success = false , message ="Invalid userName or Password"});
            }

            var token = GenerateJWTToken(user);

            return Ok(new { success = true, token });  
        }


        private string GenerateJWTToken(ApplicationUser user) {
            var Claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub , user.Id),
                new Claim(JwtRegisteredClaimNames.Email , user.Email),
                new Claim(JwtRegisteredClaimNames.Jti , Guid.NewGuid().ToString()),
                new Claim("Name" , user.Name)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_JwtKey));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(

                claims: Claims,
                expires: DateTime.Now.AddMinutes(_JwtExpirey),
                signingCredentials: cred

                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [HttpPost("Logout")]
        public async Task<IActionResult> logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("User Logout Successfully");
        }
    } 
}
