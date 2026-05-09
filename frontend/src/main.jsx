import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./app/App.jsx";
import { CafeProvider, UnitProvider } from "./context/cafeContext.jsx";
import { AuthProvider } from "./auth/authProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CafeProvider>
        <UnitProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </UnitProvider>
      </CafeProvider>
    </BrowserRouter>
  </StrictMode>,
);
