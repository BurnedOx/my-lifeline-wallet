import React, { useState } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { Link, Redirect } from 'react-router-dom';
import { useStore, useQuery } from '../../utils/hooks';
import { AuthContext } from '../../store';
import { observer } from 'mobx-react-lite';
import logo from '../../assets/logo.jpeg';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Register: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const authStore = useStore(AuthContext);
    const query = useQuery();
    const refId = query.get("ref");

    const onFinish = async (values: Store) => {
        setLoading(true);
        let { name, mobile, sponsorId, password } = values;
        mobile = parseInt(mobile);
        const user = await authStore.register({ name, mobile, sponsorId, password });
        alert(`id: ${user.id}\npassword: ${password}`);
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
                initialValues={{ remember: true, sponsorId: refId ?? '' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mobile"
                    name="mobile"
                    rules={[{ required: true, message: 'Please input your mobile number!' }]}
                >
                    <Input type='number' />
                </Form.Item>

                <Form.Item
                    label="Sponsor Id"
                    name="sponsorId"
                    rules={[{ required: true, message: 'Please input your sponsor id!' }]}
                >
                    <Input disabled={!!refId} />
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
                    <Button type="primary" loading={loading} htmlType="submit">Register</Button>
                    <span style={{ marginLeft: 16 }}>Or <Link to='/login'>Login now!</Link></span>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(Register);