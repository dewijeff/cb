using api.Areas.Content.Models;
using api.Areas.Content.Services.Repositories.Contracts;

namespace api.Areas.Content.Services.Repositories
{
    public class ReadOnlyCategoryRepository : IReadOnlyCategoryRepository
    {
        public IEnumerable<ListingCategory> GetCategories()
        {
            return new[]
            {
                new ListingCategory
                {
                    Order = 1,
                    Name = "Breads",
                    Notes = null,
                    Recipes = new[]
                    {
                        new ListingRecipe
                        {
                            Name = "Shokupan",
                            RecipeId = "1",
                        },
                        new ListingRecipe
                        {
                            Name = "Italian Bread",
                            RecipeId = "2",
                        },
                        new ListingRecipe
                        {
                            Name = "Hamburger Buns",
                            RecipeId = "3",
                        },
                        new ListingRecipe
                        {
                            Name = "Hoagie Rolls",
                            RecipeId = "4",
                        },
                        new ListingRecipe
                        {
                            Name = "Low Sodium Bisquick",
                            RecipeId = "5",
                        },
                        new ListingRecipe
                        {
                            Name = "Pizza Dough",
                            RecipeId = "6",
                        }
                    }
                },
                new ListingCategory
                {
                    Order = 2,
                    Name = "Breakfasts",
                    Notes = null,
                    Recipes = new[]
                    {
                        new ListingRecipe
                        {
                            Name = "Sausage Gravy",
                            RecipeId = "7",
                        },
                        new ListingRecipe
                        {
                            Name = "Breakfast Squares",
                            RecipeId = "8"
                        }
                    }
                },
                new ListingCategory
                {
                    Order = 3,
                    Name = "Other",
                    Notes = null,
                    Recipes = new[]
                    {
                        new ListingRecipe
                        {
                            Name = "Sausage Gravy",
                            RecipeId = "7",
                        },
                        new ListingRecipe
                        {
                            Name = "Breakfast Squares",
                            RecipeId = "8"
                        }
                    }
                }
            };
        }
    }
}
