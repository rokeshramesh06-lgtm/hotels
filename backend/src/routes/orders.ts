import express, { Router } from 'express';
import {
  createOrder,
  getUserOrders,
  getRestaurantOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { authMiddleware, restaurantOwnerMiddleware } from '../middleware/auth.js';

const router: Router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);
router.get('/restaurant/:restaurantId', authMiddleware, getRestaurantOrders);
router.put('/:orderId/status', authMiddleware, updateOrderStatus);

export default router;
