import { createContext } from 'react';
import { Recipe } from './models';

export const CookbookStateContext = createContext(null);
export const CookbookDispatchContext = createContext(null);

export type CookbookState = {
    selectedListingRecipeId?: string;
    selectedRecipe: Recipe;
};

export const cookbookInitialState: CookbookState = {
    selectedListingRecipeId: null,
    selectedRecipe: null,
};

export const enum REDUCER_ACTION_TYPE {
    SET_SELECTED_RECIPE_ID,
    SET_RECIPE,
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
            }
            return cookbookState;
        }
        case REDUCER_ACTION_TYPE.SET_RECIPE: {
            const cookbookState : CookbookState = {
                ...state,
                selectedRecipe: action.payload,
            }
            return cookbookState;
        }
        default: {
            throw Error ('unknown action: ' + action.type)
        }
    }
};
