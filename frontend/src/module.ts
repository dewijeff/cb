import { Category, MeasurementUnit, Recipe } from "./models";

export function GetIngredientNameString(count: number, name: string, hideUnit: boolean)
{
    if (hideUnit && count > 1)
        return name + 's';

    return name;
}

export function GetUnitsString(count: number, unitsEnum: number, hideUnit: boolean)
{
    const units = MeasurementUnit[unitsEnum];

    if (hideUnit)
        return null;

    if (count <= 1 && count > 0)
        return units;
    
    return units + 's';
}

export type State = {
    categories: Category[];
    selectedCategory?: Category;
    selectedRecipe?: Recipe;
};

const initialState: State = {
    categories: [],
    selectedCategory: null,

}
