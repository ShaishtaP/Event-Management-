import axios from "axios";

// API configuration
const PRODUCTION_API_URL = "https://event-management-j4sd.onrender.com";

// Accepts VITE_API_URL with or without a trailing slash or "/api" suffix.
const resolveApiBaseUrl = (): string => {
  const configured =
    (import.meta.env.VITE_API_URL as string | undefined) ||
    (import.meta.env.PROD ? PRODUCTION_API_URL : "http://localhost:5000");
  const trimmed = configured.replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
};

const API_BASE_URL = resolveApiBaseUrl();

console.log('🔗 API Base URL:', API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout for slow Render cold starts
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true, // Enable credentials for CORS
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
    });

    // Handle authentication errors
    if (error.response?.status === 401) {
      console.log("🔒 Authentication error - clearing token");
      localStorage.removeItem("token");
      
      // Only redirect if user is on a protected route
      const protectedPaths = ["/admin", "/organizer", "/student"];
      if (protectedPaths.some(path => window.location.pathname.startsWith(path))) {
        window.location.href = "/login";
      }
    }

    // Handle CORS errors
    if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
      console.error("🌐 Network/CORS Error - Check if backend is running and CORS is configured");
      
      // Show user-friendly error
      const errorMessage = "Unable to connect to server. Please check your internet connection.";
      
      // You can dispatch this to your Redux store or show a toast notification
      // Example: dispatch(showError(errorMessage));
    }

    return Promise.reject(error);
  }
);

// Test connection function
export const testConnection = async () => {
  try {
    console.log("🧪 Testing API connection...");
    const response = await axiosInstance.get("/health");
    console.log("✅ API connection successful:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ API connection failed:", error.message);
    return { success: false, error: error.message };
  }
};

export default axiosInstance;