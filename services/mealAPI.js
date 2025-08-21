import Toast from "react-native-toast-message";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";


export const MealAPI = {
	// search meal by name
	searchMealByName: async (query) => {
		try {
			const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`)
			const data = await response.json();
			return data.meals || [];
		} catch (error) {
			Toast.show({
				type: "customError",
				text1: error?.errors?.[0]?.message || "Error searching meals by name",
			});
			return [];
		}
	},

	//Lookup Full meal details by id:
	getMealById: async (id) => {
		try {
			const response = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`)
			const data = await response.json();
			return data.meals ? data.meals[0] : null;
		} catch (error) {
			Toast.show({
				type: "customError",
				text1: error?.errors?.[0]?.message || "Error getting meal by id",
			});
			return null;
		}
	},

	//get a single random meal
	getRandomMeal: async () => {
		try {
			const response = await fetch(`${BASE_URL}/random.php`)
			const data = await response.json();
			return data.meals ? data.meals[0] : null;
		} catch (error) {
			Toast.show({
				type: "customError",
				text1: error?.errors?.[0]?.message || "Error getting random meal",
			});
			return null;
		}
	},

	//get multiple random meal
	getRandomMeals: async (count = 6) => {
		try {
			const promises = Array(count).fill().map(() => MealAPI.getRandomMeal())
			const meals = await Promise.all(promises)
			return meals.filter((meal) => meal !== null)
		} catch (error) {
			Toast.show({
				type: "customError",
				text1: error?.errors?.[0]?.message || "Error getting random meals",
			});
			return null;
		}
	},

	//get multiple random meal
	getCategories: async () => {
		try {
			const response = await fetch(`${BASE_URL}/categories.php`)
			const data = await response.json();
			return data.categories || [];
		} catch (error) {
			Toast.show({
				type: "customError",
				text1: error?.errors?.[0]?.message || "Error getting categories",
			});
			return null;
		}
	},
}