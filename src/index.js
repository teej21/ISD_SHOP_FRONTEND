import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ClickTheme } from "./context/ClickTheme.tsx";
import { ClickForHomepage } from "./context/ClickForHomepage.tsx";
import { createRoot } from "react-dom/client";
import { AdminController } from "./context/AdminController.tsx";
const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ClickTheme>
      <ClickForHomepage>
        <AdminController>
          <App />
        </AdminController>
      </ClickForHomepage>
    </ClickTheme>
  </BrowserRouter>
);

reportWebVitals();
