import React, { useState, useEffect } from 'react';
import { restaurantService } from '../services/api';
import { RestaurantCard } from '../components/RestaurantCard';
import { SearchFilter } from '../components/SearchFilter';
import { MapView } from '../components/MapView';
import { FiMapPin, FiLoader } from 'react-icons/fi';

export const HomePage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          fetchNearbyRestaurants(latitude, longitude);
        },
        (error) => {
          console.error('Location error:', error);
          // Default location (e.g., New York)
          const defaultLocation = { latitude: 40.7128, longitude: -74.006 };
          setUserLocation(defaultLocation);
          fetchNearbyRestaurants(defaultLocation.latitude, defaultLocation.longitude);
        }
      );
    }
  }, []);

  const fetchNearbyRestaurants = async (latitude: number, longitude: number, radius = 5) => {
    try {
      setIsLoading(true);
      const res = await restaurantService.getNearby(latitude, longitude, radius);
      setRestaurants(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError('Failed to load restaurants');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (filters: any) => {
    try {
      setIsLoading(true);
      const res = await restaurantService.search(filters.query, filters.cuisine);
      setRestaurants(res.data);
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopRated = async () => {
    try {
      setIsLoading(true);
      const res = await restaurantService.getTopRated();
      setRestaurants(res.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">🍽️ Find Your Perfect Meal</h1>
          <p className="text-lg opacity-90">Discover amazing restaurants and food near you</p>
        </div>
      </div>

      <div className="container py-8">
        {/* Location Info */}
        {userLocation && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center gap-2">
            <FiMapPin className="text-blue-600" />
            <span className="text-sm text-gray-700">
              Your Location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
            </span>
          </div>
        )}

        {/* Search & Filters */}
        <SearchFilter onSearch={handleSearch} />

        {/* Map View */}
        {userLocation && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Restaurants Near You</h2>
            <MapView {...userLocation} restaurants={restaurants} />
          </div>
        )}

        {/* Top Rated Button */}
        <div className="mb-6">
          <button onClick={handleTopRated} className="btn-secondary">
            Show Top Rated Restaurants
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <FiLoader className="animate-spin text-3xl text-blue-600" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Restaurants Grid */}
        {!isLoading && restaurants.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6">
              {restaurants.length} Restaurants Found
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant._id}
                  id={restaurant._id}
                  name={restaurant.name}
                  description={restaurant.description}
                  cuisine={restaurant.cuisine}
                  averageRating={restaurant.averageRating}
                  totalReviews={restaurant.totalReviews}
                  isAC={restaurant.isAC}
                  isFamilyFriendly={restaurant.isFamilyFriendly}
                  image={restaurant.restaurantImage}
                />
              ))}
            </div>
          </>
        )}

        {!isLoading && restaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No restaurants found. Try adjusting your filters!</p>
          </div>
        )}
      </div>
    </div>
  );
};
