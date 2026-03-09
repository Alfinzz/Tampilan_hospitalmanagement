import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";

export interface TreatmentReport {
 id: number;
 booking_transaction_id: number;
 diagnosis: string;
 prescription: string | null;
 doctor_notes: string | null;
 next_visit_date: string | null;
 attachments: Array<{
  name: string;
  path: string;
  size: number;
 }> | null;
 created_at: string;
 updated_at: string;
}

export interface TreatmentReportInput {
 diagnosis: string;
 prescription?: string;
 doctor_notes?: string;
 next_visit_date?: string;
}

// Hook for doctor to submit treatment report
export const useSubmitTreatmentReport = () => {
 const queryClient = useQueryClient();

 return useMutation({
  mutationFn: async ({ appointmentId, data }: { appointmentId: number; data: TreatmentReportInput }) => {
   const response = await apiClient.post(`/doctor/appointments/${appointmentId}/treatment-report`, data);
   return response.data;
  },
  onSuccess: (_, variables) => {
   queryClient.invalidateQueries({ queryKey: ["doctorAppointments"] });
   queryClient.invalidateQueries({ queryKey: ["treatmentReport", "doctor", variables.appointmentId] });
  },
 });
};

// Hook for doctor to get treatment report
export const useDoctorTreatmentReport = (appointmentId: number) => {
 return useQuery<TreatmentReport>({
  queryKey: ["treatmentReport", "doctor", appointmentId],
  queryFn: async () => {
   const response = await apiClient.get(`/doctor/appointments/${appointmentId}/treatment-report`);
   return response.data.data;
  },
  enabled: !!appointmentId,
  retry: false,
 });
};

// Hook for customer to get treatment report
export const useCustomerTreatmentReport = (orderId: number) => {
 return useQuery<TreatmentReport | null>({
  queryKey: ["treatmentReport", "customer", orderId],
  queryFn: async () => {
   const response = await apiClient.get(`/my-orders/${orderId}/treatment-report`);
   return response.data.data;
  },
  enabled: !!orderId,
  retry: false,
 });
};
