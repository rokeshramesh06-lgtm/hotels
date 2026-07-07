import React, { useState, useEffect } from 'react';
import { userService, bookingService, orderService } from '../services/api';
import { FiUser, FiHeart, FiShoppingBag, FiCalendar } from 'react-icons/fi';

export const UserProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const [profileRes, bookingsRes, ordersRes, favoritesRes] = await Promise.all([
        userService.getProfile(),
        bookingService.getUserBookings(),
        orderService.getUserOrders(),
        userService.getFavorites(),
      ]);
      setProfile(profileRes.data);
      setBookings(bookingsRes.data);
      setOrders(ordersRes.data);
      setFavorites(favoritesRes.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container">
          <h1 className="text-4xl font-bold">Your Profile</h1>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Info Card */}
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FiUser size={40} />
              </div>
              <h2 className="text-2xl font-bold">{profile?.name}</h2>
              <p className="text-gray-600">{profile?.email}</p>
              <p className="text-sm text-gray-500 mt-2">Role: {profile?.role}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="lg:col-span-3">
            <div className="flex gap-4 mb-6 border-b">
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-2 px-4 font-semibold ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`pb-2 px-4 font-semibold flex items-center gap-2 ${
                  activeTab === 'bookings'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <FiCalendar /> Bookings ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-2 px-4 font-semibold flex items-center gap-2 ${
                  activeTab === 'orders'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <FiShoppingBag /> Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`pb-2 px-4 font-semibold flex items-center gap-2 ${
                  activeTab === 'favorites'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <FiHeart /> Favorites ({favorites.length})
              </button>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="font-semibold">{profile?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="font-semibold">{profile?.phone}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div key={booking._id} className="card">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{booking.restaurant?.name}</h3>
                          <p className="text-sm text-gray-600">
                            📅 {new Date(booking.bookingDate).toLocaleDateString()} at {booking.bookingTime}
                          </p>
                          <p className="text-sm text-gray-600">👥 {booking.numberOfGuests} guests</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No bookings yet</p>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order._id} className="card">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold">{order.restaurant?.name}</h3>
                          <p className="text-sm text-gray-600">
                            ₹{(order.totalAmount + order.tax + order.deliveryCharge).toFixed(2)}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold ${
                            order.status === 'delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No orders yet</p>
                )}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="space-y-4">
                {favorites.length > 0 ? (
                  favorites.map((fav) => (
                    <div key={fav._id} className="card">
                      {fav.restaurant && (
                        <div>
                          <h3 className="font-bold">{fav.restaurant.name}</h3>
                          <p className="text-sm text-gray-600">{fav.restaurant.location.address}</p>
                        </div>
                      )}
                      {fav.food && (
                        <div>
                          <h3 className="font-bold">{fav.food.name}</h3>
                          <p className="text-sm text-gray-600">₹{fav.food.price}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No favorites yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
