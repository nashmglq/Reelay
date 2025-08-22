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
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState(null);

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
  }, [getProfile, updateSuccess]);

  const showHandler = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  useEffect(() => {
    const handleChange = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleChange();
    window.addEventListener("resize", handleChange);
    return () => window.removeEventListener("resize", handleChange);
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const updateProfileHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name || message.name);

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    updateProfile(formData);
    setUpdateForm(false);
  };

  return (
    <div>
      <button onClick={showHandler} className="sm:hidden flex items-center justify-center">
        <User />
      </button>

      {show && isMobile ? (
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl border-2 w-[90%] sm:w-1/2 p-4">
              <button onClick={showHandler}>
                <X />
              </button>

              <div className="flex items-center">
                <div className="relative w-24 h-24 m-2 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={
                      preview
                        ? preview
                        : message.profilePic?.startsWith("http")
                        ? message.profilePic
                        : message.profilePic
                        ? `${baseUrl}/uploads/${message.profilePic}`
                        : "default.jpg"
                    }
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "default.jpg";
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
                            setPreview(URL.createObjectURL(file));
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
          onMouseEnter={() => setUpdateShow(true)}
          onMouseLeave={() => setUpdateShow(false)}
        >
          <div className="my-2 w-full flex items-center">
            <div className="relative w-24 h-24 md:w-10 md:h-10 m-2 2xl:w-24 2xl:h-24 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={
                  preview
                    ? preview
                    : message.profilePic?.startsWith("http")
                    ? message.profilePic
                    : message.profilePic
                    ? `${baseUrl}/uploads/${message.profilePic}`
                    : "default.jpg"
                }
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "default.jpg";
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
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div>
              <div className="flex gap-x-2 md:text-[50%] lg:text-[100%]">
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
                  <p>{message?.name || "Name error"}</p>
                )}

                {updateShow && !updateForm ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setUpdateForm(true);
                      setName(message.name);
                    }}
                  >
                    <Pencil size={10} />
                  </button>
                ) : null}
              </div>
              <p className="text-[100%] md:text-[50%] xl:text-[90%]">{message?.email || "Email error"}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
