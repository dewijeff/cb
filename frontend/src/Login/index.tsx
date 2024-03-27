import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Space, Spin } from "antd";
import { LoginUser, VerifyAuth } from "../network";
import { useNavigate } from "react-router-dom";
import { JwtTokenName, UserLogin } from "../models";
import { jwtDecode } from "jwt-decode";
import { CookbookDispatchContext, REDUCER_ACTION_TYPE } from "../CookbookReducer";

interface Claims {
    canEdit: boolean;
    email: string;
}

interface Props {
    switchUser: boolean;
}

const Login = ({switchUser}: Props) => {
    const [showSpin, setShowSpin] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string>(null);
    const cookbookDispatch = useContext(CookbookDispatchContext);
    
    const [form] = Form.useForm<UserLogin>();

    const navigate = useNavigate();

    const checkAuth = async (token: string) => {
        const authVerified = await VerifyAuth();

        if (authVerified)
        {
            // user is authorized still - send them to home
            cookbookDispatch({type: REDUCER_ACTION_TYPE.AUTHENTICATED, payload: true });
            handleClaims(token);
            navigate('/cookbook/');
        }
        setShowSpin(false);
        // user is not authorized - make them log in
    }

    useEffect(()  => {
        if (switchUser)
            return;

        // TODO: Check for jwt
        const localToken = localStorage.getItem(JwtTokenName);
        if (localToken)
        {
            checkAuth(localToken);
        }
    }, []);
    // ALSO TODO: should this use a cookie or local storage.  local storage and append header manually seems easier to me, but http only cookie seems more secure - look into this later

    const handleClaims = (token: string) => {
        const claims : Claims = jwtDecode(token);
        const allowEdit = claims.canEdit; // decoded.claims.something?

        cookbookDispatch({type: REDUCER_ACTION_TYPE.ALLOW_EDIT, payload: allowEdit})
    }

    const onFinish = async() => {
        setShowSpin(true);
        const login = form.getFieldsValue();

        await LoginUser(handleClaims, login)
            .then((response) => {
                setShowSpin(false);
                if (response)
                {
                    setErrorMessage(response);
                }

                cookbookDispatch({type: REDUCER_ACTION_TYPE.AUTHENTICATED, payload: true });
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

    // TODO: @JLD - make this pretty
    return (
        <Spin spinning={showSpin}>
            {!showSpin ? (
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
            ) :
            (<div>Loading</div>)}
        </Spin>
    );
}

export default Login;