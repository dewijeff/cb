import React, { useState, useEffect, useCallback } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd'
import { ListingRecipe, ListingCategory, Recipe, CookbookName } from '../models';
import RecipeSection from './RecipeSection';
import CookbookHeader from '../CookbookHeader';
const { Content, Sider } = Layout;

const baseAddress = "https://localhost:7014/"

const Home = () => {
    const [selectedListingRecpie, setSelectedListingRecipe] = useState<ListingRecipe | null>(null);
    const [recipeLoading, setRecipeLoading] = useState(false);
    const [recipe, setRecipe] = useState<Recipe | undefined>(null);
    const [categories, setCategories] = useState<ListingCategory[]>(null);

    const getCategoryData = useCallback(async () => {
        const response = await fetch(`${baseAddress}cookbook/categories/`);

        if (!response.ok)
            return null;

        const categories:ListingCategory[] = await response.json();
        return categories;
    }, []);

    useEffect(() => {
        getCategoryData().then(setCategories)
    }, []);

    const getRecipe = useCallback(async () => {
        const url = `${baseAddress}cookbook/recipes/${selectedListingRecpie.recipeId}`
        const response = await fetch(url);

        if (!response.ok)
            return null;

        const recipe:Recipe = await response.json();
        return recipe;
    },[selectedListingRecpie]);

    useEffect(() => {
        if (!selectedListingRecpie?.recipeId)
            return;

        setRecipeLoading(true);
        getRecipe().then((value) => {
            setRecipe(value);
            setRecipeLoading(false);
        });
    }, [selectedListingRecpie]);

    const siderItems: MenuProps['items'] = categories?.map(group => ({
        key: group.order,
        label: group.name,
        children: group.recipes.map(recipe => {
            return {
                key: recipe.name,
                label: recipe.name,
                onClick: () => setSelectedListingRecipe(recipe)
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