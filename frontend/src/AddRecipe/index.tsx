import React from "react";
import CookbookHeader from "../CookbookHeader";
import { CookbookName, Recipe } from "../models";
import { Button, Form, Input, Layout, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const AddRecipe = () => {
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
                <Form.Item 
                    label="Recipe Name:"
                    name="name"
                    rules={[{required: true, message: 'Please input a recipe name'}]}>
                    <input/>
                </Form.Item>
                <Form.List name="ingredientGroups">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space key={key}>
                                    <Form.Item {...restField}
                                        name={[name, 'ingredientGroupName']}>
                                        <Input />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                    fields.
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add ingredient group
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
            </Form>
        </Layout>
    );
}

export default AddRecipe;