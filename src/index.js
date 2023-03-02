import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'font-awesome/css/font-awesome.min.css';

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);