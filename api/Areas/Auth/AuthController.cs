using api.Areas.Auth.Helpers;
using api.Areas.Auth.Models;
using api.Areas.Auth.Services;
using api.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.Areas.Auth;

[ApiController]
[Route("cookbook")]
public class AuthController : Controller
{
    public class UserDto
    {
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    private readonly JsonSerializerOptions _jsonSettings = CommonSerializerOptions.SerializerOptions;
    private readonly IUserRepository _userRepository;
    private readonly IJwtService _jwtService;

    public AuthController(
        IUserRepository userRepository,
        IJwtService jtwService)
    {
        _userRepository = userRepository;
        _jwtService = jtwService;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody]UserDto userDto, CancellationToken cancellationToken)
    {
        // email is the key, so validate it?
        var user = new User
        {
            Email = userDto.Email,
            Name = userDto.Name,
            Password = BCrypt.Net.BCrypt.EnhancedHashPassword(userDto.Password)
        };

        await _userRepository.AddUser(user, cancellationToken);

        return Json(user, _jsonSettings);

        // TODO: @JLD - should these all be Created, Updated... responses instead of Json, which is just a 200?  I don't plan on needing it in the front end, but is it a more "correct" response?
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto login, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByEmail(login.Email, cancellationToken);

        if (user == null) return BadRequest(login.Email);

        if (!BCrypt.Net.BCrypt.EnhancedVerify(login.Password, user.Password)) return Unauthorized();

        var jwt = _jwtService.Generate(user);

        // TODO: @JLD - use cookies for this?
        //Response.Cookies.Append("jwt", jwt, new CookieOptions
        //{
        //    HttpOnly = true
        //});

        return Json(new
        {
            Jwt = jwt
        });
    }

    [HttpGet]
    [Route("verify")]
    [Authorize]
    public IActionResult VerifyToken()
    {
        return Ok();
    }

    // TODO:? - leftover from an early poc
    [HttpGet]
    [Route("user")]
    public async Task<IActionResult> User(CancellationToken cancellationToken)
    {
        try
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            var userId = token.Issuer;

            var user = await _userRepository.GetUserById(userId, cancellationToken);

            return Json(user, _jsonSettings);
        }
        catch (Exception ex)
        {
            return Unauthorized();
        }
    }

    // TODO:? - leftover from an early poc
    [HttpPost]
    [Route("logout")]
    public IActionResult Logout(CancellationToken cancellationToken)
    {
        Response.Cookies.Delete("jwt");

        return Ok("success");
    }
}
