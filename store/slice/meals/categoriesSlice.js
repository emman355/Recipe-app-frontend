import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryList: [],
  selectedCategory: null,
}

const categoriesSlice = createSlice({
  name: 'mealCategories',
  initialState,
  reducers: {
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    clearCategoryList: (state) => {
      state.categoryList = initialState.categoryList;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = initialState.selectedCategory;
    },
  },
});

export const { setSelectedCategory, clearSelectedCategory, setCategoryList, clearCategoryList } = categoriesSlice.actions;
export default categoriesSlice.reducer;
