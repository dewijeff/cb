import {createContext} from "react";

type CookbookState = {
    cookbookName: string;
}

const initialState : CookbookState = {
    cookbookName: "jeff's"
};

export const CookbookContext = createContext(initialState);
