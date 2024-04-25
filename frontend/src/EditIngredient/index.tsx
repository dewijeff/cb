import {Form, Space, Input, Checkbox, Modal, notification, Spin, message, Select} from "antd";
import React, {useContext, useEffect, useState} from "react";
import { Ingredient } from "../Shared/models";
import { AddDbIngredient, GetDbIngredients } from "../Shared/network";
import {CookbookDispatchContext, REDUCER_ACTION_TYPE, CookbookStateContext, CookbookState} from "../Shared/CookbookReducer";
import {MeasurementUnit} from "../Shared/constants";

const EditIngredient = () => {
    const [working, setWorking] = useState(false);
    const [measurementUnits, setMeasurementUnits] = useState([{}]);

    const cookbookDispatch = useContext(CookbookDispatchContext)
    const cookbookState : CookbookState = useContext(CookbookStateContext);

    const [form] = Form.useForm<Ingredient>();

    useEffect(() => {
        const measurements = Object.entries(MeasurementUnit).filter(([_, value]) => !isNaN(Number(value))).map(([label, value]) => (
            {
                value: value,
                label: label
            }
        ));

        setMeasurementUnits(measurements);
    }, []);

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
        cookbookDispatch({type: REDUCER_ACTION_TYPE.EDIT_INGREDIENT_OPEN, payload: false});
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
        <Modal title="Add Ingredient" open={cookbookState.editIngredientOpen} onCancel={() => cookbookDispatch({type: REDUCER_ACTION_TYPE.EDIT_INGREDIENT_OPEN, payload: false})} onOk={() => form.submit()} okText='Add Ingredient'>
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
                        <Form.Item label='Calories Per Serving' name='calPerServing'>
                            <Input/>
                        </Form.Item>
                        <Form.Item label='Sodium mg Per Serving' name='sodiumMgPerServing'>
                            <Input/>
                        </Form.Item>
                        <Form.Item label='Grams Per Serving' name='gramsPerServing'>
                            <Input/>
                        </Form.Item>
                        <Form.Item label='Volume Per Serving' name='volumePerServing'>
                            <Input/>
                        </Form.Item>
                        <Form.Item label='Volume Per Serving Units' name='volumePerServingUnit'>
                            <Select dropdownMatchSelectWidth={false} style={{width: "15rem"}} placeholder='Select a unit' options={measurementUnits}/>
                        </Form.Item>
                    </Space>
                </Form>
            </Spin>
        </Modal>
    );
};

export default EditIngredient;