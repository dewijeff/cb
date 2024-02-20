import React from "react";
import { GetIngredientNameString, GetUnitsString, RecipeIngredient } from "../../../module";
import 'antd/dist/antd.css';

const RecipeIngredientSection = ({ingredient, amount, unit, order} :RecipeIngredient) => (
    <div className="ingredient-item" key={ingredient.name + order}>
        <span className="ingredient-description">{GetIngredientNameString(amount, ingredient.name, ingredient.hideUnit)}</span>
        <span className="ingredient-amount">{amount}</span>
        <span className="ingredient-unit">{GetUnitsString(amount, unit, ingredient.hideUnit)}</span>
    </div>
);

export default RecipeIngredientSection