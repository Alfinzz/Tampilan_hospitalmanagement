import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "../api/axiosConfig";
import { BookingTransaction, ApiErrorResponse } from "../types/types";

export interface DoctorProfile {
 id: number;
 name: string;
 photo: string;
 about: string;
 yoe: number;
 gender: string;
 specialist: {
  id: number;
  name: string;
  price: number;
 };
 hospital: {
  id: number;
  name: string;
  city: string;
  post_code: string;
  photo: string;
 };
 total_appointments: number;
 pending_appointments: number;
 completed_appointments: number;
 approved_appointments: number;
}

export interface DoctorStatistics {
 total_appointments: number;
 pending_appointments: number;
 approved_appointments: number;
 completed_appointments: number;
 rejected_appointments: number;
 total_earnings: number;
 today_appointments: number;
}

export const useDoctorProfile = () => {
 return useQuery<DoctorProfile, AxiosError<ApiErrorResponse>>({
  queryKey: ["doctor-profile"],
  queryFn: async () => {
   const response = await apiClient.get("/doctor/profile");
   return response.data;
  },
 });
};

export const useDoctorStatistics = () => {
 return useQuery<DoctorStatistics, AxiosError<ApiErrorResponse>>({
  queryKey: ["doctor-statistics"],
  queryFn: async () => {
   const response = await apiClient.get("/doctor/statistics");
   return response.data;
  },
 });
};

export const useDoctorAppointments = (status?: string) => {
 return useQuery<BookingTransaction[], AxiosError<ApiErrorResponse>>({
  queryKey: ["doctor-appointments", status],
  queryFn: async () => {
   const params = status && status !== "all" ? `?status=${status}` : "";
   const response = await apiClient.get(`/doctor/appointments${params}`);
   return response.data;
  },
 });
};

export const useDoctorAppointmentDetails = (id: number) => {
 return useQuery<BookingTransaction, AxiosError<ApiErrorResponse>>({
  queryKey: ["doctor-appointment", id],
  queryFn: async () => {
   const response = await apiClient.get(`/doctor/appointments/${id}`);
   return response.data;
  },
  enabled: !!id,
 });
};

export const useUpdateAppointmentStatus = () => {
 const queryClient = useQueryClient();

 return useMutation<
  { message: string; appointment: BookingTransaction },
  AxiosError<ApiErrorResponse>,
  { id: number; status: "Approved" | "Rejected" | "Completed" }
 >({
  mutationFn: async ({ id, status }) => {
   const response = await apiClient.patch(`/doctor/appointments/${id}/status`, {
    status,
   });
   return response.data;
  },
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
   queryClient.invalidateQueries({ queryKey: ["doctor-appointment"] });
   queryClient.invalidateQueries({ queryKey: ["doctor-profile"] });
   queryClient.invalidateQueries({ queryKey: ["doctor-statistics"] });
  },
 });
};

export const useUpdateDoctorProfile = () => {
 const queryClient = useQueryClient();

 return useMutation<
  { message: string; doctor: Partial<DoctorProfile> },
  AxiosError<ApiErrorResponse>,
  FormData
 >({
  mutationFn: async (formData) => {
   const response = await apiClient.post("/doctor/profile", formData, {
    headers: {
     "Content-Type": "multipart/form-data",
    },
   });
   return response.data;
  },
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["doctor-profile"] });
  },
 });
};

