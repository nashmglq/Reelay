import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getTicketStore } from "./authStore";
import { refreshAccessToken } from "../utils/refresher";
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;
const { getTicket } = getTicketStore.getState();

export const generateScriptStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: "",

    generateScript: async (formData) => {
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
          `${baseUrl}/crud-genAi/gen-script`,
          formData,
          config
        );

        if (response.data && response.data.success) {
          set({
            loading: false,
            success: true,
            error: false,
            message: response.data.success,
          });
          getTicket();
        }
      } catch (err) {
        if (err.response.status === 401) {
          const newToken = await refreshAccessToken();
          const config = {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${newToken}`,
            },
          };

          const response = await axios.post(
            `${baseUrl}/crud-genAi/gen-script`,
            formData,
            config
          );

          if (response.data && response.data.success) {
            set({
              loading: false,
              success: true,
              error: false,
              message: response.data.success,
            });
            getTicket();
          }
        }

        return set({
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

export const generateImageStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: "",

    generateImage: async (formData) => {
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
          `${baseUrl}/crud-genAi/gen-image`,
          formData,
          config
        );

        if (response.data && response.data.success) {
          set({
            loading: false,
            success: true,
            error: false,
            message: response.data.success,
          });
          getTicket();
        }
      } catch (err) {
        if (err.response.status === 401) {
          const newToken = await refreshAccessToken();
          const config = {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${newToken}`,
            },
          };

          const response = await axios.post(
            `${baseUrl}/crud-genAi/gen-image`,
            formData,
            config
          );

          if (response.data && response.data.success) {
            set({
              loading: false,
              success: true,
              error: false,
              message: response.data.success,
            });
            getTicket();
          }
        }

        return set({
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

export const historyChatStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: "",

    historyChat: async (id) => {
      try {
        set({
          loading: true,
          success: false,
          error: false,
        });

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

        const response = await axios.get(
          `${baseUrl}/crud-genAi/get-prev-chats/${id}`,
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
        if (err.response.status === 401) {
          const newToken = await refreshAccessToken();
          const config = {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${newToken}`,
            },
          };

          const response = await axios.get(
            `${baseUrl}/crud-genAi/get-prev-chats/${id}`,
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
        }

        return set({
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

export const historyImageStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: "",

    historyImage: async (id) => {
      try {
        set({
          loading: true,
          success: false,
          error: false,
        });

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

        const response = await axios.get(
          `${baseUrl}/crud-genAi/get-prev-images/${id}`,
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
        if (err.response.status === 401) {
          const newToken = await refreshAccessToken();
          const config = {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${newToken}`,
            },
          };

          const response = await axios.get(
            `${baseUrl}/crud-genAi/get-prev-images/${id}`,
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
        }

        return set({
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
