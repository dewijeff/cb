using api.Areas.Content.Models;
using api.Areas.Content.Services.Repositories.Contracts;

namespace api.Areas.Content.Services.Repositories;

public class ReadOnlyCategoryRepository : IReadOnlyCategoryRepository
{
    private readonly Dictionary<string, ListingCategory> _categories = new ()
    {
        {
            "1", new ListingCategory
            {
                Order = 1,
                Name = "Breads",
                Notes = null,
                Recipes = new[]
                {
                    new ListingRecipe
                    {
                        Name = "Shokupan",
                        RecipeId = "65d6392bdffb266ad688a0f3",
                    },
                    new ListingRecipe
                    {
                        Name = "Italian Bread",
                        RecipeId = "65d6392bdffb266ad688a0f4",
                    },
                    new ListingRecipe
                    {
                        Name = "Hamburger Buns",
                        RecipeId = "65d6392bdffb266ad688a0f5",
                    },
                    new ListingRecipe
                    {
                        Name = "Hoagie Rolls",
                        RecipeId = "65d6392bdffb266ad688a0f6",
                    },
                    new ListingRecipe
                    {
                        Name = "Low Sodium Bisquick",
                        RecipeId = "65d635eddffb266ad688a0e4",
                    },
                    new ListingRecipe
                    {
                        Name = "Pizza Dough",
                        RecipeId = "65d6392bdffb266ad688a0f7",
                    }
                }
            }
        },
        {
            "2", new ListingCategory
            {
                Order = 2,
                Name = "Breakfasts",
                Notes = null,
                Recipes = new[]
                {
                    new ListingRecipe
                    {
                        Name = "Sausage Gravy",
                        RecipeId = "65d6392bdffb266ad688a0f8",
                    },
                    new ListingRecipe
                    {
                        Name = "Breakfast Squares",
                        RecipeId = "65d6392bdffb266ad688a0f9"
                    }
                }
            }
        },
        {
            "3", new ListingCategory
            {
                Order = 3,
                Name = "Other",
                Notes = null,
                Recipes = new[]
                {
                    new ListingRecipe
                    {
                        Name = "Christmas Pudding",
                        RecipeId = "65d6392bdffb266ad688a0fa",
                    },
                    new ListingRecipe
                    {
                        Name = "Advocaat",
                        RecipeId = "65d6392bdffb266ad688a0fb"
                    }
                }
            }
        }
    };

    public async Task<IEnumerable<ListingCategory>> GetCategories(CancellationToken cancellationToken)
    {
        // This will be database based later, and will use th
        return _categories.Values;
    }
}