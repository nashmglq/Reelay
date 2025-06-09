import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const authStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: null,
    message: [],

    login: async (credentials) => {
      try {
        set({ loading: true, success: false, error: false, message: [] });
        console.log(baseUrl);
        const response = await axios.post(
          `${baseUrl}/auth/google-auth`,
          credentials
        );

        console.log(response);
        if (response.data && response.data.success) {
          localStorage.setItem(
            "userInfo",
            JSON.stringify(response.data.success)
          );
          set({
            loading: false,
            success: true,
            error: false,
            message: response.data.success,
          });
        }
      } catch (err) {
        set({
          loading: false,
          success: false,
          error: true,
          message:
            err.response && err.response.data.error
              ? err.response.data.error
              : "Something went wrong",
        });
      }
    },
  }))
);

export const getProfileStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: [],

    getProfile: async () => {
      try {
        set({ loading: true, success: false, error: false, message: [] });

        const getToken = JSON.parse(localStorage.getItem("userInfo"));
        const token = getToken ? getToken.token : null;
        const config = token
          ? {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          : null;

        const response = await axios.get(`${baseUrl}/auth/get-profile`, config);

        if (response.data && response.data.success) {
          set({
            loading: false,
            success: true,
            error: false,
            message: response.data.success,
          });
        }
      } catch (err) {
        set({
          loading: false,
          success: false,
          error: false,
          message:
            err.response && err.response.data
              ? err.response.data.error
              : "Something went wrong",
        });
      }
    },
  }))
);

// create( devtools( (set) => ( { } )  )  )
export const newChatStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: [],

    newChat: async (formData) => {
      try {
        set({ loading: true, success: false, error: false, message: [] });

        const getToken = JSON.parse(localStorage.getItem("userInfo"));
        const token = getToken ? getToken.token : null;
        const config = token
          ? {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          : null;

        const response = await axios.post(
          `${baseUrl}/crud-genAi/create-chat`,
          formData,
          config
        );

        if (response.data && response.data.success) {
          return set({
            loading: false,
            success: true,
            error: false,
            message: response.data.success,
          });
        }
      } catch (err) {
        return set({
          loading: false,
          success: false,
          error: true,
          message:
            err.response.data && err.response.data.error
              ? err.response.data.error
              : "Something went wrong.",
        });
      }
    },
  }))
);

export const listViewOfChatStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: [],

    listView: async () => {
      try {
        set({ loading: true, success: false, error: false, message: [] });

        const getToken = JSON.parse(localStorage.getItem("userInfo"));
        const token = getToken ? getToken.token : null;
        const config = token
          ? {
              headers: {
                Accept: "application/json",
                Bearer: `Bearer ${token}`,
              },
            }
          : null;

        const response = await axios.get(
          `${baseUrl}/crud-genAi/get-chats`,
          config
        );

        if (response.data && response.data.success) {
          return set({
            loading: false,
            success: true,
            error: false,
            message: response.data.success,
          });
        }
      } catch (err) {
        return set({
          loading: false,
          success: false,
          error: true,
          message:
            err.response.data && err.response.data.error
              ? err.response.data.error
              : "Something went wrong.",
        });
      }
    },
  }))
);
