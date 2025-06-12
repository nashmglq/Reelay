import { useEffect } from "react";
import { getProfileStore } from "../../stores/authStore";
export const Profile = () => {
  const { getProfile, loading, success, error, message } = getProfileStore();
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  console.log(message);
  return (
    <div className="flex mt-10 ml-10 rounded-lg shadow-xl border-2 w-full h-auto">
      <div className="my-2 w-full flex flex-col items-center">
        <img
          src={`${
            message && message.profilePic ? message.profilePic : "default.jpg"
          }`}
          className="rounded-full w-1/4 h-auto"
        />

        <p>{message && message.name ? message.name : "Name error"}</p>
        <p>{message && message.email ? message.email : "Email error"}</p>
      </div>
    </div>
  );
};
