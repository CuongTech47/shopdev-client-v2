import React from "react";

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./redux/store.js";
// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
