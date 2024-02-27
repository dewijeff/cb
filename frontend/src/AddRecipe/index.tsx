import React, { useCallback, useEffect, useState } from "react";
import CookbookHeader from "../CookbookHeader";
import { CookbookName, Ingredient, MeasurementUnit, Recipe } from "../models";
import { Button, Form, Input, InputNumber, Layout, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/lib/input/TextArea";

type SelectOption = {
    value: number;
    label: string;
}

const AddRecipe = () => {
    const [ingredients, setIngredients] = useState([{}])
    const [measurementUnits, setMeasurementUnits] = useState([{}]);
    const recipe: Recipe = {
        id: "",
        name: "",
        category: "",
        ingredientGroups: [],
        stepGroups: []
    };
  
    const baseAddress = "https://localhost:7014/"

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

    const getIngredients = useCallback(async () => {
        const response = await fetch(`${baseAddress}cookbook/ingredients/`);

        if (!response.ok)
            return null;

        const ingredients:Ingredient[] = await response.json();
        const options =  ingredients.map((ingredient) => ({value: ingredient.id, label: ingredient.name}));

        return options;
    }, []);

    useEffect(() => {
        getIngredients().then(setIngredients);

        // NOTE: The filter only works if the enum is using a number as the value.
        const measurements = Object.entries(MeasurementUnit).filter(([_, value]) => !isNaN(Number(value))).map(([label, value]) => (
            {
                value: value,
                label: label
            }
        ));

        setMeasurementUnits(measurements)
    }, []);

    console.log(form.getFieldsValue());

// TODO: set width to 100% to make space fill the screen style={{width:'100%'}}

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
                                                                        <Select placeholder="Select an ingredient" options={ingredients}/>
                                                                    </Form.Item>
                                                                    <Form.Item name={[ingredientField.name, 'amount']}>
                                                                        <InputNumber/>
                                                                    </Form.Item>
                                                                    <Form.Item name={[ingredientField.name, 'unit']}>
                                                                        <Select placeholder='Select a unit' options={measurementUnits}/>
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
                                    <Button type="dashed" onClick={() => addIngredientGroup()} block icon={<PlusOutlined />}>
                                        Add ingredient group
                                    </Button>
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
                                            <Space direction="horizontal">
                                                <Form.Item name={[stepGroup.name, 'name']} label='Step Grouping:'>
                                                    <Input/>
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => removeStepGroup(stepGroup.name)}/>
                                            </Space>
                                            <Form.List name={[stepGroup.name, 'steps']}>
                                                {(steps, {add: addStep, remove: removeStep}) => (
                                                    <>
                                                        <Space direction='vertical'>
                                                            {steps.map((step) => (
                                                                <Space direction='horizontal' key={step.key}>
                                                                    <Form.Item name={[step.name, 'title']} label='Title:'>
                                                                        <TextArea rows={4}/>
                                                                    </Form.Item>
                                                                    <Form.Item name={[step.name, 'instructions']} label='Instructions:'>
                                                                        <TextArea rows={4}/>
                                                                    </Form.Item>
                                                                    <Form.Item name={[step.name, 'imagePath']} label='Image Path:'>
                                                                        <Input/>
                                                                    </Form.Item>
                                                                    <MinusCircleOutlined onClick={() => removeStep(step.name)}/>
                                                                </Space>
                                                            ))}
                                                            <Button type="dashed" onClick={() => addStep()} block icon={<PlusOutlined />}>
                                                                Add recipe step
                                                            </Button>
                                                        </Space>
                                                    </>
                                                )}
                                            </Form.List>
                                        </Space>
                                    ))}
                                    <Button type="dashed" onClick={() => addStepGroup()} block icon={<PlusOutlined />}>
                                        Add step group
                                    </Button>
                                </Space>
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