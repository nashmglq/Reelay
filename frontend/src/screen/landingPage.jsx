import { ReactTyped } from "react-typed";
import { GoogleLogin } from "@react-oauth/google";
import { authStore } from "../stores/authStore";
import { Header } from "../components/header";
import { AboutUs } from "../components/aboutUs";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Contact } from "../components/contact";

export const LandingPage = () => {
  const { login } = authStore();
  const nav = useNavigate();
  // const localStorage
  //onSuccess will provide something, that is why we need to pass a parameter
  const handleGoogleSuccess = async (googleCredentials) => {
    await login({ credentials: googleCredentials.credential });
  };
  const handleGoogleError = () => {
    console.error("Google Auth Error");
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (userInfo) {
      nav("/home");
    }
  }, [userInfo]);

  return (
    <div>
      <div className="h-screen flex flex-col">
        <div className="flex-grow flex flex-col justify-center items-center">
          <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 p-6">
            Reelay
          </h1>
          <h1 className="text-2xl my-4">
            Turn your ideas into{" "}
            <ReactTyped
              strings={["content...", "creations...", "projects..."]}
              typeSpeed={40}
              backSpeed={40}
              loop
            ></ReactTyped>
          </h1>
          <GoogleLogin
            useOneTap
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="signin_with"
            shape="rectangular"
            theme="filled_white"
          />
        </div>
      </div>
      <AboutUs id="about" />
      <Contact id="contact" />
    </div>
  );
};
