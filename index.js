import React from "react";
import ReactDOM from "react-dom/client"; // ✅ correct import for React 18
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

