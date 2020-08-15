import React, { useState, useEffect, useRef } from 'react';
import { Drawer, Button, Input, Form, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import Api from '../../api';

type Props = {
    visible: boolean;
    toggle: () => void;
};

type State = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const Password: React.FC<Props> = (props) => {
    const [state, setState] = useState<State>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const formRef = useRef<FormInstance>(null);

    const { oldPassword, newPassword, confirmPassword } = state;

    useEffect(() => {
        setState({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
        formRef.current?.resetFields();
    }, [props.visible]);

    const handleChange = async () => {
        if (newPassword !== confirmPassword) {
            return message.error('Confirm Password didn\'t match');
        }
        setLoading(true);
        try {
            await Api.changePassword({ oldPassword, newPassword });
            message.success('Password Changed!');
            props.toggle();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer
            title="Change Password"
            width={320}
            onClose={props.toggle}
            visible={props.visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={props.toggle} style={{ marginRight: 8 }}>Cancel</Button>
                    <Button loading={loading} onClick={handleChange} type="primary">Change</Button>
                </div>
            }
        >
            <Form ref={formRef} layout="vertical" hideRequiredMark>
                <Form.Item
                    name="oldPass"
                    label="Old Password"
                    rules={[{ required: true, message: 'Please enter old password' }]}
                >
                    <Input
                        type='password'
                        placeholder="Please enter old password"
                        value={oldPassword}
                        onChange={(e) => setState(s => ({ ...s, oldPassword: e.target.value }))} />
                </Form.Item>
                <Form.Item
                    name="newPass"
                    label="New Password"
                    rules={[{ required: true, message: 'Please enter new password' }]}
                >
                    <Input
                        type='password'
                        placeholder="Please enter new password"
                        value={newPassword}
                        onChange={(e) => setState(s => ({ ...s, newPassword: e.target.value }))} />
                </Form.Item>
                <Form.Item
                    name="confirmPass"
                    label="Confirm New Password"
                    rules={[{ required: true, message: 'Please confirm new password' }]}
                >
                    <Input
                        type='password'
                        placeholder="Please confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setState(s => ({ ...s, confirmPassword: e.target.value }))} />
                </Form.Item>
            </Form>
        </Drawer>
    );
}

export default Password;