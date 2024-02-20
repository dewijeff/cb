import React from "react";
import { createRoot } from 'react-dom/client';
import Home from "./home";
// import { HashRouter, Route, Routes} from "react-router-dom";

const App = () => (
  // <HashRouter>
  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //   </Routes>
  // </HashRouter>
  <Home/>
);

const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(<App />);
