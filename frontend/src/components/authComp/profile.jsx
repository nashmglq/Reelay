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

  const profileImgSrc =
    preview
      ? preview
      : !message
      ? "/default.jpg"
      : message?.profilePic?.startsWith("http")
      ? message.profilePic
      : message?.profilePic
      ? `${baseUrl}/uploads/${message.profilePic}`
      : "/default.jpg";

  return (
    <div>
      {/* Mobile trigger button */}
      <button onClick={showHandler} className="sm:hidden">
        <User />
      </button>

      {/* Mobile Modal */}
      {show && isMobile
        ? createPortal(
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl border-2 w-[90%] sm:w-2/3 md:w-1/2 p-4">
                <button onClick={showHandler} className="mb-2">
                  <X />
                </button>

                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                  {/* Profile Image */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 m-2 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={profileImgSrc}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/default.jpg";
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

                  {/* Name + Email */}
                  <div className="mx-2 w-full">
                    <div className="flex gap-x-2 items-center">
                      {updateForm ? (
                        <div className="flex w-full">
                          <input
                            value={name}
                            className="border-2 rounded-lg border-black flex-1 px-2"
                            onChange={(e) => setName(e.target.value)}
                          />
                          <Check
                            className="ml-2 cursor-pointer"
                            onClick={updateProfileHandler}
                          />
                        </div>
                      ) : (
                        <p className="text-base sm:text-lg font-medium">
                          {message?.name || "Name error"}
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
                    <p className="text-sm sm:text-base text-gray-600 break-all">
                      {message?.email || "Email error"}
                    </p>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}

      {/* Desktop Card */}
      {!isMobile && (
        <div
          className="flex flex-col md:flex-row items-center md:items-start mt-6 md:mt-10 ml-4 md:ml-10 rounded-lg shadow-xl border-2 w-full max-w-3xl p-4 gap-4"
          onMouseEnter={() => setUpdateShow(true)}
          onMouseLeave={() => setUpdateShow(false)}
        >
          {/* Profile Image */}
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={profileImgSrc}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/default.jpg";
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

          {/* Info */}
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-x-2 items-center">
              {updateForm ? (
                <div className="flex w-full">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 rounded-lg border-black flex-1 px-2"
                  />
                  <Check
                    className="ml-2 cursor-pointer"
                    onClick={updateProfileHandler}
                  />
                </div>
              ) : (
                <p className="text-lg font-medium">{message?.name || "Name error"}</p>
              )}
              {updateShow && !updateForm && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdateForm(true);
                    setName(message.name);
                  }}
                >
                  <Pencil />
                </button>
              )}
            </div>
            <p className="text-sm md:text-base text-gray-600 break-all">
              {message?.email || "Email error"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
