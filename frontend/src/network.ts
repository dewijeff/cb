import { useContext } from "react";
import { Ingredient, JwtTokenName, ListingCategory, Recipe, UserLogin } from "./models";

const baseUrl = "https://localhost:7014"

// TODO: add something to validate responses are ok or do something else?
// TODO: use react-query to handle stuff like caching, invalidation, requery...

// the idea here being that if I change a recipe, I need to get it again for another page to prove that the update took.
// the update query should invalidate that data on another table (i.e. add an ingredient, the ingredients list needs to be updated for the next add/edit immediately.)

// move all network interactions here.

// Categories
export const GetDbCategories = async () => {
    // TODO: Make this better - lots of repetitive code around authorization - has to be a way to wrap this to add the Authorization Header automatically.  Also would like to change state based on a 401 from any of these and kick the user back to the login page...
    const jwt = localStorage.getItem(JwtTokenName);
    const response = await fetch(`${baseUrl}/cookbook/categories/`,
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });

    if (!response.ok)
        return null;

    const categories:ListingCategory[] = await response.json();
    return categories;
}

// Recipes
export const GetDbRecipe = async (recipeId: string) => {
    const jwt = localStorage.getItem(JwtTokenName);
    const url = `${baseUrl}/cookbook/recipes/${recipeId}`
    const response = await fetch(url,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

    if (!response.ok)
        return null;

    const recipe: Recipe = await response.json();
    return Promise.resolve(recipe);
}

export const AddDbRecipe = async (recipe: Recipe) => {
    // Add new recipe to db
    const jwt = localStorage.getItem(JwtTokenName);
    const response = await fetch(`${baseUrl}/cookbook/recipes`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
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
    const jwt = localStorage.getItem(JwtTokenName);
    const response = await fetch(`${baseUrl}/cookbook/recipes/${recipe.id}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
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
    const jwt = localStorage.getItem(JwtTokenName);
    const response = await fetch (`${baseUrl}/cookbook/recipes/${recipeId}`,
    {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt}`,
        }
    });

    if (!response.ok)
    {
        throw Error("Error Deleting Recipe");
    }

    return response;
}

// Ingredients
export const GetDbIngredients = async () => {
    const jwt = localStorage.getItem(JwtTokenName);
    const response = await fetch(`${baseUrl}/cookbook/ingredients/`,
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });

    if (!response.ok)
        return null;

    const ingredients:Ingredient[] = await response.json();

    return ingredients;
}

export const AddDbIngredient = async (ingredient: Ingredient) => {
    const jwt = localStorage.getItem(JwtTokenName);
    const response = await fetch(`${baseUrl}/cookbook/ingredients`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
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
    const jwt = localStorage.getItem(JwtTokenName);
    const response = await fetch(`${baseUrl}/cookbook/ingredients/${ingredient.id}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
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
    const jwt = localStorage.getItem(JwtTokenName);
    const response = await fetch(`${baseUrl}/cookbook/ingredients/${ingredientId}`,
    {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt}`,
        },
    });

    if (!response.ok)
    {
        throw Error("Error Deleting Ingredient");
    }

    return response;
};

export const RegisterUser = async () => {

}

interface LoginResponse {
    jwt: string
}

export const LoginUser = async (handleClaims: (token: string) => void, login: UserLogin) => {
    const response = await fetch(`${baseUrl}/cookbook/login/`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
    });

    if (response.ok)
    {
        const responseJson: LoginResponse = await response.json();

        handleClaims(responseJson.jwt);
        localStorage.setItem(JwtTokenName, responseJson.jwt);
    }

    return response.statusText;
}

export const VerifyAuth = async () => {
    const jwt = localStorage.getItem(JwtTokenName);
    const response = await fetch(`${baseUrl}/cookbook/verify/`,
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });

    if (!response.ok)
    {
        return false;
    }

    return true;
}
