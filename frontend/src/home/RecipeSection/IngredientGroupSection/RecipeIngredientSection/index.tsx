import React from "react";
import 'antd/dist/antd.css';
import { RecipeIngredient } from "../../../../Shared/models";
import { GetIngredientNameString, GetUnitsString } from "../../../../Shared/helpers";

const RecipeIngredientSection = ({ingredient, amount, unit} :RecipeIngredient) => (
    <div className="ingredient-item" key={ingredient.name}>
        <span className="ingredient-description">{GetIngredientNameString(amount, ingredient.name, ingredient.hideUnit)}</span>
        <span className="ingredient-amount">{amount}</span>
        <span className="ingredient-unit">{GetUnitsString(amount, unit, ingredient.hideUnit)}</span>
    </div>
);

export default RecipeIngredientSection