import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import Restaurant from '../models/Restaurant.js';
import Menu from '../models/Menu.js';

export const getNearbyRestaurants = async (req: AuthRequest, res: Response) => {
  try {
    const { latitude, longitude, radius = 5 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude as string), parseFloat(latitude as string)],
          },
          $maxDistance: parseInt(radius as string) * 1000,
        },
      },
      isActive: true,
    })
      .populate('reviews')
      .limit(20);

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const searchRestaurants = async (req: AuthRequest, res: Response) => {
  try {
    const { query, cuisine, minBudget, maxBudget } = req.query;

    let filter: any = { isActive: true };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }

    if (cuisine) {
      filter.cuisine = { $in: (cuisine as string).split(',') };
    }

    const restaurants = await Restaurant.find(filter).populate('reviews');

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getRestaurantDetail = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id)
      .populate('menu')
      .populate('reviews')
      .populate('offers');

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, location, cuisine, phoneNumber, businessHours, isAC, isFamilyFriendly } = req.body;

    const restaurant = new Restaurant({
      name,
      description,
      owner: req.userId,
      location,
      cuisine,
      phoneNumber,
      businessHours,
      isAC,
      isFamilyFriendly,
    });

    await restaurant.save();

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.userId && req.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    Object.assign(restaurant, updates);
    await restaurant.save();

    res.status(200).json({
      message: 'Restaurant updated successfully',
      restaurant,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTopRatedRestaurants = async (req: AuthRequest, res: Response) => {
  try {
    const restaurants = await Restaurant.find({ isActive: true })
      .sort({ averageRating: -1 })
      .limit(10)
      .populate('reviews');

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
