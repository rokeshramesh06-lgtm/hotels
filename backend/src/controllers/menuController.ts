import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import Food from '../models/Food.js';
import Menu from '../models/Menu.js';
import Restaurant from '../models/Restaurant.js';

export const getMenu = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId } = req.params;

    const menu = await Menu.findOne({ restaurant: restaurantId })
      .populate({
        path: 'foods',
        populate: { path: 'restaurant' },
      });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addFoodItem = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const { name, category, isVegetarian, price, description, images, weight, servingSize, servesHowMany } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.userId && req.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    let menu = await Menu.findOne({ restaurant: restaurantId });
    if (!menu) {
      menu = new Menu({
        name: `${restaurant.name} Menu`,
        restaurant: restaurantId,
        categories: [],
      });
      await menu.save();
      restaurant.menu.push(menu._id);
      await restaurant.save();
    }

    const food = new Food({
      name,
      description,
      restaurant: restaurantId,
      menu: menu._id,
      category,
      isVegetarian,
      price,
      images,
      weight,
      servingSize,
      servesHowMany,
    });

    await food.save();
    menu.foods.push(food._id);
    await menu.save();

    res.status(201).json({
      message: 'Food item added successfully',
      food,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateFoodItem = async (req: AuthRequest, res: Response) => {
  try {
    const { foodId } = req.params;
    const updates = req.body;

    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const restaurant = await Restaurant.findById(food.restaurant);
    if (restaurant?.owner.toString() !== req.userId && req.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    Object.assign(food, updates);
    await food.save();

    res.status(200).json({
      message: 'Food item updated successfully',
      food,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getFoodsByCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId, category } = req.params;

    const foods = await Food.find({
      restaurant: restaurantId,
      category,
      isAvailable: true,
    });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const searchFoods = async (req: AuthRequest, res: Response) => {
  try {
    const { query, isVegetarian } = req.query;

    let filter: any = { isAvailable: true };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }

    if (isVegetarian !== undefined) {
      filter.isVegetarian = isVegetarian === 'true';
    }

    const foods = await Food.find(filter).populate('restaurant').limit(20);

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
