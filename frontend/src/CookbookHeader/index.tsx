import { Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import './index.css';
import { Button, Space } from "antd";
import EditIngredient from "../EditIngredient";
import EditRecipe from "../EditRecipe";

interface Props {
    cookbookName: string;
};

const CookbookHeader = ({cookbookName} : Props) => {
    const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
    const [isAddIngredientOpen, setIsAddIngredientOpen] = useState(false);

    const handleCloseRecipeModal = () => {
        setIsAddRecipeOpen(false);
    };

    const handleCloseIngredientModal = () => {
        setIsAddIngredientOpen(false);
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
                <div className='headerRight'>
                    <Space direction='horizontal'>
                        <Button onClick={() => setIsAddRecipeOpen(true)}>Add Recipe</Button>
                        <Button onClick={() => setIsAddIngredientOpen(true)}>Add Ingredient</Button>
                        <EditRecipe isOpen={isAddRecipeOpen} handleClose={handleCloseRecipeModal}/>
                        <EditIngredient isOpen={isAddIngredientOpen} handleClose={handleCloseIngredientModal} />
                    </Space>
                </div>
            </div>
        </Header>
    );
};

export default CookbookHeader;