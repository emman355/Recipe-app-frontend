// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import mealsReducer from './slice/meals/mealsSlice';
import categoriesReducer from './slice/meals/categoriesSlice';
import { mealApi } from './api/mealAPI';

const rootReducer = combineReducers({
    meals: mealsReducer,
    categories: categoriesReducer,
    [mealApi.reducerPath]: mealApi.reducer, // RTK Query
});

export default rootReducer;