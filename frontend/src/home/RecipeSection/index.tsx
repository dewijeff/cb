import React, { useContext, useState } from "react";
import { Recipe } from "../../models";
import IngredientGroupSection from "./IngredientGroupSection";
import InstructionGroupSection from "./InstructionGroupSection";
import 'antd/dist/antd.css';
import './index.css';
import { Button, Popconfirm, Space, Spin } from "antd";
import EditRecipe from "../../EditRecipe";
import { CookbookDispatchContext, CookbookState, CookbookStateContext, REDUCER_ACTION_TYPE } from "../../CookbookReducer";
import { DeleteDbRecipe, GetDbCategories } from "../../network";
import EditIngredient from "../../EditIngredient";

interface Props {
    recipe: Recipe;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const RecipeSection = ({recipe, loading, setLoading}: Props) => {
    const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
    const cookbookState : CookbookState = useContext(CookbookStateContext);
    const cookbookDispatch = useContext(CookbookDispatchContext);
    const handleCloseRecipeModal = () => {
        setIsAddRecipeOpen(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        // delete db from recipe
        await DeleteDbRecipe(recipe.id);

        // refresh categories (the recipe was removed from categories on the back end)
        await GetDbCategories().then(
                (categories) => cookbookDispatch({type: REDUCER_ACTION_TYPE.CATEGORIES_UPDATED, payload: categories}));

        // clear recipe selection
        cookbookDispatch({type: REDUCER_ACTION_TYPE.SET_SELECTED_RECIPE_ID, payload: null});
        cookbookDispatch({type: REDUCER_ACTION_TYPE.SET_RECIPE, payload: null});
        setLoading(false);
    }

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
                        {(cookbookState.allowEdit && cookbookState.isEditing) && (
                            <div className="recipeTitleRight">
                                <Space>
                                    <Button onClick={() => cookbookDispatch({type: REDUCER_ACTION_TYPE.EDIT_RECIPE_OPEN, payload:true})}>Edit Recipe</Button>
                                    <Popconfirm
                                        title={"Are you sure you want to delete this recipe?"}
                                        onConfirm={handleDelete}
                                        okText="Yes"
                                        cancelText="No">
                                        <Button danger>Delete Recipe</Button>
                                    </Popconfirm>
                                </Space>
                            </div>
                        )}
                    </div>
                    <div className="ingredients-container">
                        {recipe.ingredientGroups?.map(x => IngredientGroupSection(x))}
                    </div>
                    {recipe.stepGroups?.map(x => InstructionGroupSection(x))}
                </div>
            }
        </Spin>
    )
};

export default RecipeSection;