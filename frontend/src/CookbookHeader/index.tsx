import { Header } from "antd/lib/layout/layout";
import React, { useContext, useState } from "react";
import './index.css';
import { Button, Dropdown, MenuProps, Space } from "antd";
import EditIngredient from "../EditIngredient";
import EditRecipe from "../EditRecipe";
import { CookbookDispatchContext, CookbookState, CookbookStateContext, REDUCER_ACTION_TYPE } from "../CookbookReducer";
import { JwtTokenName } from "../models";
import { useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

interface Props {
    cookbookName: string;
};

const AboutKey = 'About';
const LogoutKey = 'Logout';


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

    const navigate = useNavigate();

    // TODO: @JLD - not huge on having this in here - maybe memoize this?
    const dropdownItems = [
        {
            label: (
                <span onClick={() => {
                    localStorage.removeItem(JwtTokenName);
                    navigate("/");
                }}>
                    {LogoutKey}
                </span>
            ),
            key: LogoutKey,
        },
        {
            label: (
                <span onClick={() => {navigate("/About/")}}>
                    {AboutKey}
                </span>
            ),
            key: AboutKey
        }
    ];

// TODO: @JLD - Dropdown hamburger menu really isn't a hamburger menu and won't be responsive on mobile.  will probably work though...

    return(
        <Header>
            <div 
                style={{
                    padding: "auto",
                    display: "grid"
                }}
            >
                <div className='headerLeft'>
                    <Dropdown menu={{items: dropdownItems}} placement="bottomLeft">
                        <Button><MenuOutlined /></Button> 
                    </Dropdown>
                </div>
                <div className='cookbookTitle'>
                    <a href='/'>
                        <h1 className='cookbookTitle'>{cookbookName} Cookbook </h1>
                    </a>
                </div>
                <div className='headerRight'>
                    <Space direction='horizontal'>
                        {cookbookState.allowEdit && (
                            <>
                                <Button onClick={() => setIsAddRecipeOpen(true)}>Add Recipe</Button>
                                <Button onClick={() => handleIngredientModal(true)}>Add Ingredient</Button>
                                <EditRecipe isOpen={isAddRecipeOpen} handleClose={handleCloseRecipeModal}/>
                                <EditIngredient isOpen={cookbookState.editIngredientsOpen} handleClose={() => handleIngredientModal(false)} />
                            </>
                        )}
                    </Space>
                </div>
            </div>
        </Header>
    );
};

export default CookbookHeader;