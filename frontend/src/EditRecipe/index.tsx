import React, {useContext, useEffect, useState} from "react";
import {Recipe} from "../Shared/models";
import {Button, Drawer, Form, Input, InputNumber, notification, Select, Space, Spin} from "antd";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import TextArea from "antd/lib/input/TextArea";
import {AddDbRecipe, EditDbRecipe, GetDbCategories, GetDbIngredients} from "../Shared/network";
import {
    CookbookDispatchContext,
    CookbookState,
    CookbookStateContext,
    REDUCER_ACTION_TYPE
} from "../Shared/CookbookReducer";
import {MeasurementUnit} from "../Shared/constants";

// initial recipe has no 
const initialRecipe: Recipe = {
    id: null,
    name: null,
    categoryId: null,
    ingredientGroups: [
        {
            name: null,
            recipeIngredients: [
                {
                    ingredientId: null,
                    amount: null,
                    unit: null,
                    ingredient: null,
                    note: null
                },
            ]
        }
    ],
    stepGroups: [
        {
            name: null,
            steps: [
                {
                    title: null,
                    instructions: null,
                    imagePath: null
                }
            ]
        }
    ],
    servings: null
}

const EditRecipe = () => {
    // const [ingredients, setIngredients] = useState([{}]);
    const [categories, setCategories] = useState([{}]);
    const [recipe, setRecipe] = useState<Recipe>(null);
    const [measurementUnits, setMeasurementUnits] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [working, setWorking] = useState(false);
    // const [initialLoad, setInitialLoad] = useState(true);
    const cookbookDispatch = useContext(CookbookDispatchContext);
    const cookbookState: CookbookState = useContext(CookbookStateContext);

    const [form] = Form.useForm<Recipe>();

    const handleCancel = () => {
        form.resetFields();
        form.setFieldsValue(initialRecipe);
        cookbookDispatch({type: REDUCER_ACTION_TYPE.EDIT_RECIPE_OPEN, payload: false});
    };

    const handleAddIngredient = () => {
        cookbookDispatch({type: REDUCER_ACTION_TYPE.EDIT_INGREDIENT_OPEN, payload: true});
    }

    const onFinish = async () => {
        setWorking(true);

        const recipe = form.getFieldsValue();
        recipe.id = cookbookState.editRecipeOpen.recipe?.id;

        if (!cookbookState.editRecipeOpen.recipe) {
            const recipeResult = await AddDbRecipe(recipe);
            cookbookDispatch({type: REDUCER_ACTION_TYPE.SET_SELECTED_RECIPE_ID, payload: recipeResult.id});
        } else {
            const recipeResult = await EditDbRecipe(recipe);
            cookbookDispatch({type: REDUCER_ACTION_TYPE.SET_RECIPE, payload: recipeResult});
        }

        setWorking(false);
        cookbookDispatch({type: REDUCER_ACTION_TYPE.EDIT_RECIPE_OPEN, payload: {isOpen: false, recipeId: null}});
        form.resetFields();
        form.setFieldsValue(initialRecipe);
    };

    const onFinishFailed = (errorinfo: any) => {
        console.log('Failed:', errorinfo);
        notification['error']({
            message: 'Changes not saved',
            description: 'There was an error saving. Please try again later.',
        });
        setWorking(false);
        cookbookDispatch({type: REDUCER_ACTION_TYPE.EDIT_RECIPE_OPEN, payload: {isOpen: false, recipeId: null}});
        form.resetFields();
        form.setFieldsValue(initialRecipe);
    };

    useEffect(() => {
        if (!cookbookState.editRecipeOpen.isOpen)
            return;

        setLoading(true);
        if (cookbookState.editRecipeOpen.isOpen && !!cookbookState.editRecipeOpen.recipe) {
            setRecipe(cookbookState.editRecipeOpen.recipe);
            form.setFieldsValue(cookbookState.editRecipeOpen.recipe);
            // GetDbRecipe(cookbookState.editRecipeOpen.recipe)
            // .then(setRecipe);
        }
        setLoading(false);
    }, [cookbookState.editRecipeOpen]);

    useEffect(() => {
        setLoading(true);

        // TODO: How to get this dataloading and updating somewhere useful.  maybe this can be done with react-query and cache invalidation?
        GetDbIngredients()
            .then((ingredients) => ingredients.map((ingredient) => ({value: ingredient.id, label: ingredient.name})))
            .then((ingredients) => {
                cookbookDispatch({type: REDUCER_ACTION_TYPE.INGREDIENTS_UPDATED, payload: ingredients})
            });

        GetDbCategories()
            .then((categories) => categories.map((category) => ({value: category.id, label: category.name})))
            .then(setCategories);

        setRecipe(initialRecipe);

        // NOTE: The filter only works if the enum is using a number as the value.
        const measurements = Object.entries(MeasurementUnit).filter(([_, value]) => !isNaN(Number(value))).map(([label, value]) => (
            {
                value: value,
                label: label
            }
        ));

        setMeasurementUnits(measurements);
        setLoading(false);
        // setInitialLoad(false);
    }, []);

    const showSpin = loading || working;

    console.log(cookbookState.editRecipeOpen);
    console.log(recipe);

    return (
        <Drawer
            width={'100%'}
            title='Add Recipe'
            open={cookbookState.editRecipeOpen.isOpen}
            onClose={handleCancel} extra={
            <Space>
                <Button onClick={handleAddIngredient}>Add Ingredient</Button>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={() => form.submit()} type="primary" htmlType="submit">
                    Save
                </Button>
            </Space>
        }>
            <Spin spinning={showSpin}>
                {loading ? (
                    <>
                    </>
                ) : (
                    <Form
                        form={form}
                        name="AddRecipe"
                        initialValues={recipe}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <Space direction='vertical'>
                            <Space direction='horizontal'>
                                <Form.Item
                                    label="Recipe Name:"
                                    name='name'
                                    rules={[{required: true, message: 'Please input a recipe name'}]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    label='Recipe Category:'
                                    name='categoryId'
                                    rules={[{required: true, message: "required"}]}>
                                    <Select dropdownMatchSelectWidth={false} style={{width: "15rem"}}
                                            placeholder="Select a category" options={categories}/>
                                </Form.Item>
                                <Form.Item
                                    label='Servings:'
                                    name='servings'>
                                    <Input/>
                                </Form.Item>
                            </Space>
                            <h3>Ingredients</h3>
                            <Form.List name="ingredientGroups">
                                {(ingredientGroups, {add: addIngredientGroup, remove: removeIngredientGroup}) => (
                                    <>
                                        <Space direction='vertical'>
                                            {ingredientGroups.map((ingredientGroup) => (
                                                <Space direction='vertical' key={ingredientGroup.key}>
                                                    <Space direction='horizontal' align="center">
                                                        <Form.Item name={[ingredientGroup.name, 'name']}
                                                                   label='Group Name:'
                                                                   rules={[{required: true, message: "required"}]}>
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item>
                                                            <MinusCircleOutlined
                                                                onClick={() => removeIngredientGroup(ingredientGroup.name)}/>
                                                        </Form.Item>
                                                    </Space>
                                                    <Form.List name={[ingredientGroup.name, 'recipeIngredients']}>
                                                        {(recipeIngredients, {
                                                            add: addIngredient,
                                                            remove: removeIngredient
                                                        }) => (
                                                            <>
                                                                <Space direction='vertical' size='small'>
                                                                    {recipeIngredients.map((ingredientField) => (
                                                                        <Space direction="horizontal"
                                                                               key={ingredientField.key}>
                                                                            <Form.Item
                                                                                name={[ingredientField.name, 'ingredientId']}
                                                                                rules={[{
                                                                                    required: true,
                                                                                    message: "required"
                                                                                }]}>
                                                                                <Select dropdownMatchSelectWidth={false}
                                                                                        style={{width: "15rem"}}
                                                                                        placeholder="Select an ingredient"
                                                                                        options={cookbookState.ingredients}/>
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                name={[ingredientField.name, 'amount']}
                                                                                rules={[{
                                                                                    required: true,
                                                                                    message: "required"
                                                                                }]}>
                                                                                <InputNumber/>
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                name={[ingredientField.name, 'unit']}
                                                                                rules={[{
                                                                                    required: true,
                                                                                    message: "required"
                                                                                }]}>
                                                                                <Select dropdownMatchSelectWidth={false}
                                                                                        style={{width: "15rem"}}
                                                                                        placeholder='Select a unit'
                                                                                        options={measurementUnits}/>
                                                                            </Form.Item>
                                                                            <Form.Item>
                                                                                <MinusCircleOutlined
                                                                                    onClick={() => removeIngredient(ingredientField.name)}/>
                                                                            </Form.Item>
                                                                        </Space>
                                                                    ))}
                                                                </Space>
                                                                <Button type="dashed" onClick={() => addIngredient()}
                                                                        block icon={<PlusOutlined/>}>
                                                                    Add ingredient
                                                                </Button>
                                                            </>
                                                        )}
                                                    </Form.List>
                                                </Space>
                                            ))}
                                            <Button type="dashed" onClick={() => addIngredientGroup()} block
                                                    icon={<PlusOutlined/>}>
                                                Add ingredient group
                                            </Button>
                                        </Space>
                                    </>
                                )}
                            </Form.List>
                            <h3>Steps</h3>
                            <Form.List name="stepGroups">
                                {(stepGroups, {add: addStepGroup, remove: removeStepGroup}) => (
                                    <>
                                        <Space direction='vertical'>
                                            {stepGroups.map((stepGroup) => (
                                                <Space direction='vertical' key={stepGroup.key}>
                                                    <Space direction="horizontal">
                                                        <Form.Item name={[stepGroup.name, 'name']}
                                                                   label='Step Grouping:'
                                                                   rules={[{required: true, message: "required"}]}>
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item>
                                                            <MinusCircleOutlined
                                                                onClick={() => removeStepGroup(stepGroup.name)}/>
                                                        </Form.Item>
                                                    </Space>
                                                    <Form.List name={[stepGroup.name, 'steps']}>
                                                        {(steps, {add: addStep, remove: removeStep}) => (
                                                            <>
                                                                <Space direction='vertical'>
                                                                    {steps.map((step) => (
                                                                        <Space direction='horizontal' key={step.key}
                                                                               style={{alignItems: 'start'}}>
                                                                            <Form.Item name={[step.name, 'title']}
                                                                                       label='Title:' rules={[{
                                                                                required: true,
                                                                                message: "required"
                                                                            }]}>
                                                                                <TextArea rows={4}
                                                                                          style={{width: '25rem'}}/>
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                name={[step.name, 'instructions']}
                                                                                label='Instructions:'>
                                                                                <TextArea rows={4}
                                                                                          style={{width: '25rem'}}/>
                                                                            </Form.Item>
                                                                            <Form.Item name={[step.name, 'imagePath']}
                                                                                       label='Image Path:'>
                                                                                <Input style={{width: '25rem'}}/>
                                                                            </Form.Item>
                                                                            <Form.Item>
                                                                                <MinusCircleOutlined
                                                                                    onClick={() => removeStep(step.name)}/>
                                                                            </Form.Item>
                                                                        </Space>
                                                                    ))}
                                                                    <Button type="dashed" onClick={() => addStep()}
                                                                            block icon={<PlusOutlined/>}>
                                                                        Add recipe step
                                                                    </Button>
                                                                </Space>
                                                            </>
                                                        )}
                                                    </Form.List>
                                                </Space>
                                            ))}
                                            <Button type="dashed" onClick={() => addStepGroup()} block
                                                    icon={<PlusOutlined/>}>
                                                Add step group
                                            </Button>
                                        </Space>
                                    </>
                                )}
                            </Form.List>
                        </Space>
                    </Form>
                )}
            </Spin>
        </Drawer>
    );
};

export default EditRecipe;