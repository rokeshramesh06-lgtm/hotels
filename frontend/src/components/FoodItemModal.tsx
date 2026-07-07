import React from 'react';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';

interface FoodItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export const FoodItemModal: React.FC<FoodItemModalProps> = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      category: 'Main Course',
      isVegetarian: false,
      price: 0,
      weight: '500g',
      servingSize: 'Medium',
      servesHowMany: 1,
    },
  });

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Food Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
          <input
            type="text"
            placeholder="Food Name"
            {...register('name')}
            className="input"
            required
          />

          <textarea
            placeholder="Description"
            {...register('description')}
            className="input"
            rows={2}
          />

          <select {...register('category')} className="input">
            <option value="Appetizers">Appetizers</option>
            <option value="Main Course">Main Course</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
          </select>

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('isVegetarian')} className="w-4 h-4" />
            <span>Vegetarian</span>
          </label>

          <input
            type="number"
            placeholder="Price"
            {...register('price')}
            className="input"
            required
          />

          <input
            type="text"
            placeholder="Weight (e.g., 500g)"
            {...register('weight')}
            className="input"
          />

          <select {...register('servingSize')} className="input">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <input
            type="number"
            placeholder="Serves How Many"
            {...register('servesHowMany')}
            className="input"
          />

          <button type="submit" className="btn-primary w-full" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
};
