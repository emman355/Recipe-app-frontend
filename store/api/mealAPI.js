import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { searchMeal } from '../slice/meals/mealsSlice'
import Toast from 'react-native-toast-message';
import { setCategoryList } from '../slice/meals/categoriesSlice';
import { transformMealData } from '../../utils/helper'

const BASE_URL = "https://www.themealdb.com/api/json/v1/1"


export const mealApi = createApi({
	reducerPath: 'mealsReducer',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: (builder) => ({
		// search meal by name
		searchMealByName: builder.query({
			query: (term) => `search.php?s=${encodeURIComponent(term)}`,
			transformResponse: (res) => res?.meals.map(transformMealData).filter(Boolean) || [],
			async onQueryStarted(term, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(searchMeal(data)); // ✅ directly put data in Redux
				} catch (err) {
					// handle error
					Toast.show({
						type: "customError",
						text1: err?.error?.message || "Failed to get meals",
						visibilityTime: 3000, // milliseconds before auto-dismiss (default is 4000)
						position: "top",
					});
				}
			},
		}),

		//Lookup Full meal details by id
		getMealById: builder.query({
			query: (id) => `lookup.php?i=${encodeURIComponent(id)}`,
			transformResponse: (res) => res?.meals?.[0] ? transformMealData(res.meals[0]) : null,
			async onQueryStarted(id, { queryFulfilled }) {
				try {
					await queryFulfilled;
				} catch (error) {
					// handle error
					Toast.show({
						type: "customError",
						text1: error?.error?.message || "Error getting meal by id",
						visibilityTime: 3000,
						position: "top",
					});
				}
			},
		}),


		//Get a single random meal
		getRandomMeal: builder.query({
			query: () => `random.php`,
			transformResponse: (res) =>
				res?.meals?.[0] ? transformMealData(res.meals[0]) : null,
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
				} catch (error) {
					// handle error
					Toast.show({
						type: "customError",
						text1: error?.error?.message || "Error random meal",
						visibilityTime: 3000,
						position: "top",
					});
				}
			},
		}),

		// 👇 Multiple random meals
		getRandomMeals: builder.query({
			async queryFn(count = 6, _queryApi, _extraOptions, fetchWithBQ) {
				try {
					const requests = Array.from({ length: count }, () =>
						fetchWithBQ('random.php')
					);

					const responses = await Promise.all(requests);

					const meals = responses
						.map((res) => (res.data?.meals ? transformMealData(res.data.meals[0]) : null))
						.filter((meal) => meal !== null);

					return { data: meals };
				} catch (error) {
					Toast.show({
						type: 'customError',
						text1:
							error?.error?.message || 'Error getting random meals',
						visibilityTime: 3000,
						position: 'top',
					});
					return { error };
				}
			},
		}),

		// Get Categories
		getCategories: builder.query({
			query: () => 'categories.php',
			transformResponse: (res) => res?.categories || null,
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setCategoryList(data));
				} catch (error) {
					// handle error
					Toast.show({
						type: 'customError',
						text1: error?.error?.message || 'Error getting categories',
						visibilityTime: 3000,
						position: 'top',
					});
				}
			},
		}),

		// filterByIngredient
		filterByIngredient: builder.query({
			query: (term) => `filter.php?i=${encodeURIComponent(term)}`,
			transformResponse: (res) => res?.meals || [],
			async onQueryStarted(term, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(searchMeal(data)); // ✅ directly put data in Redux
				} catch (err) {
					// handle error
					Toast.show({
						type: "customError",
						text1: err?.error?.message || "Failed to get meals by ingridient",
						visibilityTime: 3000, // milliseconds before auto-dismiss (default is 4000)
						position: "top",
					});
				}
			},
		}),

		// filterByIngredient
		filterBycategory: builder.query({
			query: (category) => `filter.php?c=${encodeURIComponent(category)}`,
			transformResponse: (res) => res?.meals || [],
			async onQueryStarted(term, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setCategoryList(data));
				} catch (err) {
					// handle error
					Toast.show({
						type: "customError",
						text1: err?.error?.message || "Failed to get meals by category",
						visibilityTime: 3000, // milliseconds before auto-dismiss (default is 4000)
						position: "top",
					});
				}
			},
		}),
	}),
});

export const {
	useLazySearchMealByNameQuery,
	useLazyGetMealByIdQuery,
	useLazyGetRandomMealQuery,
	useLazyGetRandomMealsQuery,
	useLazyGetCategoriesQuery,
	useLazyFilterBycategoryQuery,
	useLazyFilterByIngredientQuery,
} = mealApi;