export const CookbookName = "jeff's";
export const JwtTokenName = 'CookbookToken';

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
}

export type Ingredient = {
    id: string;
    name: string;
    imagePath?: string;
    hideUnit: boolean;
    note?: string;
};

export type RecipeIngredient = {
    ingredientId: string;
    ingredient: Ingredient;
    amount: number;
    unit: number;
    note: string;
};

export type IngredientGroup = {
    // id: string;
    name: string;
    recipeIngredients: RecipeIngredient[];
};

export type RecipeStep = {
    // id: string;
    title: string;
    instructions?: string;
    imagePath?: string;
};

export type RecipeStepGroup = {
    // id: string;
    name: string;   // describe the step - i.e. for the tangzhong, for the frosting v. for the cake...
    steps: RecipeStep[];
};

export type Recipe = {
    id: string;
    name: string;
    categoryId: string;
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
};

export type ListingCategory = {
    id: string;
    order: number;
    name: string;
    recipes: ListingRecipe[];
    notes?: string; 
};

// export type Category = {
//     id: string;
//     name: string;
//     recipes: Recipe[];
// };

export type UserLogin = {
    email: string;
    password: string;
};