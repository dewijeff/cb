import React, { useState, useEffect, useCallback, useContext } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd'
import { ListingCategory, Recipe, CookbookName } from '../models';
import RecipeSection from './RecipeSection';
import CookbookHeader from '../CookbookHeader';
import { GetDbCategories, GetDbRecipe } from '../network';
import { CookbookDispatchContext, CookbookState, CookbookStateContext, REDUCER_ACTION_TYPE } from '../selectedItemReducer';
const { Content, Sider } = Layout;

const Home = () => {
    // const [selectedListingRecpie, setSelectedListingRecipe] = useState<ListingRecipe | null>(null);
    const [recipeLoading, setRecipeLoading] = useState(false);
    const [recipe, setRecipe] = useState<Recipe | undefined>(null);
    const [categories, setCategories] = useState<ListingCategory[]>(null);
    const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>(null);
    const [openCategories, setOpenCategories] = useState<string[]>(null);
    const cookbookState: CookbookState = useContext(CookbookStateContext);
    const cookbookDispatch = useContext(CookbookDispatchContext);

    const handleLoad = async () => {
        const categories = await GetDbCategories();
        setCategories(categories);

        if (cookbookState.selectedRecipeId)
        {
            setSelectedMenuItems([cookbookState.selectedRecipeId]);
            const openItem = categories.find(x => x.recipes.find(y => y.recipeId == cookbookState.selectedRecipeId));
            setOpenCategories([openItem.order.toString()])
        };
    }

    useEffect(() => {
        handleLoad();
    }, []);

    const getRecipe = useCallback(async () => {
        return await GetDbRecipe(cookbookState.selectedRecipeId);
    },[cookbookState.selectedRecipeId]);

    useEffect(() => {
        if (!cookbookState.selectedRecipeId)
            return;

        setRecipeLoading(true);
        getRecipe().then((value) => {
            setRecipe(value);
            setRecipeLoading(false);
        });

    }, [cookbookState.selectedRecipeId]);

    const handleOpenChange = (openItems:string[]) => {
        setOpenCategories(openItems);
    };

    const handleMenuSelect = ({ selectedKeys }: any) => {
        setSelectedMenuItems(selectedKeys);
    };

    const siderItems: MenuProps['items'] = categories?.map(group => ({
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

    return (
        <Layout>
            <CookbookHeader cookbookName={CookbookName}/>
            <Content>
                <Layout>
                    <Sider>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            style={{ height: '100%', borderRight: 0 }}
                            items={siderItems}
                            selectedKeys={selectedMenuItems}
                            openKeys={openCategories}
                            onOpenChange={handleOpenChange}
                            onSelect={handleMenuSelect}
                        />
                    </Sider>
                    <Content>
                        <div>
                            {!!recipe
                                ?
                                    (<RecipeSection recipe={recipe} loading={recipeLoading}/>)
                                :
                                    <h2>{recipe?.name ?? "Select A Recipe"}</h2>
                            }
                        </div>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
}

export default Home;