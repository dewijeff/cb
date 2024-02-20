import React from "react";
import { IngredientGroup } from "../../module";
import RecipeIngredient from "./RecipeIngredientSection";
import 'antd/dist/antd.css';

const IngredientGroupSection = (group : IngredientGroup) => (
    <div className="ingredient-group" key={group.name + group.order}>
        <h4 className="ingredient-group-name">{group.name}</h4>
        {group.recipeIngredients?.sort((a, b) => a.order - b.order).map(x => RecipeIngredient(x))}
    </div>
);

export default IngredientGroupSection;
