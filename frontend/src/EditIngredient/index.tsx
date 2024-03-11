import { Form, Space, Input, Checkbox, Modal, notification, Spin } from "antd";
import React, { useState } from "react";
import { Ingredient } from "../models";
import { AddDbIngredient } from "../network";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
};

const AddIngredient = ({isOpen, handleClose}: Props) => {
    const [working, setWorking] = useState(false);

    const [form] = Form.useForm<Ingredient>();

    const onFinish = async () => {
        setWorking(true);
        const ingredient = form.getFieldsValue();

        await AddDbIngredient(ingredient);
        console.log('onfinish', ingredient);
        setWorking(false);
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

export default AddIngredient;