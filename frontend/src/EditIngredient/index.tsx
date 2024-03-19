import { Form, Space, Input, Checkbox, Modal, notification, Spin, message } from "antd";
import React, { useContext, useState } from "react";
import { Ingredient } from "../models";
import { AddDbIngredient, GetDbIngredients } from "../network";
import { CookbookDispatchContext, REDUCER_ACTION_TYPE } from "../CookbookReducer";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
};

const EditIngredient = ({isOpen, handleClose}: Props) => {
    const [working, setWorking] = useState(false);
    const cookbookDispatch = useContext(CookbookDispatchContext)
    
    const [form] = Form.useForm<Ingredient>();

    const onFinish = async () => {
        setWorking(true);
        const ingredient = form.getFieldsValue();

        try{
            await AddDbIngredient(ingredient);

            // update ingredients
            GetDbIngredients()
                .then((ingredients) => ingredients.map((ingredient) => ({value: ingredient.id, label: ingredient.name})))
                .then((ingredients) => {cookbookDispatch({type: REDUCER_ACTION_TYPE.INGREDIENTS_UPDATED, payload: ingredients})});
        } 
        catch (ex)
        {
            message.error(ex.message);
        } 
        finally 
        {
            setWorking(false);
        }

        form.resetFields();
        handleClose();
    }

    const onFinishFailed = (errorinfo: any) => {
        const something = form.getFieldsValue();
        console.log('onfinish', something);
        setWorking(false);

        notification['error']({
            message: 'Changes not saved',
            description: 'There was an error saving. Please try again later.',
        });
    }

    return (
        <Modal title="Add Ingredient" open={isOpen} onCancel={handleClose} onOk={() => form.submit()} okText='Add Ingredient'> 
            <Spin spinning={working}>
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
                    </Space>
                </Form>
            </Spin>
        </Modal>
    );
};

export default EditIngredient;