import React, { useState } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { Link, Redirect } from 'react-router-dom';
import { useStore } from '../../utils/hooks';
import { AuthContext } from '../../store';
import { observer } from 'mobx-react-lite';
import logo from '../../assets/logo.png';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const authStore = useStore(AuthContext);

    const onFinish = async (values: Store) => {
        setLoading(true);
        const { userId, password } = values;
        await authStore.login({ userId, password });
        setLoading(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (authStore.user) return <Redirect to='' />

    return (
        <div className='auth'>
            <figure className='logo-image'>
                <img src={logo} alt='Logo' />
            </figure>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="User Id"
                    name="userId"
                    rules={[{ required: true, message: 'Please input your user id!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" loading={loading} htmlType="submit">Login</Button>
                    <span style={{ marginLeft: 16 }}>Or <Link to="/register">register now!</Link></span>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(Login);