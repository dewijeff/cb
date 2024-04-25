// todo...

import {Nutrition, Recipe, RecipeIngredient} from "./models";
import {
    CupsPerGallon, GramsPerOunce, GramsPerPound,
    MeasurementUnit,
    OuncesPerPound,
    TablespoonsPerCup,
    TeaspoonsPerCup,
    TeaspoonsPerTablespoon
} from "./constants";

const GetRecipeIngredientUnitToIngredientVolumePerServingUnitMultiplier = (recipeIngredient: RecipeIngredient) => {
    switch(true) {
        // CUPS TO OTHER UNITS
        case (recipeIngredient.unit === MeasurementUnit.Cup && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Cup):
            return 1;
        case (recipeIngredient.unit === MeasurementUnit.Cup && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Tablespoon):
            return TablespoonsPerCup;
        case (recipeIngredient.unit === MeasurementUnit.Cup && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Teaspoon):
            return TeaspoonsPerCup;
        // case (recipeIngredient.unit === MeasurementUnit.Cup && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Ounce):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Cup && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Pound):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Cup && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gram):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Cup && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Egg):
        //     return 1;
        case (recipeIngredient.unit === MeasurementUnit.Cup && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gallon):
            return 1 / CupsPerGallon;
        // case (recipeIngredient.unit === MeasurementUnit.Cup && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggWhite):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Cup && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggYolk):
        //     return 1;

        // TABLESPOONS TO OTHER UNITS
        case (recipeIngredient.unit === MeasurementUnit.Tablespoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Cup):
            return 1 / TablespoonsPerCup;
        case (recipeIngredient.unit === MeasurementUnit.Tablespoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Tablespoon):
            return 1;
        case (recipeIngredient.unit === MeasurementUnit.Tablespoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Teaspoon):
            return TeaspoonsPerTablespoon;
        // case (recipeIngredient.unit === MeasurementUnit.Tablespoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Ounce):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Tablespoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Pound):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Tablespoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gram):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Tablespoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Egg):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Tablespoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gallon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Tablespoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggWhite):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Tablespoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggYolk):
        //     return 1;

        // TEASPOONS TO OTHER UNITS
        case (recipeIngredient.unit === MeasurementUnit.Teaspoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Cup):
            return 1 / TeaspoonsPerCup;
        case (recipeIngredient.unit === MeasurementUnit.Teaspoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Tablespoon):
            return 1 / TeaspoonsPerTablespoon;
        case (recipeIngredient.unit === MeasurementUnit.Teaspoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Teaspoon):
            return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Teaspoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Ounce):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Teaspoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Pound):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Teaspoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gram):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Teaspoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Egg):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Teaspoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gallon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Teaspoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggWhite):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Teaspoon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggYolk):
        //     return 1;

        // OUNCE TO OTHER UNITS -- // TODO: Should this be both fluid and weight?  they are different, but it can mean both here.
        // case (recipeIngredient.unit === MeasurementUnit.Ounce && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Cup):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Ounce && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Tablespoon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Ounce && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Teaspoon):
        //     return 1;
        case (recipeIngredient.unit === MeasurementUnit.Ounce && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Ounce):
            return 1;
        case (recipeIngredient.unit === MeasurementUnit.Ounce && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Pound):
            return 1 / OuncesPerPound;
        case (recipeIngredient.unit === MeasurementUnit.Ounce && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gram):
            return GramsPerOunce;
        // case (recipeIngredient.unit === MeasurementUnit.Ounce && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Egg):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Ounce && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gallon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Ounce && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggWhite):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Ounce && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggYolk):
        //     return 1;

        // POUND TO OTHER UNITS
        // case (recipeIngredient.unit === MeasurementUnit.Pound && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Cup):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Pound && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Tablespoon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Pound && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Teaspoon):
        //     return 1;
        case (recipeIngredient.unit === MeasurementUnit.Pound && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Ounce):
            return OuncesPerPound;
        case (recipeIngredient.unit === MeasurementUnit.Pound && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Pound):
            return 1;
        case (recipeIngredient.unit === MeasurementUnit.Pound && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gram):
            return GramsPerPound;
        // case (recipeIngredient.unit === MeasurementUnit.Pound && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Egg):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Pound && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gallon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Pound && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggWhite):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Pound && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggYolk):
        //     return 1;

        // GRAM TO OTHER UNITS
        // case (recipeIngredient.unit === MeasurementUnit.Gram && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Cup):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Gram && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Tablespoon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Gram && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Teaspoon):
        //     return 1;
        case (recipeIngredient.unit === MeasurementUnit.Gram && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Ounce):
            return 1 / GramsPerOunce;
        case (recipeIngredient.unit === MeasurementUnit.Gram && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Pound):
            return 1 / GramsPerPound;
        case (recipeIngredient.unit === MeasurementUnit.Gram && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gram): // This shouldn't come into play, but here just to be safe
            return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Gram && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Egg):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Gram && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gallon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Gram && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggWhite):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Gram && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggYolk):
        //     return 1;

        //EGG TO OTHER UNITS
        // case (recipeIngredient.unit === MeasurementUnit.Egg && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Cup):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Egg && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Tablespoon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Egg && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Teaspoon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Egg && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Ounce):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Egg && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Pound):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Egg && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gram):
        //     return 1;
        case (recipeIngredient.unit === MeasurementUnit.Egg && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Egg):
            return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Egg && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gallon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Egg && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggWhite):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Egg && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggYolk):
        //     return 1;

        // GALLON TO OTHER UNITS
        case (recipeIngredient.unit === MeasurementUnit.Gallon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Cup):
            return CupsPerGallon;
        case (recipeIngredient.unit === MeasurementUnit.Gallon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Tablespoon):
            return CupsPerGallon * TablespoonsPerCup;
        case (recipeIngredient.unit === MeasurementUnit.Gallon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Teaspoon):
            return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Gallon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Ounce):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Gallon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Pound):
        //     return 1;
        case (recipeIngredient.unit === MeasurementUnit.Gallon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gram):
            return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Gallon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Egg):
        //     return 1;
        case (recipeIngredient.unit === MeasurementUnit.Gallon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gallon):
            return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Gallon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggWhite):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.Gallon && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggYolk):
        //     return 1;

        // EGG WHITE TO OTHER UNITS
        // case (recipeIngredient.unit === MeasurementUnit.EggWhite && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Cup):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggWhite && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Tablespoon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggWhite && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Teaspoon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggWhite && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Ounce):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggWhite && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Pound):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggWhite && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gram):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggWhite && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Egg):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggWhite && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gallon):
        //     return 1;
        case (recipeIngredient.unit === MeasurementUnit.EggWhite && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggWhite):
            return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggWhite && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggYolk):
        //     return 1;

        //EGG YOLK TO OTHER UNITS
        // case (recipeIngredient.unit === MeasurementUnit.EggYolk && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Cup):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggYolk && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Tablespoon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggYolk && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Teaspoon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggYolk && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Ounce):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggYolk && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Pound):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggYolk && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gram):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggYolk && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Egg):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggYolk && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.Gallon):
        //     return 1;
        // case (recipeIngredient.unit === MeasurementUnit.EggYolk && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggWhite):
        //     return 1;
        case (recipeIngredient.unit === MeasurementUnit.EggYolk && recipeIngredient.ingredient.volumePerServingUnit === MeasurementUnit.EggYolk):
            return 1;

        default:
            console.log(`Unsupported conversion ${MeasurementUnit[recipeIngredient.unit]} to ${MeasurementUnit[recipeIngredient.ingredient.volumePerServingUnit]}`)
    }
}

