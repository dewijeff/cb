import { Header } from "antd/lib/layout/layout";
import React, { useContext, useState } from "react";
import './index.css';
import { Button, Dropdown, MenuProps, Space } from "antd";
import { CookbookDispatchContext, CookbookState, CookbookStateContext, REDUCER_ACTION_TYPE } from "../CookbookReducer";
import { JwtTokenName } from "../models";
import { useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import EditRecipe from "../EditRecipe";
import EditIngredient from "../EditIngredient";

interface DropdownItem {
    key: string;
    label: React.JSX.Element;
}

interface Props {
    cookbookName: string;
}

const AboutKey = 'About';
const LogoutKey = 'Logout';

const CookbookHeader = ({cookbookName} : Props) => {
    const cookbookState: CookbookState = useContext(CookbookStateContext);
    const cookbookDispatch = useContext(CookbookDispatchContext);

    const handleIngredientModal = (isOpen: boolean) => {
        cookbookDispatch({type: REDUCER_ACTION_TYPE.EDIT_INGREDIENT_OPEN, payload: isOpen});
    };

    const navigate = useNavigate();

    const buildDropdownItems = () => {
        let dropdownItems : DropdownItem[] = [];
        const localToken = localStorage.getItem(JwtTokenName);
        if (localToken)
        {
            dropdownItems.push(
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
                }
            );
        }

        dropdownItems.push(
            {
                label: (
                    <span onClick={() => {navigate("/About/")}}>
                        {AboutKey}
                    </span>
                ),
                key: AboutKey
            }
        );

        return dropdownItems;
    }

    // const dropdownItems = [
    //     {
    //         label: (
    //             <span onClick={() => {
    //                 localStorage.removeItem(JwtTokenName);
    //                 navigate("/");
    //             }}>
    //                 {LogoutKey}
    //             </span>
    //         ),
    //         key: LogoutKey,
    //     },
    //     {
    //         label: (
    //             <span onClick={() => {navigate("/About/")}}>
    //                 {AboutKey}
    //             </span>
    //         ),
    //         key: AboutKey
    //     }
    // ];

    // TODO: @JLD - Dropdown hamburger menu really isn't a hamburger menu and won't be responsive on mobile.  will probably work though...
    return(
        <Header>
            <div className='grid-container'
                style={{
                    padding: "auto"
                }}
            >
                <div className='headerLeft'>
                    <Dropdown menu={{items: buildDropdownItems()}} placement="bottomLeft">
                        <Button><MenuOutlined /></Button> 
                    </Dropdown>
                </div>
                <div className='cookbookTitle'>
                    <a href='/'>
                        <h1 className='cookbookTitle'>{cookbookName} Cookbook </h1>
                    </a>
                </div>
                <div className='headerRight'>
                    {cookbookState.allowEdit && (
                        <Space direction='horizontal'>
                            {cookbookState.isEditing ? (
                                <>
                                    <Button onClick={() => cookbookDispatch({type: REDUCER_ACTION_TYPE.EDIT_RECIPE_OPEN, payload: true})}>Add Recipe</Button>
                                    <Button onClick={() => handleIngredientModal(true)}>Add Ingredient</Button>
                                    <Button onClick={() => {cookbookDispatch({type: REDUCER_ACTION_TYPE.SET_EDITING, payload: false})}}>Close Edit</Button>
                                </>
                            ) :
                            (
                                <Button onClick={() => {cookbookDispatch({type: REDUCER_ACTION_TYPE.SET_EDITING, payload: true})}}>Edit</Button>
                            )}
                        </Space>
                    )}
                </div>
            </div>
        </Header>
    );
};

export default CookbookHeader;