import { Star } from "lucide-react";

interface RatingStarsProps {
 rating: number;
 size?: "sm" | "md" | "lg";
 showValue?: boolean;
 totalReviews?: number;
}

export default function RatingStars({
 rating,
 size = "md",
 showValue = true,
 totalReviews,
}: RatingStarsProps) {
 const sizeClasses = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
 };

 const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
 };

 const roundedRating = Math.round(rating * 10) / 10;

 return (
  <div className="flex items-center gap-1">
   {[1, 2, 3, 4, 5].map((star) => (
    <Star
     key={star}
     className={`${sizeClasses[size]} ${star <= roundedRating
       ? "fill-monday-orange text-monday-orange"
       : "text-gray-300"
      }`}
    />
   ))}
   {showValue && (
    <span className={`font-semibold ${textSizeClasses[size]} ml-1`}>
     {roundedRating.toFixed(1)}
    </span>
   )}
   {totalReviews !== undefined && totalReviews > 0 && (
    <span className={`text-monday-gray ${textSizeClasses[size]}`}>
     ({totalReviews})
    </span>
   )}
  </div>
 );
}
