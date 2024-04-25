import React, { useReducer } from "react";
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { CookbookDispatchContext, CookbookStateContext, cookbookInitialState, CookbookReducer, } from "./Shared/CookbookReducer";
import About from "./About";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  const [state, dispatch] = useReducer(CookbookReducer, cookbookInitialState);

  return (
    <CookbookStateContext.Provider value={state}>
      <CookbookDispatchContext.Provider value={dispatch}>
        <Router>
          <Routes>
            <Route path="/" element={<Login switchUser={false}/>} />
            <Route path="/cookbook" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/switchUser" element={<Login switchUser={true}/>} />
          </Routes>
        </Router>
      </CookbookDispatchContext.Provider>
    </CookbookStateContext.Provider>);
};

const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(<App />);
