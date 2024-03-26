using api.Areas.Auth.Models;
using api.Shared;
using MongoDB.Driver;

namespace api.Areas.Auth.Services;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<User> _collection;

    // TODO: Switch this to come from dependency injection somehow.
    public UserRepository()
    {
        _collection = MongoUtility.GetCollection<User>();
    }

    public async Task<User> GetUserById(string id, CancellationToken cancellationToken)
    {
        var filter = Builders<User>.Filter.Eq("_id", id);
        var result = await _collection.Find(filter).FirstOrDefaultAsync(cancellationToken);

        return result;
    }

    public async Task<User> GetUserByEmail(string email, CancellationToken cancellationToken)
    {
        var filter = Builders<User>.Filter.Eq("email", email);
        var result = await _collection.Find(filter).FirstOrDefaultAsync(cancellationToken);

        return result;
    }

    public async Task<User> AddUser(User user, CancellationToken cancellationToken)
    {
        await _collection.InsertOneAsync(user, new InsertOneOptions(), cancellationToken);

        var filter = Builders<User>.Filter.Eq("_id", user.Id);

        // get the result to make sure it took.  this is the new state...
        var result = await _collection.Find(filter).FirstOrDefaultAsync(cancellationToken);

        return result;
    }

    public async Task<User> EditUser(User user, CancellationToken cancellationToken)
    {
        var filter = Builders<User>.Filter.Eq(x => x.Id, user.Id);
        await _collection.ReplaceOneAsync(filter, user, new ReplaceOptions(), cancellationToken);

        var result = await _collection.Find(filter).FirstOrDefaultAsync(cancellationToken);
        return result;
    }

    public async Task<bool> DeleteUser(string id, CancellationToken cancellationToken)
    {
        var result = await _collection.DeleteOneAsync(id, cancellationToken);

        return result.DeletedCount > 0;
    }
}