// Really want this logic encapsulated/independently tested
const ConvertToAmountInGrams = (recipeIngredient: RecipeIngredient) => {
    if (recipeIngredient.unit === MeasurementUnit.Gram)
    {
        // yay! simple... how hard could the rest be?
        return recipeIngredient.amount;
    }

    const unitMultiplier = GetRecipeIngredientUnitToIngredientVolumePerServingUnitMultiplier(recipeIngredient);

    const recipeIngredientAmountInIngredientUnits = recipeIngredient.amount * unitMultiplier;
    const numberOfServings = recipeIngredientAmountInIngredientUnits / recipeIngredient.ingredient.volumePerServing;

    return numberOfServings * recipeIngredient.ingredient.gramsPerServing;
}

const CalculateNutritionOfRecipeIngredient = (recipeIngredient: RecipeIngredient) => {
     // calculate amount used in recipe in grams
    const gramsOfIngredient = ConvertToAmountInGrams(recipeIngredient);

    // calculate calories per 100 grams
    const caloriesPerGram = recipeIngredient.ingredient.calPerServing / recipeIngredient.ingredient.gramsPerServing;
    const sodiumPerGram = recipeIngredient.ingredient.sodiumMgPerServing / recipeIngredient.ingredient.gramsPerServing;
    const ingredientCalories = caloriesPerGram * gramsOfIngredient;
    const ingredientSodium = sodiumPerGram * gramsOfIngredient;

    return {
        calories: ingredientCalories,
        sodium: ingredientSodium
    } as Nutrition;
}

export const CalculateRecipeTotalCalories = (recipe: Recipe) => {
    let caloriesTotal = 0;
    let sodiumTotal = 0;

    // could probably do this in a (maybe) cleaner way, but this is easy to read and should be as efficient as anything...
    for (const ingredientGroup of recipe.ingredientGroups)
    {
        for (const recipeIngredient of ingredientGroup.recipeIngredients)
        {
            const ingredientNutrition = CalculateNutritionOfRecipeIngredient(recipeIngredient);

            caloriesTotal += ingredientNutrition.calories;
            sodiumTotal += ingredientNutrition.sodium;
        }
    }

    return {
        calories: caloriesTotal / recipe.servings,
        sodium: sodiumTotal / recipe.servings
    } as Nutrition;
}

// export const CalculateNutritionPerServing = (recipe: Recipe) => {
//     const totalCaloriesForRecipe = CalculateRecipeTotalCalories(recipe);
//
//     return totalCaloriesForRecipe / recipe.servings;
// }