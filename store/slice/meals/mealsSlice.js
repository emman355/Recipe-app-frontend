import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mealsByName: [],
  randomMeals: [],
  selectedIngridient: null,
}

const mealSlice = createSlice({
  name: 'meals',
  initialState: {
    ...initialState
  },
  reducers: {
    searchMeal: (state, action) => {
      state.mealsByName = action.payload;
    },
    clearMealByName: (state) => {
      state.mealsByName = initialState.mealsByName;
    },

    setRandomMeals: (state, action) => {
      state.randomMeals = action.payload;
    },
    clearRandomMeals: (state) => {
      state.randomMeals = initialState.randomMeals;
    },

    setSelectedIngridient: (state, action) => {
      state.selectedIngridient = action.payload;
    },
    clearIngridient: (state) => {
      state.selectedIngridient = initialState.selectedIngridient;
    },
  },
});

export const { searchMeal,
  clearMealByName,
  setRandomMeals,
  clearRandomMeals,
  setSelectedIngridient,
  clearIngridient } = mealSlice.actions;
export default mealSlice.reducer;
