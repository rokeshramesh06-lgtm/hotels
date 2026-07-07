import express, { Router } from 'express';
import {
  getUserProfile,
  updateUserProfile,
  addFavoriteRestaurant,
  removeFavoriteRestaurant,
  addFavoriteDish,
  removeFavoriteDish,
  getUserFavorites,
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router: Router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/favorites', authMiddleware, getUserFavorites);
router.post('/favorites/restaurant', authMiddleware, addFavoriteRestaurant);
router.delete('/favorites/restaurant/:restaurantId', authMiddleware, removeFavoriteRestaurant);
router.post('/favorites/dish', authMiddleware, addFavoriteDish);
router.delete('/favorites/dish/:foodId', authMiddleware, removeFavoriteDish);

export default router;
