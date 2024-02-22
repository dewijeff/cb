import React from "react";
import { Recipe } from "../../models";
import IngredientGroupSection from "./IngredientGroupSection";
import InstructionGroupSection from "./InstructionGroupSection";
import 'antd/dist/antd.css';
import './index.css';
import { Spin } from "antd";

interface Props {
    recipe: Recipe;
    loading: boolean;
}

const RecipeSection = ({recipe, loading}: Props) => {
    return (
        <>
            {loading ? (<div className="loading"><Spin /></div>)
                :
                <div>
                    <h2>{recipe.name}</h2>
                    <h3> Ingredients</h3>
                    <div className="ingredients-container">
                        {recipe.ingredientGroups?.sort((a, b) => a.order - b.order).map(x => IngredientGroupSection(x))}
                    </div>
                    {recipe.stepGroups?.sort((a, b) => a.order - b.order).map(x => InstructionGroupSection(x))}
                </div>
            }
        </>
    )
}

export default RecipeSection;