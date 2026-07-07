import React from 'react';
import { FiStar, FiUser } from 'react-icons/fi';

interface ReviewListProps {
  reviews: any[];
  isLoading?: boolean;
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  if (!reviews || reviews.length === 0) {
    return <div className="text-center py-8 text-gray-500">No reviews yet</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review: any) => (
        <div key={review._id} className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <FiUser />
            </div>
            <div>
              <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
              <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
              />
            ))}
          </div>

          <p className="text-gray-700 mb-3">{review.reviewText}</p>

          {review.ownerResponse && (
            <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
              <p className="text-sm font-semibold text-blue-900">Restaurant Response:</p>
              <p className="text-sm text-blue-800">{review.ownerResponse}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
