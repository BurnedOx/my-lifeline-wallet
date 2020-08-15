import { Form, Input, Button, Typography, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './WithdrawalFund.scss';
import { Store } from 'antd/lib/form/interface';
import { useStore } from '../../utils/hooks';
import { WithdrawalContext } from '../../store';

const { Paragraph, Text } = Typography;

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const WithdrawalFund: React.FC = () => {
    const withdrawalStore = useStore(WithdrawalContext);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: Store) => {
        setLoading(true);
        const amount = parseInt(values['names'][0]);
        try {
            await withdrawalStore.requestWithdrawal(amount);
            message.success('Requested new withdrawal!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
                <Form.List name="names">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...formItemLayoutWithOutLabel}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input amount or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder="Withdrawal amount"
                                                style={{ width: '60%' }} />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            style={{ margin: '0 8px' }}
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        disabled={fields.length > 0}
                                        style={{ width: '60%' }}
                                    ><PlusOutlined /> Add request</Button>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        loading={loading}
                                        type="primary"
                                        htmlType="submit"
                                        disabled={fields.length === 0}>Submit</Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
            </Form>

            <div className="desc">
                <Paragraph>
                    <Text
                        strong
                        style={{
                            fontSize: 16,
                        }}
                    >Notes:</Text>
                </Paragraph>
                <Paragraph>Withdrawal time: 9 AM - 12 PM</Paragraph>
                <Paragraph>Amount Limit: 200 - 3000</Paragraph>
                <Paragraph>Only one withdrawal per day</Paragraph>
            </div>
        </>
    );
}

export default WithdrawalFund;