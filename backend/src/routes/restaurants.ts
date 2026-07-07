import express, { Router } from 'express';
import {
  getNearbyRestaurants,
  searchRestaurants,
  getRestaurantDetail,
  createRestaurant,
  updateRestaurant,
  getTopRatedRestaurants,
} from '../controllers/restaurantController.js';
import { authMiddleware, restaurantOwnerMiddleware } from '../middleware/auth.js';

const router: Router = express.Router();

router.get('/nearby', authMiddleware, getNearbyRestaurants);
router.get('/search', authMiddleware, searchRestaurants);
router.get('/top-rated', authMiddleware, getTopRatedRestaurants);
router.get('/:id', authMiddleware, getRestaurantDetail);
router.post('/', authMiddleware, restaurantOwnerMiddleware, createRestaurant);
router.put('/:id', authMiddleware, updateRestaurant);

export default router;
