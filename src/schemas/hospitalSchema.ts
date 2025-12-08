import { z } from "zod";

export const hospitalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  about: z.string().min(1, "About is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  post_code: z.string().min(1, "Post code is required"),
  phone: z.string().min(1, "Phone is required"),
  photo: z
    .custom<File>((file) => file instanceof File, "Photo is required")
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
      message: "Invalid file format (PNG or JPEG only)",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Image must be under 2MB",
    }),
});

export type HospitalFormData = z.infer<typeof hospitalSchema>;
