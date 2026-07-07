import express, { Router } from 'express';
import {
  getMenu,
  addFoodItem,
  updateFoodItem,
  getFoodsByCategory,
  searchFoods,
} from '../controllers/menuController.js';
import { authMiddleware, restaurantOwnerMiddleware } from '../middleware/auth.js';

const router: Router = express.Router();

router.get('/:restaurantId', authMiddleware, getMenu);
router.get('/search/all', authMiddleware, searchFoods);
router.get('/:restaurantId/:category', authMiddleware, getFoodsByCategory);
router.post('/:restaurantId/food', authMiddleware, restaurantOwnerMiddleware, addFoodItem);
router.put('/food/:foodId', authMiddleware, updateFoodItem);

export default router;
