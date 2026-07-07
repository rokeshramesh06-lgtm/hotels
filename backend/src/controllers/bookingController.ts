import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import Booking from '../models/Booking.js';
import Restaurant from '../models/Restaurant.js';

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId, bookingDate, numberOfGuests, bookingTime, specialRequests } = req.body;

    const booking = new Booking({
      user: req.userId,
      restaurant: restaurantId,
      bookingDate: new Date(bookingDate),
      numberOfGuests,
      bookingTime,
      specialRequests,
    });

    await booking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUserBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .populate('restaurant', 'name location phoneNumber')
      .sort({ bookingDate: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getRestaurantBookings = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.userId && req.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const bookings = await Booking.find({ restaurant: restaurantId })
      .populate('user', 'name phone')
      .sort({ bookingDate: 1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      message: 'Booking status updated',
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.user.toString() !== req.userId && req.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
