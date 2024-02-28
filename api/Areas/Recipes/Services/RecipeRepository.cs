using api.Areas.Recipes.Models;
using api.Shared;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Areas.Recipes.Services;

public class RecipeRepository : IRecipeRepository
{
    private IDictionary<string, Recipe> _recipes = new Dictionary<string, Recipe>
    {
        {
            "1", new Recipe
            {
                Id = "1",
                Name = "Shokupan",
                IngredientGroups = new []
                {
                    new IngredientGroup
                    {
                        Order = 1,
                        Name = "Tangzhong",
                        RecipeIngredients = new []
                        {
                            new RecipeIngredient
                            {
                                Order = 1,
                                IngredientId = "1",
                                Amount = 350,
                                Unit = MeasurementUnit.Gram
                            },
                            new RecipeIngredient
                            {
                                Order = 2,
                                IngredientId = "2",
                                Amount = 70,
                                Unit = MeasurementUnit.Gram
                            }
                        }
                    },
                    new IngredientGroup
                    {
                        Order = 2,
                        Name = "Yeast Starter",
                        RecipeIngredients = new []
                        {
                            new RecipeIngredient
                            {
                                Order = 1,
                                IngredientId = "3",
                                Amount = 350,
                                Unit = MeasurementUnit.Gram
                            },
                            new RecipeIngredient
                            {
                                Order = 2,
                                IngredientId = "4",
                                Amount = 12,
                                Unit = MeasurementUnit.Gram
                            },
                            new RecipeIngredient
                            {
                                Order = 3,
                                IngredientId = "5",
                                Amount = 10,
                                Unit = MeasurementUnit.Gram
                            }
                        }
                    },
                    new IngredientGroup
                    {
                        Order = 3,
                        Name = "Dough",
                        RecipeIngredients = new []
                        {
                            new RecipeIngredient
                            {
                                Order = 1,
                                IngredientId = "2",
                                Amount = 1130,
                                Unit = MeasurementUnit.Gram
                            },
                            new RecipeIngredient
                            {
                                Order = 2,
                                IngredientId = "5",
                                Amount = 80,
                                Unit = MeasurementUnit.Gram
                            },
                            new RecipeIngredient
                            {
                                Order = 3,
                                IngredientId = "6",
                                Amount = 4,
                                Unit = MeasurementUnit.Egg
                            }
                        }
                    }
                }
            }
        },
        {
            "2", new Recipe
            {
                Id = "2",
                Name = "Italian Bread",
            }
        },
        {
            "3", new Recipe
            {
                Id = "3",
                Name = "Hamburger Buns",
            }
        },
        {
            "4", new Recipe
            {
                Id = "4",
                Name = "HoagieRolls",
            }
        },
        {
            "5", new Recipe
            {
                Id = "5",
                Name = "Low Sodium Bisquick",
                IngredientGroups = new []
                {
                    new IngredientGroup
                    {
                        Order = 1,
                        Name = "Dry Ingredients",
                        RecipeIngredients = new []
                        {
                            new RecipeIngredient
                            {
                                Order = 1,
                                IngredientId = "2",
                                Amount = 3,
                                Unit = MeasurementUnit.Cup
                            },
                            new RecipeIngredient
                            {
                                Order = 2,
                                IngredientId = "7",
                                Amount = .5m,
                                Unit = MeasurementUnit.Cup
                            },
                            new RecipeIngredient
                            {
                                Order = 3,
                                IngredientId = "9",
                                Amount = 1.5m,
                                Unit = MeasurementUnit.Tablespoon
                            }
                        }
                    },
                    new IngredientGroup
                    {
                        Order = 2,
                        Name = "Wet Ingredients",
                        RecipeIngredients = new []
                        {
                            new RecipeIngredient
                            {
                                Order = 1,
                                IngredientId = "3",
                                Amount = 1,
                                Unit = MeasurementUnit.Gallon
                            }
                        }
                    }
                },
                StepGroups = new []
                {
                    new StepGroup
                    {
                        Order = 1,
                        Name = "Make Bisquick",
                        Steps = new []
                        {
                            new Step
                            {
                                Order = 1,
                                Title = "Put all ingredients into bowl",
                                Instructions = ""
                            },
                            new Step
                            {
                                Order = 2,
                                Title = "Combine by hand",
                                Instructions = "Mix the butter into the dry ingredients by hand, pinching the buter into the dry ingredients until it is the size of grains of rice.  When done, the mix should hold together like slightly damp sand when you squeeze a fistful of it."
                            }
                        }
                    },
                    new StepGroup
                    {
                        Order = 2,
                        Name = "Use Bisquick",
                        Steps = new []
                        {
                            new Step
                            {
                                Order = 1,
                                Title = "Preheat oven to 425 degrees", // TODO: provide metric conversion of recipes?
                                Instructions = null
                            },
                            new Step
                            {
                                Order = 1,
                                Title = "Add Milk",
                                Instructions = "Add milk a little at a time and stir with a spoon until the desired consistency.  This is usually when there are no dry spots left in the flour, but well before it is soupy.  More like a stiff, stretchy paste."
                            },
                            new Step
                            {
                                Order = 1,
                                Title = "Create Drop Biscuits",
                                Instructions = "With 2 spoons, first take a scoop of the dough with one spoon, about 2-3 tablespoons and scrape the dough off the other spoon onto a parchment lined baking sheet."
                            },
                            new Step
                            {
                                Order = 1,
                                Title = "Bake",
                                Instructions = "Bake at 425&deg;F until lightly browned on the outside and the internal temp is about 200&deg;F, usually about 15-20 minutes."
                            },
                        }
                    }
                }
            }
        },
        {
            "6", new Recipe
            {
                Id = "6",
                Name = "Pizza Dough",
            }
        },
        {
            "7", new Recipe
            {
                Id = "7",
                Name = "Sausage Gravy",
            }
        },
        {
            "8", new Recipe
            {
                Id = "8",
                Name = "Breakfast Squares",
            }
        },
        {
            "9", new Recipe
            {
                Id = "9",
                Name = "Christmas Pudding",
            }
        },
        {
            "10", new Recipe
            {
                Id = "10",
                Name = "Advocaat",
            }
        },
    };

    public async Task<Recipe?> GetRecipe(string id, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<Recipe>();

        var filter = Builders<Recipe>.Filter.Eq("_id", ObjectId.Parse(id));

        var recipe = await collection.Find(filter).FirstOrDefaultAsync(cancellationToken);

        return recipe;
    }

    public async Task<Recipe?> AddRecipe(Recipe recipe, CancellationToken cancellationToken)
    {
        var collection = MongoUtility.GetCollection<Recipe>();

        var options = new InsertOneOptions();

        await collection.InsertOneAsync(recipe, options, cancellationToken);

        // id should now be the new insert id? (according to the documentation)
        return recipe;
    }

    public Task<Recipe?> UpdateRecipe(string id, Recipe recipe, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<Recipe?> DeleteRecipe(string id, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}