import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/axiosConfig";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../types/types";

interface SubmitRatingPayload {
 orderId: number;
 doctor_rating: number;
 doctor_review?: string;
 hospital_rating: number;
 hospital_review?: string;
}

export const useSubmitRating = () => {
 const queryClient = useQueryClient();

 return useMutation<any, AxiosError<ApiErrorResponse>, SubmitRatingPayload>({
  mutationFn: async ({ orderId, ...payload }) => {
   const response = await apiClient.post(
    `/my-orders/${orderId}/rating`,
    payload
   );
   return response.data;
  },
  onSuccess: (_, variables) => {
   queryClient.invalidateQueries({ queryKey: ["my-orders"] });
   queryClient.invalidateQueries({
    queryKey: ["my-order", variables.orderId],
   });
  },
  onError: (error) => {
   console.error("Rating submission error:", error);
  },
 });
};
