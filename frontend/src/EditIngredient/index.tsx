import { Layout, Form, Space, Button, Input, Checkbox } from "antd";
import React from "react";
import CookbookHeader from "../CookbookHeader";
import { CookbookName, Ingredient } from "../models";
import { AddDbIngredient } from "../network";


const AddIngredient = () => {
    const [form] = Form.useForm<Ingredient>()

    const onFinish = async () => {
        const ingredient = form.getFieldsValue();

        await AddDbIngredient(ingredient);
        console.log('onfinish', ingredient);

    }

    const onFinishFailed = (errorinfo: any) => {
        const something = form.getFieldsValue();
        console.log('onfinish', something);
    }

    return (
        <Layout>
            <CookbookHeader cookbookName={CookbookName} />
            <h2>Add an ingredient</h2>
            <Form
                style={{marginLeft: '10'}}
                form={form}
                name="AddIngredient"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Space direction='vertical'>
                    <Space direction='horizontal'>
                    <Form.Item label='Ingredient Name' name='name'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Hide units' name='hideUnit' valuePropName='checked'>
                        <Checkbox />
                    </Form.Item>
                    </Space>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Space>
            </Form>
        </Layout>
    );
};

export default AddIngredient;