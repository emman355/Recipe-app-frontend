export const transformMealData = (meal) => {
	console.log(meal, "meal")
	if (!meal) return null;

	const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		const ingredient = meal[`strIngredient${i}`];
		const measure = meal[`strMeasure${i}`];
		if (ingredient && ingredient.trim()) {
			const measureText = measure && measure.trim() ? `${measure.trim()} ` : "";
			ingredients.push(`${measureText}${ingredient.trim()}`);
		}
	}

	const instructions = meal.strInstructions
		? meal.strInstructions.split(/\r?\n/).filter((step) => step.trim())
		: [];

	return {
		id: meal.idMeal,
		title: meal.strMeal,
		description: meal.strInstructions
			? meal.strInstructions.substring(0, 120) + "..."
			: "Delicious meal from TheMealDB",
		image: meal.strMealThumb,
		cookTime: "30 minutes",
		servings: 4,
		category: meal.strCategory || "Main Course",
		area: meal.strArea,
		ingredients,
		instructions,
		originalData: meal,
		youtubeUrl: meal.strYoutube,
	};
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));