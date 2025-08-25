import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LandingPage } from "./screen/landingPage";
import { Home } from "./screen/home";
import { ProtectedRoute } from "./utils/protectedRoute";
import { DetailChat } from "./screen/detailChat";
import { ImageScreen } from "./screen/imageScreen";
import { Payment } from "./screen/payment";
import { AdminPannel } from "./screen/adminPannel";

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

            <Route
              path="/chat/image/:id"
              element={
                <ProtectedRoute>
                  <ImageScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPannel />
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
