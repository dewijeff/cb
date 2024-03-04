import React, { useReducer } from "react";
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import EditRecipe from "./EditRecipe";
import EditIngredient from "./EditIngredient";
import { CookbookDispatchContext, CookbookStateContext, cookbookInitialState, CookbookReducer, } from "./selectedItemReducer";

// Edit will be the same component as add, just with an ?id={id} on the end. - not sure how to really do that.

const App = () => {
  const [state, dispatch] = useReducer(CookbookReducer, cookbookInitialState);

  return (
    <CookbookStateContext.Provider value={state}>
      <CookbookDispatchContext.Provider value={dispatch}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddRecipe" element={<EditRecipe />} />
            <Route path="/AddIngredient" element={<EditIngredient />} />
            <Route path="/EditRecipe" element={<EditRecipe />} />         
            <Route path="/EditIngredient" element={<EditIngredient />} />
          </Routes>
        </Router>
      </CookbookDispatchContext.Provider>
    </CookbookStateContext.Provider>);
};

const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(<App />);
