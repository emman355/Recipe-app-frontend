import { useSelector } from 'react-redux';
import { useGetCategoriesQuery, useSearchMealByNameQuery } from '../store/api/mealAPI';
import { useAuth } from '@clerk/clerk-expo';

export const useMeals = (searchTerm = 'Chicken') => {
    return {
    };
};
