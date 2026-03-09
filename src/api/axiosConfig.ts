import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    // JANGAN set Content-Type di sini untuk FormData
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Interceptor untuk handle XSRF token
apiClient.interceptors.request.use(
  (config) => {
    // Ambil XSRF-TOKEN dari cookie
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];
    
    if (token) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    
    // PENTING: Jika request body adalah FormData, hapus Content-Type
    // Biarkan browser yang set dengan boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      console.log("📤 Sending FormData, Content-Type removed (browser will set it)");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk auto-retry jika CSRF mismatch
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      console.log("⚠️ CSRF mismatch, refreshing token...");
      
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        });
        
        await new Promise(resolve => setTimeout(resolve, 200));
        
        console.log("✅ CSRF token refreshed, retrying...");
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("❌ Failed to refresh CSRF:", refreshError);
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;