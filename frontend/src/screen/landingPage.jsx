import { ReactTyped } from "react-typed";
import { GoogleLogin } from "@react-oauth/google";
import { authStore } from "../stores/authStore";
import { Header } from "../components/header";

export const LandingPage = () => {
  const {login} = authStore();
  //onSuccess will provide something, that is why we need to pass a parameter
  const handleGoogleSuccess = async(googleCredentials) => {
    await login({credentials: googleCredentials.credential})
  }

  const handleGoogleError = () => {
    console.error("Google Auth Error")
  }

  return (
   <div>
    <Header/>
     <div className="min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-9xl my-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700">
        Reelay
      </h1>
      <h1 className="text-2xl my-4">
        Turn your ideas into{" "}
        <ReactTyped
          strings={["content...", "creations...", "projects..."]}
          typeSpeed={100}
          backSpeed={100}
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
  );
};
