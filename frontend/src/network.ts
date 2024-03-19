import { Ingredient, ListingCategory, Recipe } from "./models";

const baseUrl = "https://localhost:7014"

// TODO: add something to validate responses are ok or do something else?
// TODO: use react-query to handle stuff like caching, invalidation, requery...

// the idea here being that if I change a recipe, I need to get it again for another page to prove that the update took.
// the update query should invalidate that data on another table (i.e. add an ingredient, the ingredients list needs to be updated for the next add/edit immediately.)

// move all network interactions here.


// Categories
export const GetDbCategories = async () => {
    const response = await fetch(`${baseUrl}/cookbook/categories/`);

    if (!response.ok)
        return null;

    const categories:ListingCategory[] = await response.json();
    return categories;
}


// Recipes
export const GetDbRecipe = async (recipeId: string) => {
    const url = `${baseUrl}/cookbook/recipes/${recipeId}`
    const response = await fetch(url);

    if (!response.ok)
        return null;

    const recipe: Recipe = await response.json();
    return Promise.resolve(recipe);
}

export const AddDbRecipe = async (recipe: Recipe) => {
    // Add new recipe to db
    const response = await fetch(`${baseUrl}/cookbook/recipes`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });

    if (!response.ok)
    {
        throw new Error("ErrorAddingRecipe");
        // Promise.reject("Error Adding Recipe")
    }

    const recipeResponse: Recipe = await response.json();
    return recipeResponse; // now it has the id populated.
};

export const EditDbRecipe = async (recipe: Recipe) => {
    // Replaces entire recipe with new content
    const response = await fetch(`${baseUrl}/cookbook/recipes/${recipe.id}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });

    if (!response.ok)
    {
        throw new Error("Error Editing Recipe");
        // Promise.reject("Error Editing Recipe");
    }

    const recipeResponse: Recipe = await response.json();
    return recipeResponse;
};

export const DeleteDbRecipe = async (recipeId: string) => {
    const response = await fetch (`${baseUrl}/cookbook/recipes/${recipeId}`,
    {
        method: 'DELETE',
    });

    if (!response.ok)
    {
        throw Error("Error Deleting Recipe");
    }

    return response;
}

// Ingredients
export const GetDbIngredients = async () => {
    const response = await fetch(`${baseUrl}/cookbook/ingredients/`);

    if (!response.ok)
        return null;

    const ingredients:Ingredient[] = await response.json();

    return ingredients;
}

export const AddDbIngredient = async (ingredient: Ingredient) => {
    const response = await fetch(`${baseUrl}/cookbook/ingredients`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredient),
    });


    if (!response.ok)
    {
        throw Error("Error Adding Ingredient");
    }

    return response;
};

export const EditDbIngredient = async (ingredient: Ingredient) => {
    const response = await fetch(`${baseUrl}/cookbook/ingredients/${ingredient.id}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredient),
    });

    if (!response.ok)
    {
        throw Error("Error Editing Ingredient");
    }

    return response;
};

export const DeleteDbIngredient = async (ingredientId: string) => {
    const response = await fetch(`${baseUrl}/cookbook/ingredients/${ingredientId}`,
    {
        method: 'DELETE'
    });

    if (!response.ok)
    {
        throw Error("Error Deleting Ingredient");
    }

    return response;
};