using api.Areas.Content.Models;

namespace api.Areas.Content.Services.Repositories.Contracts
{
    public interface IReadOnlyRecipeRepository
    {

        public Recipe GetRecipe(string id);


    }
}
