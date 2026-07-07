import express, { Router } from 'express';
import {
  createBooking,
  getUserBookings,
  getRestaurantBookings,
  updateBookingStatus,
  cancelBooking,
} from '../controllers/bookingController.js';
import { authMiddleware, restaurantOwnerMiddleware } from '../middleware/auth.js';

const router: Router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/', authMiddleware, getUserBookings);
router.get('/restaurant/:restaurantId', authMiddleware, getRestaurantBookings);
router.put('/:bookingId/status', authMiddleware, updateBookingStatus);
router.put('/:bookingId/cancel', authMiddleware, cancelBooking);

export default router;
