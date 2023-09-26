"use client"

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { FC, useState } from "react";


type RatingLabels = {
  [key: number]: string;
};

interface RatingProps {
  className?: string,
  onRatingSelect: (rating: number) => void,
}

const Rating: FC<RatingProps> = ({ className, onRatingSelect }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const ratingLabels: RatingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
  };

  const handleStarClick = (newRating: number) => {
    setRating(newRating);
    onRatingSelect(newRating);
  };

  return (
    <div className={cn('relative flex items-center space-x-0.5', className)}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <div
            key={index}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => setHoveredRating(starValue)}
            onMouseLeave={() => setHoveredRating(0)}
            className='cursor-pointer'
          >
            <input
              hidden
              type="radio"
              value={starValue.toString()}
              defaultChecked={starValue === rating}
            />
            <Star
              strokeWidth={1.5}
              className={`text-muted-foreground ${starValue <= rating
                ? 'fill-primary text-primary'
                : ''} ${starValue <= hoveredRating
                ? 'fill-primary text-primary'
                : ''}`}
            />
          </div>
        );
      })}
      <p className={`${rating === hoveredRating || (hoveredRating === 0 && rating)
        ? 'text-primary'
        : 'text-muted-foreground'} pl-3`}>
        {ratingLabels[hoveredRating] || ratingLabels[rating] || ''}
      </p>
    </div>
  );
}

export default Rating;
