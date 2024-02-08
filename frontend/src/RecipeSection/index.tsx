import React from "react";
import { Recipe } from "../module";
import IngredientGroupSection from "./IngredientGroupSection";
import InstructionGroupSection from "./InstructionGroupSection";
import 'antd/dist/antd.css';
import './index.css';

interface Props {
    recipe: Recipe;
}

const RecipeSection = ({recipe}: Props) => {
    return (
        <div>
            <h2>{recipe.name}</h2>
            <h3> Ingredients</h3>
            <div className="ingredients-container">
                {recipe.ingredientGroups?.map(x => IngredientGroupSection(x))}
            </div>
            {recipe.stepGroups?.sort((a, b) => a.order - b.order).map(x => InstructionGroupSection(x))}
        </div>
    )
}

export default RecipeSection;