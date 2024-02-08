import { Reducer, Dispatch } from "react";
import recipeData from './recipes.json'

// Actions
const actionRoot = "home"

export type Ingredient = {
    id: string;
    name: string;
    imagePath?: string;
    createdBy?: string;
    createdAt?: string;
};

export type RecipeIngredient = {
    id: string;
    order: number;
    ingredient: Ingredient;
    amount: number;
    unit: string;  // TODO: @JXD - show recipeImage,
    note: string;
};

export type IngredientGroup = {
    id: string;
    order: number;
    name: string;
    recipeIngredients: RecipeIngredient[];
}

export type RecipeStep = {
    id: string;
    order: number;
    title: string;
    instructions?: string;
    image?: string;
}

export type RecipeStepGroup = {
    id: string;
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
};


// TODO: @JXD - do I need anything additional about equipment (bowls, pans, pots...)
// what about time and temperature for the oven?  for now, just putting all of that into the steps strings.
// Other consumables - parchment paper, wax paper, foil, plastic wrap, paper towel, cheesecloth...
// TODO: pluralize Cup/Cups or just use known abbreviations (C, T, t, g)

export type Category = {
    id: string;
    name: string;
    recipes: Recipe[];
};

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


const fetchContent = () => {
    // Initially, this will be just reading a json file containing all of the recipes.

    // Later, I'll write a back end to support all of this
        // C# .Net API
        // Mongo DB - or azure cosmos... a document store database
        // 
    
}
