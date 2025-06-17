import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LandingPage } from "./screen/landingPage";
import { Home } from "./screen/home";
import { ProtectedRoute } from "./utils/protectedRoute";
import { DetailChat } from "./screen/detailChat";

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
              path="/chat/:id"
              element={
                <ProtectedRoute>
                  <DetailChat />
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
