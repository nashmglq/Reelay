import axios from "axios";
import { create } from "zustand";
import { devtools } from 'zustand/middleware'

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;


export const authStore = create(devtools((set) => ({
  loading: false,
  success: false,
  error: null,
  message: [],

  login: async (credentials) => {
    try {
      set({ loading: true, success: false, error: false, message: [] });
   console.log(baseUrl)
      const response = await axios.post(
        `${baseUrl}/auth/google-auth`,
        credentials
      );
   
      console.log(response)
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
})));
