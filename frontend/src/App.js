import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LandingPage } from "./screen/landingPage";
import { Header } from "./components/header";

function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          {userInfo ? null : <Header />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
