import React, {useContext, useEffect, useState} from "react";
import { ListingCategory } from "../Shared/models";
import {
    Button,
    Form,
    FormListFieldData,
    Input,
    Popconfirm,
    Space,
    message,
    notification,
    Drawer,
    Row, Col
} from "antd";
import { DownCircleOutlined, MinusCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import {CookbookDispatchContext, CookbookState, CookbookStateContext, REDUCER_ACTION_TYPE} from "../Shared/CookbookReducer";
import './index.css';
import {UpdateCategories} from "./logic";
import {DeleteDbCategory, GetDbCategories} from "../Shared/network";

interface CategoriesContainer {
    categories: ListingCategory[];
}

interface Props {
    handleEditOpen: (editOpen: boolean) => void;
    open: boolean;
}

const EditCategories = ({handleEditOpen, open} : Props) => {
    const [form] = Form.useForm<CategoriesContainer>();
    const [categories, setCategories] = useState<CategoriesContainer>()
    const cookbookDispatch = useContext(CookbookDispatchContext);
    const cookbookState: CookbookState = useContext(CookbookStateContext);

    // The form initial values appear to need an object, but we just have a list, so put the list in an object so the form will work.
    useEffect(() => {
        setCategories({
            "categories": cookbookState.listingCategories
        });
    }, []);

    const onFinish = async () => {
        const categories = form.getFieldsValue();
        console.log('editCategories', categories);

        try {
            await UpdateCategories(categories.categories);
            message.success('Categories successfully saved');

            const newCategories = await GetDbCategories();
            cookbookDispatch({type: REDUCER_ACTION_TYPE.CATEGORIES_UPDATED, payload: newCategories});
            handleEditOpen(false);
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

    const handleAddCategory = () => {
        const beforeCategories = form.getFieldValue('categories');

        console.log('add category before', beforeCategories);

        const afterCategories = [...beforeCategories, {}];
        form.setFieldValue('categories', afterCategories);

        // TODO: @JLD - this does not refresh the existing items, and
    }

    // TODO: @JLD - this doesn't work well on the left button.  works fine on 1080p, but the right side of the button ends up behind the next column.  maybe use a real grid layout here instead of an antd column layout...
    const Footer = () => (
        <Row>
            <Col span={7}>
                <Button onClick={handleAddCategory}>Add Category</Button>
            </Col>
            <Col span={14}></Col>
            <Col span={1} style={{textAlign: 'right'}}>
                <Button htmlType='submit' type="primary" onClick={handleSubmit}>Save</Button>
            </Col>
        </Row>
    );

    const hideMoveUp = () => {

    }

    const hideMoveDown = () => {

    }

    return (
        <Drawer
            width={'25%'}
            title={'Edit Categories'}
            placement={'left'}
            onClose={() => {handleEditOpen(false)}}
            open={open}
            key={'edit-categories-drawer'}
            footer={<Footer />}
        >
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
                                    <Space direction='vertical' style={{width: '100%'}} key={listingCategory.key}>
                                        <div className='category-row-container'>
                                            <Form.Item name={[listingCategory.name, 'name']} label='Category Name:' rules={[{required: true, message:"required"}]} className='category-name'>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item className='category-actions'>
                                                <div className='actions-container'>
                                                    <Popconfirm
                                                        className={`remove-category-action${categoryHasRecipes(listingCategory) ? ' aria-hidden' : ''}`}
                                                        title="Are you sure you want to delete this category?"
                                                        onConfirm={() => deleteCategory(listingCategory, removeCategory)}
                                                        okText="Yes"
                                                        cancelText="No">
                                                        <MinusCircleOutlined hidden={categoryHasRecipes(listingCategory)}/>
                                                    </Popconfirm>
                                                    <UpCircleOutlined className='move-up-action' hidden={listingCategory.name === 0} onClick={() => moveCategory(categoryIndex, categoryIndex - 1)}/>
                                                    <DownCircleOutlined className='move-down-action' hidden={listingCategory.name === categories.categories.length - 1} onClick={() => moveCategory(categoryIndex, categoryIndex + 1)}/>
                                                </div>
                                            </Form.Item>
                                        </div>
                                        <Form.List name={[listingCategory.name, 'recipes']}>
                                            {(listingRecipes, {move: moveRecipe}) => (
                                                <Space direction='vertical' style={{width: '100%'}}>
                                                    {listingRecipes.map((listingRecipe, recipeIndex) => (
                                                        <div className='recipe-row-container' key={listingRecipe.key}>
                                                            <span className='recipe-name' onClick={() => handleSelectRecipe(listingCategory, listingRecipe)}>{form.getFieldValue(['categories', listingCategory.name, 'recipes', listingRecipe.name, 'name'])}</span>
                                                            <div className='recipe-actions'>
                                                                <div className='actions-container'>
                                                                    <UpCircleOutlined className='move-up-action' hidden={listingRecipe.name === 0} onClick={() => moveRecipe(recipeIndex, recipeIndex - 1)}/>
                                                                    <DownCircleOutlined className='move-down-action' hidden={listingRecipe.name === listingRecipes.length - 1} onClick={() => moveRecipe(recipeIndex, recipeIndex + 1)}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </Space>
                                            )}
                                        </Form.List>
                                    </Space>
                                ))}
                            </Space>
                        )}
                    </Form.List>
                </Space>
            </Form>
        </Drawer>
    );
}

export default EditCategories;