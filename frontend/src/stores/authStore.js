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

export const updateProfileStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: "",

    updateProfile: async (formData) => {
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

        const response = await axios.put(
          `${baseUrl}/auth/update-profile`,
          formData,
          config
        );
        console.log(response);
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
                Authorization: `Bearer ${token}`,
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

export const searchChats = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: [],

    queryChat: async (formData) => {
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
          `${baseUrl}/crud-genAi/search-chat`,
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
        }
      } catch (err) {
        set({
          loading: false,
          success: false,
          error: true,
          message:
            err.response && err.response.data
              ? err.response.data.error
              : "Something went wrong.",
        });
      }
    },
  }))
);

export const getDetailViewStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: [],

    getDetail: async (id) => {
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

        const response = await axios.get(
          `${baseUrl}/crud-genAi/get-detail-chat/${id}`,
          config
        );

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
          error: true,
          message:
            err.response && err.response.data
              ? err.response.data.error
              : "Something went wrong.",
        });
      }
    },
  }))
);

export const updateChatStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: [],

    updateChat: async (formData) => {
      try {
        console.log(formData);
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

        const response = await axios.put(
          `${baseUrl}/crud-genAi/update-chat`,
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
        }
        const { listView } = listViewOfChatStore.getState();
        listView();

        const { queryChat } = searchChats.getState();
        queryChat();
      } catch (err) {
        set({
          loading: false,
          success: false,
          error: true,
          message:
            err.response && err.response.data
              ? err.response.data.error
              : "Something went wrong.",
        });
      }
    },
  }))
);

export const deleteChatStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: [],

    deleteChat: async (uuid) => {
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

        const response = await axios.delete(
          `${baseUrl}/crud-genAi/delete-chat/${uuid}`,
          config
        );

        if (response.data && response.data.success) {
          set({
            loading: false,
            success: true,
            error: false,
            message: response.data.success,
          });
        }

        const { listView } = listViewOfChatStore.getState();
        listView();

        const { queryChat } = searchChats.getState();
        queryChat();
      } catch (err) {
        set({
          loading: false,
          success: false,
          error: true,
          message:
            err.response && err.response.data
              ? err.response.data.error
              : "Something went wrong.",
        });
      }
    },
  }))
);


export const paymentStore = create(
  devtools((set) => ({
    loading: false,
    success: false,
    error: false,
    message: [],

    payment: async (id) => {
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

        const response = await axios.get(
          `${baseUrl}/crud-genAi/get-detail-chat/${id}`,
          config
        );

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
          error: true,
          message:
            err.response && err.response.data
              ? err.response.data.error
              : "Something went wrong.",
        });
      }
    },
  }))
);