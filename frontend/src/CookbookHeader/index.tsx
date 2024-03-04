import { Header } from "antd/lib/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import './index.css';
import { Space } from "antd";

interface Props {
    cookbookName: string;
};

const CookbookHeader = ({cookbookName} : Props) => {
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
                        <Link style={{}} to="/AddRecipe">Add Recipe</Link>
                        <Link to="/AddIngredient">Add Ingredient</Link>
                    </Space>
                </div>
            </div>
        </Header>
    );
}

export default CookbookHeader;