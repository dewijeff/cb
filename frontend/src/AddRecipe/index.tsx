import React from "react";
import CookbookHeader from "../CookbookHeader";
import { CookbookName, Recipe } from "../models";
import { Button, Form, Input, Layout, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const AddRecipe = () => {
    const recipe: Recipe = {
        id: "",
        name: "",
        category: "",
        ingredientGroups: [],
        stepGroups: []
    };
  
    const [form] = Form.useForm<Recipe>();
    const onFinish = () => {
        // I believe this is where the call to the api to save happens.

        console.log('formdata', form.getFieldsValue());
        // take you back to the home page with the main recipe selected?
    };

    const onFinishFailed = (errorinfo: any) => {
        console.log('Failed:', errorinfo);
        // toast - not updated
    };



    // TODO: @JXD - Get Ingredients from DB
    // TODO: @JXD - Build Units select options from enum

    console.log(form.getFieldsValue());

    return(
        <Layout>
            <CookbookHeader cookbookName={CookbookName} />
            <h2>Add a recipe</h2>
            <Form
                form={form}
                name="AddRecipe"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Space direction='vertical'>
                        <Form.Item 
                        label="Recipe Name:"
                        name="name"
                        rules={[{required: true, message: 'Please input a recipe name'}]}>
                        <Input />
                    </Form.Item>
                    <h3>Ingredients</h3>
                    <Form.List name="ingredientGroups">
                        {(ingredientGroups, {add: addIngredientGroup, remove: removeIngredientGroup}) => (
                            <>
                                <Space direction='vertical'>
                                    {ingredientGroups.map((ingredientGroup) => (
                                        <Space direction='vertical' key={ingredientGroup.key}>
                                            <Space direction='horizontal'>
                                                <Form.Item name={[ingredientGroup.name, 'name']} label='Group Name:'>
                                                    <Input />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => removeIngredientGroup(ingredientGroup.name)} />
                                            </Space>
                                            <Form.List name={[ingredientGroup.name, 'recipeIngredients']}>
                                                {(recipeIngredients, {add: addIngredient, remove: removeIngredient}) => (
                                                    <>
                                                        <Space direction='vertical' size='small'>
                                                            {recipeIngredients.map((ingredientField) => (
                                                                <Space direction="horizontal" key={ingredientField.key}>
                                                                    <Form.Item name={[ingredientField.name, 'ingredientId']}>
                                                                        <Select placeholder="Select an ingredient" options={[
                                                                            {value:1, label: 'Flour'},
                                                                            {value:2, label: 'Water'},
                                                                            {value:3, label: 'Sugar'},
                                                                            {value:4, label: 'Milk'},
                                                                            {value:5, label: 'Butter'},
                                                                            {value:6, label: 'Unsalted Butter'},
                                                                            {value:7, label: 'Sodium Free Baking Powder'},
                                                                            {value:8, label: 'Eggs'},
                                                                            {value:9, label: 'Salt'}
                                                                        ]}/>
                                                                    </Form.Item>
                                                                    <Form.Item name={[ingredientField.name, 'amount']}>
                                                                        <Input />
                                                                    </Form.Item>
                                                                    <Form.Item name={[ingredientField.name, 'unit']}>
                                                                        <Select placeholder='Select a unit' options={[
                                                                            {value: 1, label: 'Grams'},
                                                                            {value: 2, label: 'Cups'},
                                                                            {value: 3, label: 'Tablespoons'},
                                                                            {value: 4, label: 'Teaspoons'}
                                                                        ]}/>
                                                                    </Form.Item>                                                          
                                                                <MinusCircleOutlined onClick={() => removeIngredient(ingredientField.name)} />
                                                            </Space>
                                                            ))}
                                                        </Space>
                                                        <Button type="dashed" onClick={() => addIngredient()} block icon={<PlusOutlined />}>
                                                            Add ingredient
                                                        </Button>
                                                    </>
                                                )}
                                            </Form.List>
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => addIngredientGroup()} block icon={<PlusOutlined />}>
                                            Add ingredient group
                                        </Button>
                                    </Form.Item>
                                </Space>
                            </>
                        )}
                    </Form.List>
                    <h3>Steps</h3>
                    <Form.List name="stepGroups">
                        {(stepGroups, {add: addStepGroup, remove: removeStepGroup }) => (
                            <>
                                <Space direction='vertical'>
                                    {stepGroups.map((stepGroup) => (
                                        <Space direction='vertical' key={stepGroup.key}>
                                            <Form.Item name={[stepGroup.name, 'name']} label='Step Grouping:'>
                                                <Input/>
                                            </Form.Item>
                                            <Form.List name={[stepGroup.name, 'steps']}>
                                                {(steps, {add: addStep, remove: removeStep}) => (
                                                    <>
                                                        <Space direction='vertical'>
                                                            {steps.map((step) => (
                                                                <Space direction='horizontal' key={step.key}>
                                                                    <Form.Item name={[step.name, 'title']} label='Title:'>
                                                                        <Input/>
                                                                    </Form.Item>
                                                                    <Form.Item name={[step.name, 'instructions']} label='Instructions:'>
                                                                        <Input/>
                                                                    </Form.Item>
                                                                    <Form.Item name={[step.name, 'imagePath']} label='Image Path:'>
                                                                        <Input/>
                                                                    </Form.Item>
                                                                    <MinusCircleOutlined onClick={() => removeStep(step.name)}/>
                                                                </Space>
                                                            ))}
                                                            <Form.Item>
                                                                <Button type="dashed" onClick={() => addStep()} block icon={<PlusOutlined />}>
                                                                    Add recipe step
                                                                </Button>
                                                            </Form.Item>
                                                        </Space>
                                                    </>
                                                )}
                                            </Form.List>
                                        </Space>
                                    ))}
                                </Space>
                                <Form.Item>
                                    <Button type="dashed" onClick={() => addStepGroup()} block icon={<PlusOutlined />}>
                                        Add step group
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </Layout>
    );
}

export default AddRecipe;