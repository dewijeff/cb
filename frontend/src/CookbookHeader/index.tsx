import { Header } from "antd/lib/layout/layout";
import React, { useContext, useState } from "react";
import './index.css';
import { Button, Space } from "antd";
import EditIngredient from "../EditIngredient";
import EditRecipe from "../EditRecipe";
import { CookbookDispatchContext, CookbookState, CookbookStateContext, REDUCER_ACTION_TYPE } from "../CookbookReducer";

interface Props {
    cookbookName: string;
};

const CookbookHeader = ({cookbookName} : Props) => {
    const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);

    const cookbookState: CookbookState = useContext(CookbookStateContext);
    const cookbookDispatch = useContext(CookbookDispatchContext);

    const handleCloseRecipeModal = () => {
        setIsAddRecipeOpen(false);
    };

    const handleIngredientModal = (isOpen: boolean) => {
        cookbookDispatch({type: REDUCER_ACTION_TYPE.EDIT_INGREDIENT_OPEN, payload: isOpen});
    };

    return(
        <Header>
            <div 
                style={{
                    padding: "auto",
                    display: "grid"
                }}
            >
                <div className='headerLeft'></div>
                <div className='cookbookTitle'>
                    <a href='/'>
                        <h1 className='cookbookTitle'>{cookbookName} Cookbook </h1>
                    </a>
                </div>
                {cookbookState.allowEdit && (
                    <div className='headerRight'>
                        <Space direction='horizontal'>
                            <Button onClick={() => setIsAddRecipeOpen(true)}>Add Recipe</Button>
                            <Button onClick={() => handleIngredientModal(true)}>Add Ingredient</Button>
                            <EditRecipe isOpen={isAddRecipeOpen} handleClose={handleCloseRecipeModal}/>
                            <EditIngredient isOpen={cookbookState.editIngredientsOpen} handleClose={() => handleIngredientModal(false)} />
                        </Space>
                    </div>
                )}
            </div>
        </Header>
    );
};

export default CookbookHeader;