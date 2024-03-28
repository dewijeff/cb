import React from "react";
import { ListingCategory } from "../../models";
import { Button, Form, FormListFieldData, Input, Space } from "antd";
import { DownOutlined, FileAddFilled, UpOutlined } from "@ant-design/icons";

const something = (category: FormListFieldData) => {
    console.log('category loop', category);
    return(<h3>{[category.name, 'name']}</h3>);
}

interface CategoriesContainer {
    categories: ListingCategory[];
}

interface Props {
    listingCategories: ListingCategory[],
}

const EditCategories = ({listingCategories} : Props) => {  
    const [form] = Form.useForm<CategoriesContainer>();

    // This is dumb but maybe? - nope, it is dumb but it totally works.  form must need an object with names not a collection...
    const categoriesContainer : CategoriesContainer = {
        "categories": listingCategories
    };

    const onFinish = () => {
        console.log('editCategories', form.getFieldsValue());
    };

    const onFinishFailed = () => {
        console.log('failed');
    } 

    return (
        <Form
            form={form}
            name='categoryListForm'
            initialValues={categoriesContainer}
        >
            <Space direction='vertical'>
                <Form.List name='categories'>
                    {(categoryList, {add: addCategory, remove: removeCategory}) => (
                        <Space direction="vertical">
                            {categoryList.map((listingCategory) => (
                                <Space direction='vertical'>
                                    <Form.Item name={[listingCategory.name, 'name']} label='Category Name:' rules={[{required: true, message:"required"}]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.List name={[listingCategory.name, 'recipes']}>
                                        {(listingRecipes) => (
                                            <Space direction='vertical' size='small'>
                                                {listingRecipes.map((listingRecipe) => (
                                                    <Space direction="horizontal">
                                                        <Form.Item name={[listingRecipe.name, 'name']}>
                                                            <Input disabled/>
                                                        </Form.Item>
                                                        <Button><UpOutlined/></Button>
                                                        <Button><DownOutlined/></Button>
                                                    </Space>
                                                ))}
                                            </Space>
                                        )}
                                    </Form.List>
                                </Space>
                            ))}
                        </Space>
                    )}
                </Form.List>
                <Button type="primary" onClick={() => form.submit()}>Save</Button>
            </Space>
        </Form>
    );
}

export default EditCategories;