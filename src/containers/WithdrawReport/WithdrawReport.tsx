import React, { useEffect, useState } from 'react';
import { Table, Divider } from 'antd';
import { useStore } from '../../utils/hooks';
import { WithdrawalContext } from '../../store';
import { observer } from 'mobx-react-lite';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Withdraw Amount',
        dataIndex: 'withdrawAmount',
        key: 'withdrawAmount',
    },
    {
        title: 'Net Amount',
        dataIndex: 'netAmount',
        key: 'netAmount',
    },
    {
        title: 'Processed At',
        dataIndex: 'processedAt',
        key: 'processedAt',
    },
    {
        title: 'Requested At',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Account Name',
        dataIndex: 'accountName',
        key: 'accountName',
    },
    {
        title: 'Bank Name',
        dataIndex: 'bankName',
        key: 'bankName',
    },
    {
        title: 'Account Number',
        dataIndex: 'accountNumber',
        key: 'accountNumber',
    },
    {
        title: 'ISFC',
        dataIndex: 'isfc',
        key: 'isfc',
    },
    {
        title: 'Account Type',
        dataIndex: 'accountType',
        key: 'accountType',
    },
];

const WithdrawalReport: React.FC = () => {
    const withdrawalStore = useStore(WithdrawalContext);
    const [loading, setLoading] = useState(false);
    const { withdrawals } = withdrawalStore;

    useEffect(() => {
        async function load() {
            if (withdrawals.length === 0) {
                setLoading(true);
                try {
                    await withdrawalStore.getWithdrawals();
                } finally {
                    setLoading(false);
                }
            }
        }
        load();
        // eslint-disable-next-line
    }, []);

    const data = withdrawals.map((withdrawal, key) => {
        delete withdrawal.updatedAt;
        const { createdAt, processedAt } = withdrawal;
        return {
            ...withdrawal, key,
            createdAt: new Date(createdAt).toLocaleString(),
            processedAt: processedAt ? new Date(processedAt).toLocaleString() : ''
        };
    });

    return (
        <React.Fragment>
            <Divider orientation="left" style={{ color: '#333' }}>Withdrawal Reports</Divider>
            <Table loading={loading} columns={columns} dataSource={data} scroll={{ x: '100%' }} />
        </React.Fragment>
    );
};

export default observer(WithdrawalReport);