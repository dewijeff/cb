import React from "react";
import { render } from "react-dom";

import "core-js/stable";
import "regenerator-runtime/runtime";

const App = () => {
  return <div>Hello, worldz!</div>;
};

render(<App />, document.getElementById("app"));