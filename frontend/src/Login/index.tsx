import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Spin } from "antd";
import { LoginUser, VerifyAuth } from "../network";
import { useNavigate } from "react-router-dom";
import { JwtTokenName, UserLogin } from "../models";

interface Props {
    switchUser: boolean;
}

const Login = ({switchUser}: Props) => {
    const [showSpin, setShowSpin] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>(null);

    const [form] = Form.useForm<UserLogin>();

    const navigate = useNavigate();

    const checkAuth = async () => {
        return await VerifyAuth();
    }

    useEffect(()  => {
        if (switchUser)
            return;

        // TODO: Check for jwt
        const localToken = localStorage.getItem(JwtTokenName);
        if (localToken)
        {
            // user is authorized still - send them to home
            if (checkAuth)
            {
                navigate('/cookbook/');
            }
            // user is not authorized - make them log in
        }
    }, []);
    // ALSO TODO: should this use a cookie or local storage.  local storage and append header manually seems easier to me, but http only cookie seems more secure - look into this later

    const onFinish = async() => {
        setShowSpin(true);
        const login = form.getFieldsValue();

        await LoginUser(login)
            .then((response) => {
                setShowSpin(false);
                if (response)
                {
                    setErrorMessage(response);
                }

                // redirect to home
                navigate('/cookbook/');
            })
            .catch((ex) => {
                console.log(ex);
                setErrorMessage(ex);
                setShowSpin(false);
            });
    };

    const onFinishFailed = () =>
    {
        setShowSpin(false);
    }

    return (
        <Spin spinning={showSpin}>
            <Form
                form={form}
                name="Login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Space direction='vertical'>
                    <Form.Item label='Email:' name='email'>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Password:' name='password'>
                        <Input.Password placeholder='input password'/>
                    </Form.Item>
                    <Button type='primary' onClick={form.submit}>Login</Button>
                    {errorMessage}
                </Space>
            </Form>
        </Spin>
    );
}

export default Login;