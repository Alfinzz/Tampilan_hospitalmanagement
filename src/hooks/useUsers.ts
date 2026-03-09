import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/authService";
import { CustomerRegisterFormData } from "../schemas/customerSchema";

export const useRegisterCustomer = () => {
  return useMutation({
    mutationFn: async (data: CustomerRegisterFormData) => {
      console.log("🔍 Raw data received:", {
        ...data,
        password: "***hidden***",
        password_confirmation: "***hidden***",
        photo: data.photo instanceof File 
          ? `File(${data.photo.name}, type: ${data.photo.type}, size: ${data.photo.size})` 
          : typeof data.photo,
      });

      // Validasi photo terlebih dahulu
      if (!data.photo) {
        throw new Error("Photo field is required");
      }

      if (!(data.photo instanceof File)) {
        console.error("❌ Photo bukan File object:", typeof data.photo, data.photo);
        throw new Error("Photo must be a File object");
      }

      // Validasi file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(data.photo.type)) {
        throw new Error(`Invalid file type: ${data.photo.type}. Must be JPEG, JPG, or PNG.`);
      }

      // Validasi file size (max 2MB)
      const maxSize = 2 * 1024 * 1024;
      if (data.photo.size > maxSize) {
        throw new Error(`File too large: ${(data.photo.size / 1024 / 1024).toFixed(2)}MB. Maximum is 2MB.`);
      }

      console.log("✅ Photo validation passed:", {
        name: data.photo.name,
        type: data.photo.type,
        size: `${(data.photo.size / 1024).toFixed(2)} KB`,
      });

      // Convert ke FormData
      const formData = new FormData();
      
      formData.append("name", data.name.trim());
      formData.append("email", data.email.trim());
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirmation);
      formData.append("phone", data.phone.trim());
      formData.append("gender", data.gender.toLowerCase());
      
      // PENTING: Append photo dengan nama field "photo"
      formData.append("photo", data.photo, data.photo.name);
      
      // Debug: Verify FormData
      console.log("📤 FormData yang akan dikirim:");
      let hasPhoto = false;
      formData.forEach((value, key) => {
        if (key === 'photo') {
          hasPhoto = true;
          if (value instanceof File) {
            console.log(`  ✅ ${key}: File(${value.name}, ${value.type}, ${value.size} bytes)`);
          } else {
            console.log(`  ❌ ${key}: BUKAN FILE!`, typeof value, value);
          }
        } else if (key === 'password' || key === 'password_confirmation') {
          console.log(`  ${key}: ***hidden***`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      });
      
      if (!hasPhoto) {
        console.error("❌ Photo tidak ada di FormData!");
        throw new Error("Photo tidak berhasil ditambahkan ke FormData");
      }
      
      return authService.registerCustomer(formData);
    },
  });
};