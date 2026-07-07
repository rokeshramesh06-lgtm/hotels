import express, { Router } from 'express';
import {
  createReview,
  getRestaurantReviews,
  getFoodReviews,
  respondToReview,
} from '../controllers/reviewController.js';
import { authMiddleware, restaurantOwnerMiddleware } from '../middleware/auth.js';

const router: Router = express.Router();

router.post('/', authMiddleware, createReview);
router.get('/restaurant/:restaurantId', authMiddleware, getRestaurantReviews);
router.get('/food/:foodId', authMiddleware, getFoodReviews);
router.put('/:reviewId/respond', authMiddleware, restaurantOwnerMiddleware, respondToReview);

export default router;
