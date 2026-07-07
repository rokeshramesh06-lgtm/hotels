import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantService, reviewService, bookingService } from '../services/api';
import { ReviewList } from '../components/ReviewList';
import { FiStar, FiPhone, FiMapPin, FiClock, FiHeart } from 'react-icons/fi';

export const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    numberOfGuests: 2,
    bookingDate: '',
    bookingTime: '19:00',
  });

  useEffect(() => {
    if (id) {
      fetchRestaurantData();
    }
  }, [id]);

  const fetchRestaurantData = async () => {
    try {
      setIsLoading(true);
      const [restaurantRes, reviewsRes] = await Promise.all([
        restaurantService.getDetail(id!),
        reviewService.getRestaurantReviews(id!),
      ]);
      setRestaurant(restaurantRes.data);
      setReviews(reviewsRes.data.reviews);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookingService.createBooking({
        restaurantId: id,
        ...bookingData,
      });
      alert('Booking confirmed!');
      setShowBookingForm(false);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed');
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!restaurant) {
    return <div className="text-center py-12">Restaurant not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FiStar className="text-yellow-400" />
              <span>{restaurant.averageRating.toFixed(1)}</span>
              <span className="text-sm opacity-75">({restaurant.totalReviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Info Section */}
            <div className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 mb-4">{restaurant.description}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-blue-600" />
                  <span>{restaurant.location.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="text-blue-600" />
                  <span>{restaurant.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiClock className="text-blue-600" />
                  <span>
                    {restaurant.businessHours?.Monday?.open} - {restaurant.businessHours?.Monday?.close}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                {restaurant.isAC && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded">AC Available</span>
                )}
                {restaurant.isFamilyFriendly && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded">Family Friendly</span>
                )}
              </div>
            </div>

            {/* Cuisine & Menu Section */}
            <div className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">Cuisines</h2>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine?.map((c: string) => (
                  <span key={c} className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              <ReviewList reviews={reviews} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="card sticky top-4">
              <button className="btn-primary w-full mb-4">
                <FiHeart className="inline mr-2" /> Add to Favorites
              </button>

              <button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="btn-primary w-full"
              >
                Book a Table
              </button>

              {showBookingForm && (
                <form onSubmit={handleBooking} className="mt-4 space-y-3">
                  <input
                    type="date"
                    value={bookingData.bookingDate}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, bookingDate: e.target.value })
                    }
                    className="input text-sm"
                    required
                  />
                  <input
                    type="time"
                    value={bookingData.bookingTime}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, bookingTime: e.target.value })
                    }
                    className="input text-sm"
                    required
                  />
                  <input
                    type="number"
                    min="1"
                    value={bookingData.numberOfGuests}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        numberOfGuests: parseInt(e.target.value),
                      })
                    }
                    className="input text-sm"
                    required
                  />
                  <button type="submit" className="btn-primary w-full text-sm">
                    Confirm Booking
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
