import React, { useState } from 'react';
import { menuService } from '../services/api';
import { FoodItemModal } from '../components/FoodItemModal';
import { FiPlus, FiEdit2 } from 'react-icons/fi';

export const OwnerDashboardPage: React.FC = () => {
  const [restaurants] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading] = useState(false);

  // const handleCreateRestaurant = async (restaurantData: any) => {
  //   try {
  //     await restaurantService.create(restaurantData);
  //     alert('Restaurant created successfully!');
  //     // Refresh list
  //   } catch (error) {
  //     console.error('Error creating restaurant:', error);
  //     alert('Failed to create restaurant');
  //   }
  // };

  const handleAddFood = async (foodData: any) => {
    try {
      if (!selectedRestaurant) return;
      await menuService.addFoodItem(selectedRestaurant, foodData);
      alert('Food item added successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding food:', error);
      alert('Failed to add food item');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container">
          <h1 className="text-4xl font-bold">Restaurant Owner Dashboard</h1>
          <p className="opacity-90">Manage your restaurants and menu</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats */}
          <div className="card">
            <h3 className="text-sm text-gray-600 mb-2">Total Restaurants</h3>
            <p className="text-3xl font-bold">1</p>
          </div>
          <div className="card">
            <h3 className="text-sm text-gray-600 mb-2">Total Menu Items</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="card">
            <h3 className="text-sm text-gray-600 mb-2">Pending Bookings</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="card">
            <h3 className="text-sm text-gray-600 mb-2">Average Rating</h3>
            <p className="text-3xl font-bold">0.0</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Restaurants</h2>
            <button className="btn-primary flex items-center gap-2">
              <FiPlus /> Add Restaurant
            </button>
          </div>

          {restaurants.length > 0 ? (
            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <div key={restaurant._id} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{restaurant.name}</h3>
                      <p className="text-sm text-gray-600">{restaurant.location.address}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedRestaurant(restaurant._id);
                          setIsModalOpen(true);
                        }}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <FiPlus /> Add Food
                      </button>
                      <button className="btn-secondary flex items-center gap-2">
                        <FiEdit2 /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-600">No restaurants yet. Create your first restaurant!</p>
            </div>
          )}
        </div>
      </div>

      <FoodItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFood}
        isLoading={isLoading}
      />
    </div>
  );
};
