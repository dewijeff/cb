import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Layout, Space, Spin } from "antd";
import { LoginUser, VerifyAuth } from "../Shared/network";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CookbookDispatchContext, REDUCER_ACTION_TYPE } from "../Shared/CookbookReducer";
import CookbookHeader from "../CookbookHeader";
import {UserLogin} from "../Shared/models";
import {JwtTokenName} from "../Shared/constants";

const { Content, Sider } = Layout;

interface Claims {
    canEdit: boolean;
    email: string;
}

interface Props {
    switchUser: boolean;
}

const Login = ({switchUser}: Props) => {
    const [showSpin, setShowSpin] = useState(true);
    const [showLoginSpin, setShowLoginSpin] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>(null);
    const cookbookDispatch = useContext(CookbookDispatchContext);
    
    const [form] = Form.useForm<UserLogin>();

    const navigate = useNavigate();

    const checkAuth = async (token: string) => {
        let authVerified = false;
        try {
            authVerified = await VerifyAuth();
        }
        catch (e)
        {
            setShowSpin(false);
            setErrorMessage('Error verifying authorization - is the api running?');
        }

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
        } else {
            setShowSpin(false);
        }
    }, []);
    // ALSO TODO: should this use a cookie or local storage.  local storage and append header manually seems easier to me, but http only cookie seems more secure - look into this later

    const handleClaims = (token: string) => {
        const claims : Claims = jwtDecode(token);
        const allowEdit = claims.canEdit; // decoded.claims.something?

        cookbookDispatch({type: REDUCER_ACTION_TYPE.ALLOW_EDIT, payload: allowEdit})
    }

    const onFinish = async() => {
        setShowLoginSpin(true);
        const login = form.getFieldsValue();

        await LoginUser(handleClaims, login)
            .then((response) => {
                setShowLoginSpin(false);
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
                setErrorMessage(ex.message);
                setShowLoginSpin(false);
            });
    };

    const onFinishFailed = () =>
    {
        setShowLoginSpin(false);
    }

    // TODO: @JLD - make this pretty
    return (
        <Layout>
            <CookbookHeader cookbookName={null}/>
            <Content style={{height: "100%"}}>
                <Spin spinning={showSpin}>
                    {!showSpin ? (
                        <div className="form-container" style={{paddingTop: "1em", paddingLeft: "4em", height: "100%"}}>
                            <Spin spinning={showLoginSpin}>
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
                                        <Button htmlType='submit' type='primary' onClick={form.submit}>Login</Button>
                                        {errorMessage}
                                    </Space>
                                </Form>
                            </Spin>
                        </div>

                    ) :
                    (<div>Loading</div>)}
                </Spin>
            </Content>
        </Layout>
    );
}

export default Login;