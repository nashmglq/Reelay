import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LandingPage } from "./screen/landingPage";
import { Home } from "./screen/home";
import { Header } from "./components/header";
import { ProtectedRoute } from "./utils/protectedRoute";
import { useEffect } from "react";

function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;

  return (
    <div>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <LandingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
