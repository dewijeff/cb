import React, { useState } from "react";
import { Recipe } from "../../models";
import IngredientGroupSection from "./IngredientGroupSection";
import InstructionGroupSection from "./InstructionGroupSection";
import 'antd/dist/antd.css';
import './index.css';
import { Button, Spin } from "antd";
import EditRecipe from "../../EditRecipe";

interface Props {
    loading: boolean;
    recipe: Recipe;
}

const RecipeSection = ({recipe, loading}: Props) => {
    const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);

    const handleCloseRecipeModal = () => {
        setIsAddRecipeOpen(false);
    };

    return (
        <Spin spinning={loading}>
            {loading ? (<div className="loading">Loading</div>)
                :
                <div>
                    <div className="" style={{
                        padding: "auto",
                        display: "grid"
                    }}>
                        <div className="recipeTitleLeft">
                            <h2>{recipe.name}</h2>
                        </div>
                        <div className="recipeTitleRight">
                            <Button onClick={() => setIsAddRecipeOpen(true)}>Edit Recipe</Button>
                            <EditRecipe isOpen={isAddRecipeOpen} handleClose={handleCloseRecipeModal} recipeId={recipe.id}/>
                        </div>
                    </div>
                    <div className="ingredients-container">
                        {recipe.ingredientGroups?.sort((a, b) => a.order - b.order).map(x => IngredientGroupSection(x))}
                    </div>
                    {recipe.stepGroups?.sort((a, b) => a.order - b.order).map(x => InstructionGroupSection(x))}
                </div>
            }
        </Spin>
    )
};

export default RecipeSection;