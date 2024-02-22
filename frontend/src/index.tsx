import React from "react";
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import AddRecipe from "./AddRecipe";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AddRecipe" element={<AddRecipe />} />
    </Routes>
  </Router>
);

const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(<App />);
