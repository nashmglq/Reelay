import { useEffect, useState } from "react";
import { getProfileStore, updateProfileStore } from "../../stores/authStore";
import { createPortal } from "react-dom";
import { Camera, Check, Pencil, User, X } from "lucide-react";

export const Profile = () => {
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const { getProfile, loading, success, error, message } = getProfileStore();
  const {
    updateProfile,
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
    message: updateMessage,
  } = updateProfileStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const showHandler = (e) => {
    e.preventDefault();
    setShow(show ? false : true);
  };

  useEffect(() => {
    const handelChange = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handelChange();

    window.addEventListener("resize", handelChange);

    return () => {
      window.removeEventListener("resize", handelChange);
    };
  }, []);

  const updateProfileHandler = (e) => {
    e.preventDefault();
    const formData = { name, profilePic };
    updateProfile(formData);
    setUpdateForm(false);
  };

  console.log(message);
  return (
    <div>
      <button onClick={showHandler} className="sm:hidden">
        <User />
      </button>

      {show && isMobile ? (
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl border-2 w-[90%] sm:w-1/2 p-4">
              <button onClick={showHandler}>
                {" "}
                <X />
              </button>

              <div className="flex items-center">
                <div className="relative w-24 h-24 m-2 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={`${baseUrl}/uploads/${message.profilePic}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = message.profilePic;
                    }}
                    alt="Profile Picture"
                  />
                  {updateForm && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-xs rounded cursor-pointer">
                      <Camera />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setProfilePic(file);
                            const reader = new FileReader();
                            reader.onload = (e) =>
                              setProfilePic(e.target.result);
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="mx-2">
                  <div className="flex gap-x-2">
                    {updateForm ? (
                      <div className="flex">
                        <input
                          value={name}
                          className="border-2 rounded-lg border-black w-[85%]"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <Check onClick={updateProfileHandler} />
                      </div>
                    ) : (
                      <p>
                        {message && message.name ? message.name : "Name error"}
                      </p>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setUpdateForm(true);
                        setName(message.name);
                      }}
                    >
                      {!updateForm ? <Pencil /> : null}
                    </button>
                  </div>
                  <p>{message?.email || "Email error"}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      ) : isMobile === false ? (
        <div
          className="flex mt-10 ml-10 rounded-lg shadow-xl border-2 w-full h-auto flex-col"
          onMouseEnter={() => {
            setUpdateShow(true);
          }}
          onMouseLeave={() => {
            setUpdateShow(false);
          }}
        >
          <div className="my-2 w-full flex items-center">
            {/* Initially set it as div */}
            <div className="relative w-24 h-24 m-2 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={`${baseUrl}/uploads/${message.profilePic}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = message.profilePic;
                }}
                alt="Profile Picture"
              />
              {updateForm && (
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-xs rounded cursor-pointer">
                  <Camera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfilePic(file);
                        const reader = new FileReader();
                        reader.onload = (e) => setProfilePic(e.target.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div>
              <div className="flex gap-x-2">
                {updateForm ? (
                  <div className="flex">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-2 rounded-lg border-black w-[85%]"
                    />
                    <Check onClick={updateProfileHandler} />
                  </div>
                ) : (
                  <p>{message && message.name ? message.name : "Name error"}</p>
                )}

                {updateShow && !updateForm ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setUpdateForm(true);
                      setName(message.name);
                    }}
                  >
                    <Pencil />
                  </button>
                ) : null}
              </div>
              <p>{message && message.email ? message.email : "Email error"}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
