import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const refreshAccessToken = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo?.refeshtoken) return null;

    const response = await axios.post(`${baseUrl}/auth/refresh`, {
      refreshToken: userInfo.refeshtoken,
    });

    if (response.data && response.data.success) {
      const update = { ...userInfo, token: response.data.success };
      localStorage.setItem("userInfo", JSON.stringify(update));
      return response.data.success;
    }
    return null;
  } catch (err) {
    return null;
  }
};
