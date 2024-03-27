import { createContext } from 'react';
import { Ingredient, Recipe } from './models';

export const CookbookStateContext = createContext(null);
export const CookbookDispatchContext = createContext(null);

export type CookbookState = {
    selectedListingRecipeId?: string;
    selectedRecipe?: Recipe;
    ingredients?: Ingredient[];
    editIngredientsOpen: boolean;
    allowEdit: boolean;
    isAuthenticated: boolean;
};

export const cookbookInitialState: CookbookState = {
    selectedListingRecipeId: null,
    selectedRecipe: null,
    ingredients: null,
    editIngredientsOpen: false,
    allowEdit: false,
    isAuthenticated: false,
};

export const enum REDUCER_ACTION_TYPE {
    SET_SELECTED_RECIPE_ID,
    SET_RECIPE,
    INGREDIENTS_UPDATED,
    EDIT_INGREDIENT_OPEN,
    ALLOW_EDIT,
    AUTHENTICATED,
};

type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: any
};

export const CookbookReducer = (state: CookbookState, action: ReducerAction) => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.SET_SELECTED_RECIPE_ID: {
            // split this out to make typescript happy.
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
        case REDUCER_ACTION_TYPE.EDIT_INGREDIENT_OPEN: {
            const cookbookState : CookbookState = {
                ...state,
                editIngredientsOpen: action.payload
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
            console.log('reducer cookbookState', cookbookState);
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
