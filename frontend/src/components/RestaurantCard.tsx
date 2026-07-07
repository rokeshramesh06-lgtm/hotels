import React from 'react';
import { FiMapPin, FiPhone, FiClock, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface RestaurantCardProps {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  averageRating: number;
  totalReviews: number;
  distance?: number;
  isAC: boolean;
  isFamilyFriendly: boolean;
  image?: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  description,
  cuisine,
  averageRating,
  totalReviews,
  distance,
  isAC,
  isFamilyFriendly,
  image,
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer">
        {image && (
          <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
        )}
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          {cuisine.map((c) => (
            <span key={c} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {c}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <FiStar className="text-yellow-500" />
            <span className="font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-sm text-gray-600">({totalReviews})</span>
          </div>
          {distance && <span className="text-sm text-gray-600">{distance.toFixed(1)} km</span>}
        </div>

        <div className="flex gap-2 flex-wrap">
          {isAC && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">AC</span>}
          {isFamilyFriendly && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Family Friendly</span>
          )}
        </div>
      </div>
    </Link>
  );
};
