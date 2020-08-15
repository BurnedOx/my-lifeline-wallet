import React, { useState, useEffect, ChangeEvent } from 'react';
import { Drawer, Button, Input, Form, message, InputNumber } from 'antd';
import { ProfileUpdateDTO } from '../../interfaces';
import { useStore } from '../../utils/hooks';
import { AuthContext } from '../../store';
import { observer } from 'mobx-react-lite';

type Props = {
    visible: boolean;
    toggle: () => void;
};

const ProfileForm: React.FC<Props> = (props) => {
    const [state, setState] = useState<ProfileUpdateDTO>({
        name: '',
        mobile: 0,
        panNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const authStore = useStore(AuthContext);
    const [form] = Form.useForm();

    const { user } = authStore;

    useEffect(() => {
        if (user) {
            setState({
                name: user.name,
                mobile: parseInt(`${user.mobile}`),
                panNumber: user.panNumber ?? undefined,
            });
            form.setFieldsValue({
                name: user.name,
                mobile: user.mobile,
                panNumber: user.panNumber ?? '',
            });
        }
        // eslint-disable-next-line
    }, [props.visible]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const u = await authStore.updateProfile(state);
            message.success('Profile Updated!');
            localStorage.setItem('user', JSON.stringify(u));
            props.toggle();
        } finally {
            setLoading(false);
        }
    };

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setState(s => ({ ...s, name }));
    };

    const onChangeMobile = (e: string | number | undefined) => {
        if (e) {
            setState(s => ({ ...s, mobile: typeof e === 'string' ? parseInt(e) : e }));
        }
    }

    const onChangePan = (e: ChangeEvent<HTMLInputElement>) => {
        const panNumber = e.target.value;
        setState(s => ({ ...s, panNumber }));
    };

    return (
        <Drawer
            title="Edit Profile"
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
                    <Button loading={loading} onClick={handleUpdate} type="primary">Update</Button>
                </div>
            }
        >
            <Form form={form} layout="vertical" hideRequiredMark>
                <Form.Item
                    name="name"
                    label="Name"
                >
                    <Input
                        placeholder="Please enter your name"
                        onChange={onChangeName} />
                </Form.Item>
                <Form.Item
                    name="mobile"
                    label="Mobile Number"
                >
                    <InputNumber
                        placeholder="Please enter mobile number"
                        style={{ width: '100%' }}
                        onChange={onChangeMobile} />
                </Form.Item>
                <Form.Item
                    name="panNumber"
                    label="Pan Card Number"
                >
                    <Input
                        placeholder="Please enter Pan Card Number"
                        onChange={onChangePan} />
                </Form.Item>
            </Form>
        </Drawer>
    );
}

export default observer(ProfileForm);