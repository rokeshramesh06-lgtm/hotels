import React from 'react';
import { useForm } from 'react-hook-form';

interface SearchFilterProps {
  onSearch: (filters: any) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      query: '',
      cuisine: '',
      minBudget: 0,
      maxBudget: 10000,
      isVegetarian: false,
      isOpen: false,
      isAC: false,
      isFamilyFriendly: false,
      topRated: false,
    },
  });

  const onSubmit = (data: any) => {
    onSearch(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-bold mb-4">Search & Filter</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search restaurant or food..."
          {...register('query')}
          className="input"
        />

        <select {...register('cuisine')} className="input">
          <option value="">All Cuisines</option>
          <option value="Chinese">Chinese</option>
          <option value="South Indian">South Indian</option>
          <option value="North Indian">North Indian</option>
          <option value="Continental">Continental</option>
        </select>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Price"
            {...register('minBudget')}
            className="input"
          />
          <input
            type="number"
            placeholder="Max Price"
            {...register('maxBudget')}
            className="input"
          />
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('isVegetarian')} className="w-4 h-4" />
          <span>Vegetarian Only</span>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('isOpen')} className="w-4 h-4" />
          <span>Open Now</span>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('isAC')} className="w-4 h-4" />
          <span>AC Available</span>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('isFamilyFriendly')} className="w-4 h-4" />
          <span>Family Friendly</span>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('topRated')} className="w-4 h-4" />
          <span>Top Rated</span>
        </label>
      </div>

      <button type="submit" className="btn-primary mt-4">
        Search
      </button>
    </form>
  );
};
