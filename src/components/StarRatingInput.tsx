import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingInputProps {
 value: number;
 onChange: (rating: number) => void;
 size?: "sm" | "md" | "lg";
}

export default function StarRatingInput({
 value,
 onChange,
 size = "lg",
}: StarRatingInputProps) {
 const [hoverRating, setHoverRating] = useState(0);

 const sizeClasses = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10",
 };

 const displayRating = hoverRating || value;

 return (
  <div className="flex items-center gap-2">
   {[1, 2, 3, 4, 5].map((star) => (
    <button
     key={star}
     type="button"
     onClick={() => onChange(star)}
     onMouseEnter={() => setHoverRating(star)}
     onMouseLeave={() => setHoverRating(0)}
     className="transition-transform hover:scale-110"
    >
     <Star
      className={`${sizeClasses[size]} ${star <= displayRating
        ? "fill-monday-orange text-monday-orange"
        : "text-gray-300"
       } transition-colors`}
     />
    </button>
   ))}
  </div>
 );
}
