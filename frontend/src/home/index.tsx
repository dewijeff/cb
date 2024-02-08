import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd'
import recipeData from '../recipes.json'
import { Recipe, Category } from '../module';
import RecipeSection from '../RecipeSection';
const { Header, Content, Sider } = Layout;

const groups = (recipeData as unknown) as Category[];
console.log(groups);

const Home = () => {
    const [selectedRecpie, setSelectedRecipe] = useState<Recipe | null>(null);
    const cookbookName = "jeff's";

    const siderItems: MenuProps['items'] = groups.map(group => ({
        key: group.id,
        label: group.name,
        children: group.recipes.map(recipe => {
            return {
                key: recipe.name,
                label: recipe.name,
                onClick: () => setSelectedRecipe(recipe)
            }
        })
    }));

    return (
        <Layout>
            <Header>
                <div 
                    style={{
                        margin: "auto"
                    }}
                >
                    <h1 className="cookbookTitle">{cookbookName} Cookbook</h1>
                </div>
            </Header>
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
                            {!!selectedRecpie
                                ?
                                    (<RecipeSection recipe={selectedRecpie}/>)
                                :
                                    <h2>{selectedRecpie?.name ?? "Select A Recipe"}</h2>
                            }
                        </div>
                    </Content>
                </Layout>
            </Content>

        </Layout>

    );
}

export default Home;