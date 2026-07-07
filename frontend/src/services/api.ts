import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  verifyToken: () => api.get('/auth/verify'),
};

// Restaurant Services
export const restaurantService = {
  getNearby: (latitude: number, longitude: number, radius?: number) =>
    api.get('/restaurants/nearby', { params: { latitude, longitude, radius } }),
  search: (query: string, cuisine?: string, minBudget?: number, maxBudget?: number) =>
    api.get('/restaurants/search', { params: { query, cuisine, minBudget, maxBudget } }),
  getTopRated: () => api.get('/restaurants/top-rated'),
  getDetail: (id: string) => api.get(`/restaurants/${id}`),
  create: (data: any) => api.post('/restaurants', data),
  update: (id: string, data: any) => api.put(`/restaurants/${id}`, data),
};

// Menu Services
export const menuService = {
  getMenu: (restaurantId: string) => api.get(`/menu/${restaurantId}`),
  getFoodsByCategory: (restaurantId: string, category: string) =>
    api.get(`/menu/${restaurantId}/${category}`),
  searchFoods: (query: string, isVegetarian?: boolean) =>
    api.get('/menu/search/all', { params: { query, isVegetarian } }),
  addFoodItem: (restaurantId: string, data: any) =>
    api.post(`/menu/${restaurantId}/food`, data),
  updateFoodItem: (foodId: string, data: any) =>
    api.put(`/menu/food/${foodId}`, data),
};

// Review Services
export const reviewService = {
  createReview: (data: any) => api.post('/reviews', data),
  getRestaurantReviews: (restaurantId: string, page?: number, limit?: number) =>
    api.get(`/reviews/restaurant/${restaurantId}`, { params: { page, limit } }),
  getFoodReviews: (foodId: string) => api.get(`/reviews/food/${foodId}`),
  respondToReview: (reviewId: string, response: string) =>
    api.put(`/reviews/${reviewId}/respond`, { response }),
};

// Booking Services
export const bookingService = {
  createBooking: (data: any) => api.post('/bookings', data),
  getUserBookings: () => api.get('/bookings'),
  getRestaurantBookings: (restaurantId: string) =>
    api.get(`/bookings/restaurant/${restaurantId}`),
  updateBookingStatus: (bookingId: string, status: string) =>
    api.put(`/bookings/${bookingId}/status`, { status }),
  cancelBooking: (bookingId: string) => api.put(`/bookings/${bookingId}/cancel`),
};

// Order Services
export const orderService = {
  createOrder: (data: any) => api.post('/orders', data),
  getUserOrders: () => api.get('/orders'),
  getRestaurantOrders: (restaurantId: string) =>
    api.get(`/orders/restaurant/${restaurantId}`),
  updateOrderStatus: (orderId: string, status: string) =>
    api.put(`/orders/${orderId}/status`, { status }),
};

// User Services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  getFavorites: () => api.get('/users/favorites'),
  addFavoriteRestaurant: (restaurantId: string) =>
    api.post('/users/favorites/restaurant', { restaurantId }),
  removeFavoriteRestaurant: (restaurantId: string) =>
    api.delete(`/users/favorites/restaurant/${restaurantId}`),
  addFavoriteDish: (foodId: string) =>
    api.post('/users/favorites/dish', { foodId }),
  removeFavoriteDish: (foodId: string) =>
    api.delete(`/users/favorites/dish/${foodId}`),
};

export default api;
