import { useAuth } from "@clerk/clerk-expo";
import { useLazyFilterBycategoryQuery, useLazyGetCategoriesQuery, useLazyGetRandomMealQuery, useLazyGetRandomMealsQuery } from "../store/api/mealAPI";
import { useState } from "react";
import { sleep, transformMealData } from "../utils/helper";
import Toast from 'react-native-toast-message';

export const useCategoryService = () => {
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const { isSignedIn } = useAuth();
  const [reqCategories] = useLazyGetCategoriesQuery();
  const [reqSelectedCategory] = useLazyFilterBycategoryQuery();
  const [reqRandomMeal] = useLazyGetRandomMealQuery()
  const [reqRandomMeals] = useLazyGetRandomMealsQuery()


  const loadData = async () => {
    if (!isSignedIn) return;
    try {
      setLoading(true);

      const [apiCategories, featuredMeal] = await Promise.all([
        reqCategories(),
        reqRandomMeals(20),
        reqRandomMeal(),
      ]);

      const transformedCategories = apiCategories.data.map((cat, index) => ({
        id: index + 1,
        name: cat.strCategory,
        image: cat.strCategoryThumb,
        description: cat.strCategoryDescription,
      }));

      setCategories(transformedCategories);

      const meals = await reqSelectedCategory(selectedCategory);
      const transformedMeals = meals.data
        .map((meal) => transformMealData(meal))
        .filter((meal) => meal !== null);
      setRecipes(transformedMeals);

      setFeaturedRecipe(featuredMeal.data[0]);
    } catch (error) {
      // handle error
      Toast.show({
        type: "customError",
        text1: error?.error?.message || `Error loading the data: ${error}`,
        visibilityTime: 3000,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async (category) => {
    try {
      const meals = await reqSelectedCategory(category);
      const transformedMeals = meals.data
        .map((meal) => transformMealData(meal))
        .filter((meal) => meal !== null);
      setRecipes(transformedMeals);
    } catch (error) {
      Toast.show({
        type: "customError",
        text1: error?.error?.message || `Error loading category data: ${error}`,
        visibilityTime: 3000,
        position: "top",
      });
      setRecipes([]);
    }
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    await loadCategoryData(category);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await sleep(2000);
    await loadData();
    setRefreshing(false);
  };


  return {
    selectedCategory,
    recipes,
    categories,
    featuredRecipe,
    loading,
    refreshing,
    loadData,
    handleCategorySelect,
    onRefresh,
    loadCategoryData,
  };
};