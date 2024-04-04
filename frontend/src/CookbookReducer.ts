import { createContext } from 'react';
import { Ingredient, ListingCategory, Recipe } from './models';

export const CookbookStateContext = createContext(null);
export const CookbookDispatchContext = createContext(null);

export type CookbookState = {
    listingCategories: ListingCategory[];
    selectedListingRecipeId?: string;
    selectedRecipe?: Recipe;
    ingredients?: Ingredient[];
    editRecipeOpen: boolean;
    editIngredientOpen: boolean;
    allowEdit: boolean;
    isEditing: boolean;
    isAuthenticated: boolean;
};

export const cookbookInitialState: CookbookState = {
    listingCategories: null,
    selectedListingRecipeId: null,
    selectedRecipe: null,
    ingredients: null,
    editRecipeOpen: false,
    editIngredientOpen: false,
    allowEdit: false,
    isEditing: false,
    isAuthenticated: false,
};

export const enum REDUCER_ACTION_TYPE {
    CATEGORIES_UPDATED,
    SET_SELECTED_RECIPE_ID,
    SET_RECIPE,
    INGREDIENTS_UPDATED,
    EDIT_RECIPE_OPEN,
    EDIT_INGREDIENT_OPEN,
    ALLOW_EDIT,
    SET_EDITING,
    AUTHENTICATED,
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: any
};

export const CookbookReducer = (state: CookbookState, action: ReducerAction) => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.CATEGORIES_UPDATED: {
            // split this out to make typescript happy.
            const cookbookState : CookbookState = {
                ...state,
                listingCategories: action.payload,
            };
            return cookbookState;
        }
        case REDUCER_ACTION_TYPE.SET_SELECTED_RECIPE_ID: {
            const cookbookState : CookbookState = {
                ...state,
                selectedListingRecipeId: action.payload,
            };
            return cookbookState;
        }
        case REDUCER_ACTION_TYPE.SET_RECIPE: {
            const cookbookState : CookbookState = {
                ...state,
                selectedRecipe: action.payload,
            };
            return cookbookState;
        }
        case REDUCER_ACTION_TYPE.INGREDIENTS_UPDATED: {
            const cookbookState : CookbookState = {
                ...state,
                ingredients: action.payload,
            };
            return cookbookState;
        }
        case REDUCER_ACTION_TYPE.EDIT_RECIPE_OPEN: {
            const cookbookState: CookbookState = {
                ...state,
                editRecipeOpen: action.payload
            }
            return cookbookState;
        }
        case REDUCER_ACTION_TYPE.EDIT_INGREDIENT_OPEN: {
            const cookbookState : CookbookState = {
                ...state,
                editIngredientOpen: action.payload
            };
            return cookbookState;
        }
        case REDUCER_ACTION_TYPE.ALLOW_EDIT: {
            // handle string true as well as boolean true comparison
            const allowEdit = (String(action.payload).toLowerCase() === 'true');

            const cookbookState : CookbookState = {
                ...state,
                allowEdit: allowEdit
            };
            return cookbookState;
        }
        case REDUCER_ACTION_TYPE.SET_EDITING: {
            const cookbookState : CookbookState = {
                ...state,
                isEditing: action.payload
            };
            return cookbookState;
        }
        case REDUCER_ACTION_TYPE.AUTHENTICATED: {
            // TODO: @JLD - is this of any value?  it isn't getting used - can I use it to de-authenticate on a call failure?
            const cookbookState : CookbookState = {
                ...state,
                isAuthenticated: action.payload
            }
            return cookbookState;
        }
        default: {
            throw Error ('unknown action: ' + action.type)
        }
    }
};
