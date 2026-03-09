import { useState } from "react";
import StarRatingInput from "./StarRatingInput";
import { useSubmitRating } from "../hooks/useRatings";
import { X } from "lucide-react";

interface RatingFormModalProps {
 orderId: number;
 doctorName: string;
 hospitalName: string;
 onClose: () => void;
}

export default function RatingFormModal({
 orderId,
 doctorName,
 hospitalName,
 onClose,
}: RatingFormModalProps) {
 const [doctorRating, setDoctorRating] = useState(0);
 const [doctorReview, setDoctorReview] = useState("");
 const [hospitalRating, setHospitalRating] = useState(0);
 const [hospitalReview, setHospitalReview] = useState("");

 const { mutate: submitRating, isPending } = useSubmitRating();

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (doctorRating === 0 || hospitalRating === 0) {
   alert("Please provide both doctor and hospital ratings");
   return;
  }

  submitRating(
   {
    orderId,
    doctor_rating: doctorRating,
    doctor_review: doctorReview || undefined,
    hospital_rating: hospitalRating,
    hospital_review: hospitalReview || undefined,
   },
   {
    onSuccess: () => {
     alert("Rating submitted successfully!");
     onClose();
    },
    onError: (error: any) => {
     alert(error.response?.data?.message || "Failed to submit rating");
    },
   }
  );
 };

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
   <div className="w-full max-w-[640px] bg-white rounded-3xl p-6 max-h-[90vh] overflow-y-auto">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
     <h2 className="font-bold text-2xl">Rate Your Experience</h2>
     <button
      onClick={onClose}
      className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100"
     >
      <X className="size-6" />
     </button>
    </div>

    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
     {/* Doctor Rating */}
     <div className="flex flex-col gap-4 p-5 rounded-2xl border border-monday-stroke">
      <div className="flex items-center gap-3">
       <img
        src="/assets/images/icons/profile-circle-grey.svg"
        className="size-6"
        alt="doctor"
       />
       <h3 className="font-semibold text-lg">Rate Doctor</h3>
      </div>
      <p className="font-medium text-monday-gray">{doctorName}</p>

      <StarRatingInput
       value={doctorRating}
       onChange={setDoctorRating}
       size="lg"
      />

      <textarea
       value={doctorReview}
       onChange={(e) => setDoctorReview(e.target.value)}
       placeholder="Share your experience with this doctor (optional)"
       className="w-full p-4 border border-monday-stroke rounded-xl font-medium resize-none focus:outline-none focus:border-monday-blue"
       rows={3}
       maxLength={1000}
      />
     </div>

     {/* Hospital Rating */}
     <div className="flex flex-col gap-4 p-5 rounded-2xl border border-monday-stroke">
      <div className="flex items-center gap-3">
       <img
        src="/assets/images/icons/hospital-grey.svg"
        className="size-6"
        alt="hospital"
       />
       <h3 className="font-semibold text-lg">Rate Hospital</h3>
      </div>
      <p className="font-medium text-monday-gray">{hospitalName}</p>

      <StarRatingInput
       value={hospitalRating}
       onChange={setHospitalRating}
       size="lg"
      />

      <textarea
       value={hospitalReview}
       onChange={(e) => setHospitalReview(e.target.value)}
       placeholder="Share your experience with the hospital (optional)"
       className="w-full p-4 border border-monday-stroke rounded-xl font-medium resize-none focus:outline-none focus:border-monday-blue"
       rows={3}
       maxLength={1000}
      />
     </div>

     {/* Submit Button */}
     <button
      type="submit"
      disabled={isPending || doctorRating === 0 || hospitalRating === 0}
      className="w-full py-4 rounded-full bg-monday-blue text-white font-semibold text-lg disabled:bg-monday-stroke disabled:cursor-not-allowed hover:bg-monday-blue/90 transition-colors"
     >
      {isPending ? "Submitting..." : "Submit Rating"}
     </button>
    </form>
   </div>
  </div>
 );
}
