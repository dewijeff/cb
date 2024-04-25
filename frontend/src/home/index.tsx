import React, { useState, useEffect, useCallback, useContext } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import type { MenuProps } from 'antd';
import {Button, Layout, Menu, Spin} from 'antd'
import { ListingCategory } from '../Shared/models';
import RecipeSection from './RecipeSection';
import CookbookHeader from '../CookbookHeader';
import { GetDbCategories, GetDbRecipe } from '../Shared/network';
import { CookbookDispatchContext, CookbookState, CookbookStateContext, REDUCER_ACTION_TYPE } from '../Shared/CookbookReducer';
import { useNavigate } from 'react-router-dom';
import EditCategories from '../EditCategories';
import EditIngredient from "../EditIngredient";
import EditRecipe from "../EditRecipe";
import {CookbookName} from "../Shared/constants";

const { Content, Sider } = Layout;

const Home = () => {
    const [contentsLoading, setContentsLoading] = useState(true);
    const [errorLoadingContents, setErrorLoadingContents] = useState(false);
    const [recipeLoading, setRecipeLoading] = useState(false);
    const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>(null);
    const [openCategories, setOpenCategories] = useState<string[]>(null);
    const [editCategories, setEditCategories] = useState(false);
    const cookbookState: CookbookState = useContext(CookbookStateContext);
    const cookbookDispatch = useContext(CookbookDispatchContext);
    const navigate = useNavigate();
    const [categoriesCollapsed, setCategoriesCollapsed] = useState(false);

    const handleSetContentsLoading = (loading: boolean) => {
        setContentsLoading(loading)
    }

    const handleLoad = async () => {
        handleSetContentsLoading(true);

        let categories: ListingCategory[];
        try {
            categories = await GetDbCategories();

            cookbookDispatch({type: REDUCER_ACTION_TYPE.CATEGORIES_UPDATED, payload: categories})
            // setCategories(categories);

            if (cookbookState.selectedListingRecipeId)
            {
                setSelectedMenuItems([cookbookState.selectedListingRecipeId]);
                const openItem = categories.find(x => x.recipes.find(y => y.recipeId == cookbookState.selectedListingRecipeId));
                setOpenCategories([openItem.order.toString()])
            };
        } catch(e)
        {
            console.log("Error loading contents", e)
            setErrorLoadingContents(true);
        }
        finally {
            handleSetContentsLoading(false);
        }
    }

    useEffect(() => {
        // this happens when the user hits refresh among other things - use the login page to verify they are logged in, which will send them back here.
        if (!cookbookState.isAuthenticated)
            navigate("/");
        handleLoad();
    }, []);

    const getRecipe = useCallback(async () => {
        return await GetDbRecipe(cookbookState.selectedListingRecipeId);
    },[cookbookState.selectedListingRecipeId]);

    useEffect(() => {
        if (!cookbookState.selectedListingRecipeId)
            return;

        setRecipeLoading(true);
        getRecipe().then((value) => {
            cookbookDispatch({type: REDUCER_ACTION_TYPE.SET_RECIPE, payload: value})
            setRecipeLoading(false);
        });

    }, [cookbookState.selectedListingRecipeId]);

    const handleOpenChange = (openItems:string[]) => {
        setOpenCategories(openItems);
    };

    const handleMenuSelect = ({ selectedKeys }: any) => {
        setSelectedMenuItems(selectedKeys);
    };

    const handleEditCategories = (openEdit: boolean) => {
        setEditCategories(openEdit);
    };

    const siderItems: MenuProps['items'] = cookbookState.listingCategories?.map(group => ({
        key: group.order,
        label: group.name,
        children: group.recipes.map(recipe => {
            return {
                key: recipe.recipeId,
                label: recipe.name,
                onClick: () => cookbookDispatch({type: REDUCER_ACTION_TYPE.SET_SELECTED_RECIPE_ID, payload: recipe.recipeId })
            }
        })
    }));

    const toggleCollapsed = (collapsed: boolean) => {
        setCategoriesCollapsed(collapsed);
    };

    return (
        <Layout>
            <CookbookHeader cookbookName={CookbookName}/>
            <Content>
                <Spin spinning={contentsLoading}>
                    {contentsLoading ? (
                        <>
                        </>
                    ) : (
                        <Layout>
                            <Sider collapsible collapsed={categoriesCollapsed} onCollapse={toggleCollapsed} width={'250px'} style={{height: '100vh', maxHeight: "900px", overflowX: "hidden", overflowY: "hidden"}}>
                                <>
                                    {cookbookState.isEditing && (
                                        <>
                                            <Button style={{width: '100%'}} onClick={() => handleEditCategories(true)}>EditCategories</Button>
                                            <EditCategories handleEditOpen={handleEditCategories} open={editCategories}/>
                                        </>
                                    )}
                                    <Menu
                                        mode="inline"
                                        defaultSelectedKeys={['1']}
                                        style={{ height: '100%', borderRight: 0 , overflowY: 'auto', overflowX: 'hidden'}}
                                        items={siderItems}
                                        selectedKeys={selectedMenuItems}
                                        openKeys={openCategories}
                                        onOpenChange={handleOpenChange}
                                        onSelect={handleMenuSelect}
                                    />
                                </>
                            </Sider>
                            <Content>
                                <div>
                                    {!!cookbookState.selectedRecipe
                                        ?
                                            (<RecipeSection recipe={cookbookState.selectedRecipe} loading={recipeLoading} setLoading={handleSetContentsLoading}/>)
                                        :
                                            <h2>{cookbookState.selectedRecipe?.name ?? "Select A Recipe"}</h2>
                                    }
                                    <EditIngredient />
                                    <EditRecipe />
                                </div>
                            </Content>
                        </Layout>
                    )}
                </Spin>
            </Content>
        </Layout>
    );
}

export default Home;