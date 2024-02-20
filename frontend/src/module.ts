import { Reducer, Dispatch } from "react";
import recipeData from './recipes.json'

// Actions
const actionRoot = "home"

export enum MeasurementUnit {
    Cup = 1,
    Tablespoon = 2,
    Teaspoon = 3,
    Ounce = 4,
    Pound = 5,
    Milliliter = 6,
    Gram = 7,
    Egg = 8,
    Gallon = 9,
};

export type Ingredient = {
    id: string;
    name: string;
    imagePath?: string;
    hideUnit: boolean;
    note?: string;
};

export type RecipeIngredient = {
    order: number;
    ingredientId: string;
    ingredient: Ingredient;
    amount: number;
    unit: number;
    note: string;
};

export type IngredientGroup = {
    // id: string;
    order: number;
    name: string;
    recipeIngredients: RecipeIngredient[];
}

export type RecipeStep = {
    // id: string;
    order: number;
    title: string;
    instructions?: string;
    imagePath?: string;
}

export type RecipeStepGroup = {
    // id: string;
    order: number;
    name: string;   // describe the step - i.e. for the tangzhong, for the frosting v. for the cake...
    steps: RecipeStep[];
};

export type Recipe = {
    id: string;
    name: string;
    category: string;
    ingredientGroups: IngredientGroup[];
    stepGroups: RecipeStepGroup[];
    notes?: string;
    images?: string[];
    createdBy?: string;
    createdAt?: string;
    associatedRecipes?: string[];
};


// TODO: @JXD - do I need anything additional about equipment (bowls, pans, pots...)
// what about time and temperature for the oven?  for now, just putting all of that into the steps strings.
// Other consumables - parchment paper, wax paper, foil, plastic wrap, paper towel, cheesecloth...
// TODO: pluralize Cup/Cups or just use known abbreviations (C, T, t, g)

export type ListingRecipe = {
    order: number;
    name: string;
    recipeId: string;
}

export type ListingCategory = {
    order: number;
    name: string;
    recipes: ListingRecipe[];
    notes?: string; 
}

export type Category = {
    id: string;
    name: string;
    recipes: Recipe[];
};

export function GetIngredientNameString(count: number, name: string, hideUnit: boolean)
{
    if (hideUnit && count > 1)
        return name + 's';

    return name;
}

export function GetUnitsString(count: number, unitsEnum: number, hideUnit: boolean)
{
    const units = MeasurementUnit[unitsEnum];

    if (hideUnit)
        return null;

    if (count <= 1 && count > 0)
        return units;
    
    return units + 's';
}

// what about subcategories... (Desert --> Cookies, Cakes, Puddings, Other...)
// should ingredient groups be tied in some way to step groups, or just casually?

export type State = {
    categories: Category[];
    selectedCategory?: Category;
    selectedRecipe?: Recipe;
};

const initialState: State = {
    categories: [],
    selectedCategory: null,

}
