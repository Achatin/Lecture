import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { forwardRef, InputHTMLAttributes, useEffect, useState } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

type RatingLabels = {
  [key: number]: string;
};

const Rating = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const { value, ...valuelessProps } = props;

    // Load the input value from localStorage on component mount
    useEffect(() => {
      const savedValue = sessionStorage.getItem(props.name || "");
      if (savedValue !== null) {
        setRating(parseInt(savedValue));
      }
    }, [props.name]);

    const ratingLabels: RatingLabels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Excellent', // Fixed typo in 'Excellent'
    };

    const handleStarClick = (newRating: number) => {
      setRating(newRating);
      sessionStorage.setItem(props.name || "", newRating.toString());
    };

    return (
      <div className={cn('flex items-center space-x-0.5', className)}>
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
                type="radio"
                hidden
                value={starValue.toString()}
                checked={starValue === rating}
                ref={ref}
                {...valuelessProps}
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
);

export default Rating;
