import apiClient from "./axiosConfig";
import { User } from "../types/types";
import { AxiosError } from "axios"; 
import csrfClient from "./csrfClient";

export const authService = {
  fetchUser: async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get("/user");
      return { ...data, roles: data.roles ?? [] };  
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Error fetching user.");
      }
      throw new Error("Unexpected error. Please try again.");
    }
  },

  login: async (email: string, password: string): Promise<User> => {
    try { 
      console.log("🔵 Step 1: Request CSRF cookie...");
      console.log("📋 Cookies SEBELUM:", document.cookie);
      
      // Request CSRF cookie
      const csrfResponse = await csrfClient.get("/sanctum/csrf-cookie");
      console.log("✅ CSRF Response:", csrfResponse.status);
      
      // Tunggu cookie ter-set
      await new Promise(resolve => setTimeout(resolve, 200));
      
      console.log("📋 Cookies SESUDAH:", document.cookie);
      
      // Cek apakah XSRF-TOKEN ada
      const xsrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
      
      console.log("🔑 XSRF-TOKEN yang akan dikirim:", xsrfToken ? "ADA" : "TIDAK ADA");
      
      if (!xsrfToken) {
        throw new Error("XSRF-TOKEN tidak ditemukan di cookie!");
      }

      console.log("🔵 Step 2: Attempting login...");
      
      const { data } = await apiClient.post(
        "/login",
        { email, password },
      ); 
      
      console.log("✅ Login berhasil!");
      return { ...data.user, roles: data.user.roles ?? [] };
    } catch (error) {
      console.error("❌ Login error:", error);
      if (error instanceof AxiosError) {
        console.error("Response data:", error.response?.data);
        console.error("Response headers:", error.response?.headers);
        throw new Error(error.response?.data?.message || "Invalid credentials.");
      }
      throw new Error("Unexpected error. Please try again.");
    }
  }, 

  registerCustomer: async (formData: FormData) => {
    try {
      console.log("🔵 Register: Request CSRF cookie...");
      await csrfClient.get("/sanctum/csrf-cookie");
      await new Promise(resolve => setTimeout(resolve, 200));

      // Debug FormData sebelum kirim
      console.log("📤 Final check FormData:");
      formData.forEach((value, key) => {
        if (value instanceof File) {
          console.log(`  ${key}: File(${value.name}, ${value.type}, ${value.size} bytes)`);
        } else {
          console.log(`  ${key}:`, value);
        }
      });

      console.log("🔵 Sending register request...");
      
      // PENTING: Jangan set Content-Type manual, biarkan axios yang handle
      const response = await apiClient.post("/register", formData);
      
      console.log("✅ Register successful:", response.data);
      return response.data;
      
    } catch (error) {
      console.error("❌ Register failed:", error);
      
      if (error instanceof AxiosError) {
        console.error("Response status:", error.response?.status);
        console.error("Response data:", error.response?.data);
        console.error("Response headers:", error.response?.headers);
      }
      
      throw error;
    }
  },


  logout: async (): Promise<void> => {
    try {
      console.log("🔵 Logout: Calling backend...");
      await apiClient.post("/logout");
      console.log("✅ Logout berhasil");
    } catch (error) {
      console.error("❌ Logout error (ignored):", error);
    } finally {
      // Clear cookies manual
      console.log("🧹 Clearing cookies...");
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      console.log("📋 Cookies after clear:", document.cookie);
      
      // Force reload
      window.location.href = "/customer/login"; 
    }
  },
};