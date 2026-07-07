import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import Review from '../models/Review.js';
import Restaurant from '../models/Restaurant.js';
import Food from '../models/Food.js';

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId, foodId, rating, tasteRating, hygieneRating, freshnessRating, valueForMoneyRating, reviewText, images } = req.body;

    const review = new Review({
      user: req.userId,
      restaurant: restaurantId,
      food: foodId,
      rating,
      tasteRating,
      hygieneRating,
      freshnessRating,
      valueForMoneyRating,
      reviewText,
      images,
    });

    await review.save();

    // Update restaurant rating
    const allReviews = await Review.find({ restaurant: restaurantId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Restaurant.findByIdAndUpdate(restaurantId, {
      averageRating: avgRating,
      totalReviews: allReviews.length,
      $push: { reviews: review._id },
    });

    res.status(201).json({
      message: 'Review created successfully',
      review,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getRestaurantReviews = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const reviews = await Review.find({ restaurant: restaurantId })
      .populate('user', 'name profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string));

    const total = await Review.countDocuments({ restaurant: restaurantId });

    res.status(200).json({
      reviews,
      pagination: {
        total,
        page: parseInt(page as string),
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getFoodReviews = async (req: AuthRequest, res: Response) => {
  try {
    const { foodId } = req.params;

    const reviews = await Review.find({ food: foodId })
      .populate('user', 'name profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const respondToReview = async (req: AuthRequest, res: Response) => {
  try {
    const { reviewId } = req.params;
    const { response } = req.body;

    const review = await Review.findById(reviewId).populate('restaurant');

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if ((review.restaurant as any).owner.toString() !== req.userId && req.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    review.ownerResponse = response;
    review.isResponsed = true;
    await review.save();

    res.status(200).json({
      message: 'Response added successfully',
      review,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
