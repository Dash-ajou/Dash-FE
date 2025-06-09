import axios, { AxiosResponse } from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Add request interceptor to include session ID in headers
apiClient.interceptors.request.use(
  (config) => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      config.headers["X-Session-ID"] = sessionId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // If this is a login response, save the session ID
    if (response.config.url === "/auth/login" && response.data.status === "SUCCESS") {
      const sessionId = response.data.data.session_id;
      if (sessionId) {
        localStorage.setItem("sessionId", sessionId);
      }
    }
    return response;
  },
  async (error) => {
    const rawData = error.response?.data || null;

    if (!rawData) {
      return Promise.reject(error);
    }

    try {
      const responseData = typeof rawData === "string" ? JSON.parse(rawData) : rawData;

      if (typeof responseData !== "object") {
        console.error("Parsed response is not a valid object:", responseData);
        return Promise.reject(error);
      }

      const { status, message } = responseData;
      console.log("Response Error Data:", { status, message });
    } catch (parseError) {
      console.error("Failed to parse response data:", rawData);
      return Promise.reject(parseError);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
