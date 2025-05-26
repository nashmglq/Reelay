import { axios } from "axios";
import { create } from "zustand";

const baseUrl = process.env.SERVER_BASE_URL;

export const authStore = create((set) => ({
  loading: false,
  success: false,
  error: null,
  message: [],

  login: async (credential) => {
    try {
      set({ loading: true, success: false, error: false, message: [] });

      const response = await axios.post(
        `${baseUrl}/auth/google-auth`,
        credential
      );

      if (response.data && response.data.success) {
        localStorage.setItem("userInfo", JSON.stringify(response.data.success));
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
}));
