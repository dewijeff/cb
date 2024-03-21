using api.Areas.Auth.Models;

namespace api.Areas.Auth.Services;

public interface IUserRepository
{
    Task<User> GetUserById(string id, CancellationToken cancellationToken);

    Task<User> GetUserByEmail(string email, CancellationToken cancellationToken);

    Task<User> AddUser(User user, CancellationToken cancellationToken);

    Task<User> EditUser(User user, CancellationToken cancellationToken);

    Task<bool> DeleteUser(string id, CancellationToken cancellationToken);
}
