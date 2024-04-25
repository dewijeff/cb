import React from "react";
import { IngredientGroup } from "../../../Shared/models";
import RecipeIngredient from "./RecipeIngredientSection";
import 'antd/dist/antd.css';

const IngredientGroupSection = (group : IngredientGroup) => (
    <div className="ingredient-group" key={group.name}>
        <h3 className="ingredient-group-name">{group.name}</h3>
        {group.recipeIngredients?.map(x => RecipeIngredient(x))}
    </div>
);

export default IngredientGroupSection;
