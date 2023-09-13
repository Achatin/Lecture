import { Star } from 'lucide-react';
import { FC, useState } from 'react'

interface RatingProps {
  
}

const Rating: FC<RatingProps> = ({}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className='flex space-x-0.5'>
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
            <Star strokeWidth={1.5} className={`text-muted-foreground ${starValue <= hoveredRating || rating ? 'fill-primary text-primary' : ''}`} />
          </div>
        );
      })}
    </div>
  );
}

export default Rating