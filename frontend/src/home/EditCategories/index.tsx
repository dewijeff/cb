import React, { useContext } from "react";
import { ListingCategory } from "../../models";
import {Button, Form, FormListFieldData, Input, Popconfirm, Space, message, notification} from "antd";
import { DownCircleOutlined, MinusCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import { CookbookDispatchContext, REDUCER_ACTION_TYPE } from "../../CookbookReducer";
import './index.css';
import {UpdateCategories} from "./logic";
import {DeleteDbCategory} from "../../network";

interface CategoriesContainer {
    categories: ListingCategory[];
}

interface Props {
    listingCategories: ListingCategory[],
}

const EditCategories = ({listingCategories} : Props) => {  
    const [form] = Form.useForm<CategoriesContainer>();
    const cookbookDispatch = useContext(CookbookDispatchContext);
    
    // This is dumb but maybe? - nope, it is dumb but it totally works.  form must need an object with names not a collection...
    // TODO: there is no containing object, but it seems there needs to be for the FormList to act on.  added this as a work around
    // maybe there is a better way to do this...
    const categories : CategoriesContainer = {
        "categories": listingCategories
    };

    const onFinish = async () => {
        const categories = form.getFieldsValue();
        console.log('editCategories', categories);

        try {
            await UpdateCategories(categories.categories);
            message.success('Categories successfully saved');
        }
        catch (ex)
        {
            message.error(ex.message);
        }
        // save data, then refresh categories, while not turning off edit, just refresh everything

        // notify save was successful or failure...
    };

    const onFinishFailed = () => {
        console.log('failed');
        notification['error']({
            message: 'Changes not saved',
            description: 'There was an error saving. Please try again later.',
        });
    }

    const categoryHasRecipes = (listingCategory: FormListFieldData) => {
        const category: ListingCategory = form.getFieldValue(['categories', listingCategory.name]);

        return category?.recipes?.length > 0;
    }

    const deleteCategory = async (listingCategory: FormListFieldData, removeFunction: (index: number | number[]) => void ) => {
        // TODO: @JLD - call deleteDbCategory
        const category: ListingCategory = form.getFieldValue(['categories', listingCategory.name]);
        if (category.id)
        {
            await DeleteDbCategory(category.id);
        }

        removeFunction(listingCategory.name);
    };

    const handleSelectRecipe = (listingCategory: FormListFieldData, listingRecipe: FormListFieldData) => {
        const recipeId = form.getFieldValue(['categories', listingCategory.name, 'recipes', listingRecipe.name, 'recipeId']);
        cookbookDispatch({type: REDUCER_ACTION_TYPE.SET_SELECTED_RECIPE_ID, payload: recipeId })
    };

    const handleSubmit = () => {
        const something = form.getFieldsValue();
        console.log(something);
        // split this out for debugging purposes - feel free to inline it.
        form.submit();
    }

    return (
        <Form
            form={form}
            name='categoryListForm'
            initialValues={categories}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Space direction='vertical' style={{width: '100%', paddingLeft: '20px'}}>
                <Form.List name='categories'>
                    {(categoryList, {add: addCategory, remove: removeCategory, move: moveCategory}) => (
                        <Space direction='vertical' style={{width: '100%'}}>
                            {categoryList.map((listingCategory, categoryIndex) => (
                                <Space direction='vertical' style={{width: '100%'}}>
                                    <div className='category-row-container'>
                                        <Form.Item name={[listingCategory.name, 'name']} label='Category Name:' rules={[{required: true, message:"required"}]} className='category-name'>
                                            <Input />
                                        </Form.Item>
                                        {/*<Form.Item>*/}
                                        {/*    <PlusCircleOutlined onClick={() => addCategory()}/>*/}
                                        {/*</Form.Item>*/}
                                        <Form.Item className='category-actions'>
                                            <div >
                                                <Popconfirm
                                                    className={`remove-category-action${categoryHasRecipes(listingCategory) ? ' aria-hidden' : ''}`}
                                                    title="Are you sure you want to delete this category?"
                                                    onConfirm={() => deleteCategory(listingCategory, removeCategory)}
                                                    okText="Yes"
                                                    cancelText="No">
                                                    <MinusCircleOutlined hidden={categoryHasRecipes(listingCategory)}/>
                                                </Popconfirm>
                                                {listingCategory.name !== 0 && (<UpCircleOutlined className='move-up-category-action' onClick={() => moveCategory(categoryIndex, categoryIndex - 1)}/>)}
                                                {listingCategory.name !== listingCategories.length - 1 && (<DownCircleOutlined className='move-down-category-action' onClick={() => moveCategory(categoryIndex, categoryIndex + 1)}/>)}
                                            </div>
                                        </Form.Item>
                                    </div>
                                    <Form.List name={[listingCategory.name, 'recipes']}>
                                        {(listingRecipes, {move: moveRecipe}) => (
                                            <Space direction='vertical' style={{width: '100%'}}>
                                                {listingRecipes.map((listingRecipe, recipeIndex) => (
                                                    <Space direction="horizontal" style={{width: '100%', paddingLeft: '30px'}} onClick={() => handleSelectRecipe(listingCategory, listingRecipe)}>
                                                        <span onClick={() => handleSelectRecipe(listingCategory, listingRecipe)}>{form.getFieldValue(['categories', listingCategory.name, 'recipes', listingRecipe.name, 'name'])}</span>
                                                        <UpCircleOutlined hidden={listingRecipe.name === 0} onClick={() => moveRecipe(recipeIndex, recipeIndex - 1)}/>
                                                        <DownCircleOutlined hidden={listingRecipe.name === listingRecipes.length - 1} onClick={() => moveRecipe(recipeIndex, recipeIndex + 1)}/>
                                                        {/*<span onClick={() => handleSelectRecipe(listingCategory, listingRecipe)}>{form.getFieldValue(['categories', listingCategory.name, 'recipes', listingRecipe.name, 'name'])}</span>*/}
                                                        {/*{listingRecipe.name !== 0 && (<UpCircleOutlined onClick={() => moveRecipe(recipeIndex, recipeIndex - 1)}/>)}*/}
                                                        {/*{listingRecipe.name !== listingRecipes.length - 1 && (<DownCircleOutlined onClick={() => moveRecipe(recipeIndex, recipeIndex + 1)}/>)}*/}
                                                        {/*<Button onClick={() => handleSelectRecipe(listingCategory, listingRecipe)}>*/}
                                                        {/*    Edit*/}
                                                        {/*</Button>*/}
                                                    </Space>
                                                ))}
                                            </Space>
                                        )}
                                    </Form.List>
                                </Space>
                            ))}
                            <Button onClick={() => addCategory()}>Add Category</Button>
                        </Space>
                    )}
                </Form.List>
                <Button htmlType='submit' type="primary" >Save</Button>
            </Space>
        </Form>
    );
}

export default EditCategories;