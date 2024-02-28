import { Recipe } from "./models";

const baseUrl = "https://localhost:7014"

// move all network interactions here.

export const AddRecipeToDb = async (recipe: Recipe) => {
    const response = await fetch(`${baseUrl}/cookbook/recipes`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });

    return response;
}

export const EditRecipe = async (recipe: string) => {
    const response = await fetch(`${baseUrl}/cookbook/recipes`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });

    return response;
}