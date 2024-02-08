import React from "react";
import { RecipeIngredient } from "../../../module";
import 'antd/dist/antd.css';

const RecipeIngredientSection = ({ingredient, amount, unit, id} :RecipeIngredient) => (
    <div className="ingredient-item">
        <span className="ingredient-description">{ingredient.name}</span>
        <span className="ingredient-amount">{amount}</span>
        <span className="ingredient-unit">{unit}</span>
    </div>
);

export default RecipeIngredientSection