import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LandingPage } from "./screen/landingPage";
import { Home } from "./screen/home";
import { Header } from "./components/header";
import { ProtectedRoute } from "./utils/protectedRoute";
import { useEffect } from "react";
import { AddChat } from "./screen/addChat";

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
            <Route
              path="/create-chat"
              element={
                <ProtectedRoute>
                  <AddChat />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/home" />}></Route>
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
