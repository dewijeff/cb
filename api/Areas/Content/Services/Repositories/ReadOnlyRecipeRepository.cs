using api.Areas.Content.Models;
using api.Areas.Content.Services.Repositories.Contracts;

namespace api.Areas.Content.Services.Repositories
{
    public class ReadOnlyRecipeRepository : IReadOnlyRecipeRepository
    {
        public Recipe GetRecipe(string id)
        {
            throw new NotImplementedException();
        }
    }
}
