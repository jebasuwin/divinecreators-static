import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/theme.css";
import "./styles/components.css";
import "./styles/pages.css";
import "./styles/responsive.css";
import "./styles/reveal.css";
import "./styles/redesign.css";
import App from "./App.jsx";

document.documentElement.classList.add("js-reveal");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
