import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import Order from '../models/Order.js';
import Food from '../models/Food.js';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId, items, orderType, deliveryAddress } = req.body;

    let totalAmount = 0;
    let tax = 0;

    for (const item of items) {
      const food = await Food.findById(item.food);
      if (!food) {
        return res.status(404).json({ error: `Food item ${item.food} not found` });
      }

      totalAmount += food.price * item.quantity;
      if (food.tax) {
        tax += (food.price * food.tax * item.quantity) / 100;
      }
    }

    const order = new Order({
      user: req.userId,
      restaurant: restaurantId,
      items,
      totalAmount,
      tax,
      deliveryCharge: orderType === 'delivery' ? 30 : 0,
      orderType,
      deliveryAddress,
      estimatedTime: 45,
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('restaurant', 'name location')
      .populate('items.food', 'name price')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getRestaurantOrders = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId } = req.params;

    const orders = await Order.find({ restaurant: restaurantId })
      .populate('user', 'name phone')
      .populate('items.food', 'name price')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: 'Order status updated',
      order,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
