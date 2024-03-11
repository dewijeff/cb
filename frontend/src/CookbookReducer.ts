import { createContext } from 'react';

export const CookbookStateContext = createContext(null);
export const CookbookDispatchContext = createContext(null);

export type CookbookState = {
    selectedRecipeId?: string;
};

export const cookbookInitialState: CookbookState = {
    selectedRecipeId: null,
};

export const enum REDUCER_ACTION_TYPE {
    SET_SELECTED_RECIPE_ID
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
                selectedRecipeId: action.payload,
            }
            return cookbookState;
        }
        default: {
            throw Error ('unknown action: ' + action.type)
        }
    }
};
