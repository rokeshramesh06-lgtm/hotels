import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import User from '../models/User.js';
import Favorite from '../models/Favorite.js';

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId)
      .populate('savedRestaurants')
      .populate('savedDishes')
      .populate('orderHistory')
      .populate('reviews');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, phone, profilePicture, location } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, profilePicture, location },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addFavoriteRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId } = req.body;

    const existing = await Favorite.findOne({ user: req.userId, restaurant: restaurantId });
    if (existing) {
      return res.status(400).json({ error: 'Already in favorites' });
    }

    const favorite = new Favorite({
      user: req.userId,
      restaurant: restaurantId,
    });

    await favorite.save();

    res.status(201).json({
      message: 'Restaurant added to favorites',
      favorite,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const removeFavoriteRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId } = req.params;

    await Favorite.deleteOne({
      user: req.userId,
      restaurant: restaurantId,
    });

    res.status(200).json({ message: 'Restaurant removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addFavoriteDish = async (req: AuthRequest, res: Response) => {
  try {
    const { foodId } = req.body;

    const existing = await Favorite.findOne({ user: req.userId, food: foodId });
    if (existing) {
      return res.status(400).json({ error: 'Already in favorites' });
    }

    const favorite = new Favorite({
      user: req.userId,
      food: foodId,
    });

    await favorite.save();

    res.status(201).json({
      message: 'Dish added to favorites',
      favorite,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const removeFavoriteDish = async (req: AuthRequest, res: Response) => {
  try {
    const { foodId } = req.params;

    await Favorite.deleteOne({
      user: req.userId,
      food: foodId,
    });

    res.status(200).json({ message: 'Dish removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUserFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const favorites = await Favorite.find({ user: req.userId })
      .populate('restaurant')
      .populate('food');

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
