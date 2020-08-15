import React, { useState, useEffect, ChangeEvent } from 'react';
import { Drawer, Button, Input, Form, InputNumber, message } from 'antd';
import { BankDetails } from '../../interfaces';
import { useStore } from '../../utils/hooks';
import { AuthContext } from '../../store';

type Props = {
    visible: boolean;
    toggle: () => void;
};

const BankForm: React.FC<Props> = (props) => {
    const [state, setState] = useState<BankDetails>({
        accountName: '',
        bankName: '',
        accountNumber: 0,
        isfc: '',
        accountType: '',
    });
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const authStore = useStore(AuthContext);

    const { user } = authStore;

    useEffect(() => {
        if (user?.bankDetails) {
            setState(user.bankDetails);
            form.setFieldsValue(user.bankDetails);
        } else {
            setState({
                accountName: '',
                bankName: '',
                accountNumber: 0,
                isfc: '',
                accountType: '',
            });
            form.resetFields();
        }
        // eslint-disable-next-line
    }, [props.visible]);

    const onUpdate = async () => {
        setLoading(true);
        try {
            const u = await authStore.updateBankDetails(state);
            message.success('Bank Details Updated!');
            localStorage.setItem('user', JSON.stringify(u));
            props.toggle();
        } finally {
            setLoading(false);
        }
    };

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        const accountName = e.target.value;
        setState(s => ({ ...s, accountName }));
    };

    const onChangeBank = (e: ChangeEvent<HTMLInputElement>) => {
        const bankName = e.target.value;
        setState(s => ({ ...s, bankName }));
    };

    const onChangeNumber = (e: string | number | undefined) => {
        if (e) {
            setState(s => ({ ...s, accountNumber: typeof e === 'string' ? parseInt(e) : e }));
        }
    };

    const onChangeISFC = (e: ChangeEvent<HTMLInputElement>) => {
        const isfc = e.target.value;
        setState(s => ({ ...s, isfc }));
    };

    const onChangeType = (e: ChangeEvent<HTMLInputElement>) => {
        const accountType = e.target.value;
        setState(s => ({ ...s, accountType }));
    };

    return (
        <Drawer
            title="Bank Details"
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
                    <Button loading={loading} onClick={onUpdate} type="primary">Update</Button>
                </div>
            }
        >
            <Form form={form} layout="vertical" hideRequiredMark>
                <Form.Item
                    name="accountName"
                    label="Account Holder Name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input
                        placeholder="Please enter your name"
                        onChange={onChangeName} />
                </Form.Item>
                <Form.Item
                    name="bankName"
                    label="Bank Name"
                    rules={[{ required: true, message: 'Please enter bank name' }]}
                >
                    <Input
                        placeholder="Please enter bank name"
                        onChange={onChangeBank} />
                </Form.Item>
                <Form.Item
                    name="accountNumber"
                    label="Account Number"
                    rules={[{ required: true, message: 'Please enter account number' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Please enter account number"
                        onChange={onChangeNumber} />
                </Form.Item>
                <Form.Item
                    name="isfc"
                    label="ISF Code"
                    rules={[{ required: true, message: 'Please enter ISFC' }]}
                >
                    <Input
                        placeholder="Please enter ISFC"
                        onChange={onChangeISFC} />
                </Form.Item>
                <Form.Item
                    name="accountType"
                    label="Account Type"
                    rules={[{ required: true, message: 'Please enter account type' }]}
                >
                    <Input
                        placeholder="Account type (eg.: Savings)"
                        onChange={onChangeType} />
                </Form.Item>
            </Form>
        </Drawer>
    );
}

export default BankForm;