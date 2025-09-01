import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { refreshAccessToken } from "../utils/refresher";
import { getTicketStore } from "./authStore";
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const getUsersStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: [],

    getUser: async () => {
      try {
        set({ loading: true, success: false, error: false, message: "" });

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

        const response = await axios.get(`${baseUrl}/admin/get-users`, config);

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
            `${baseUrl}/admin/get-users`,
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
          success: true,
          error: false,
          message:
            err.response.data && err.response.data.error
              ? err.response.data.error
              : "Something went wrong.",
        });
      }
    },
  }))
);

export const searchUserStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: "",

    searchUser: async (query) => {
      try {
        set({ loading: true, success: false, error: false, message: "" });

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
          `${baseUrl}/admin/search-user/${query}`,
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
            `${baseUrl}/admin/search-user/${query}`,
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
          success: true,
          error: false,
          message:
            err.response.data && err.response.data.error
              ? err.response.data.error
              : "Something went wrong.",
        });
      }
    },
  }))
);

export const updateUserStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: "",

    updateUser: async (formData) => {
      try {
        set({ loading: true, success: false, error: false, message: "" });

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

        const response = await axios.patch(
          `${baseUrl}/admin/update-user`,
          formData,
          config
        );

        if (response.data && response.data.success) {
          console.log("Something");
          set({
            loading: false,
            success: true,
            error: false,
            message: response.data.success,
          });

          getUsersStore.getState().getUser();
          getTicketStore.getState().getTicket();
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

          const response = await axios.patch(
            `${baseUrl}/admin/update-user`,
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
            console.log(`CALLING: ${getUsersStore.getState().getUser()}`);
            getUsersStore.getState().getUser();
            getTicketStore.getState().getTicket();
          }
        }

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

export const deleteUserStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: "",

    deleteUser: async (id) => {
      try {
        set({ loading: true, success: false, error: false, message: "" });

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

        const response = await axios.delete(
          `${baseUrl}/admin/delete-user/${id}`,
          config
        );

        if (response.data && response.data.success) {
          set({
            loading: false,
            success: true,
            error: false,
            message: response.data.success,
          });
          getUsersStore.getState().getUser();
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

          const response = await axios.delete(
            `${baseUrl}/admin/delete-user/${id}`,
            config
          );

          if (response.data && response.data.success) {
            set({
              loading: false,
              success: true,
              error: false,
              message: response.data.success,
            });
            getUsersStore.getState().getUser();
          }
        }

        return set({
          loading: false,
          success: true,
          error: false,
          message:
            err.response.data && err.response.data.error
              ? err.response.data.error
              : "Something went wrong.",
        });
      }
    },
  }))
);

export const adminCheckStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: [],

    adminCheck: async () => {
      try {
        set({ loading: true, success: false, error: false, message: "" });

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
          `${baseUrl}/admin/admin-check`,
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
            `${baseUrl}/admin/admin-check`,
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
          success: true,
          error: false,
          message:
            err.response.data && err.response.data.error
              ? err.response.data.error
              : "Something went wrong.",
        });
      }
    },
  }))
);
