import React, { useEffect, useState } from 'react';
import { Table, Divider } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../utils/hooks';
import { TransactionContext } from '../../store';
import { getFormatedDate } from '../../utils/getTime';

const columns = [
    {
        title: 'Sl No',
        dataIndex: 'slNo',
        key: 'slNo',
    },
    {
        title: 'Tr Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Credit',
        dataIndex: 'credit',
        key: 'credit',
    },
    {
        title: 'Debit',
        dataIndex: 'debit',
        key: 'debit',
    },
    {
        title: 'Current Balance',
        dataIndex: 'currentBalance',
        key: 'currentBalance',
    },
    {
        title: 'Remarks',
        dataIndex: 'remarks',
        key: 'remarks',
    },
];

const AccountHistory: React.FC = () => {
    const trxStore = useStore(TransactionContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                await trxStore.loadTransactions();
            } finally {
                setLoading(false);
            }
        }
        if (trxStore.transactions.length === 0) {
            load();
        }
        // eslint-disable-next-line
    }, []);

    const data = trxStore.transactions.map((t, i) => ({
        ...t,
        slNo: i,
        key: i,
        createdAt: getFormatedDate(t.createdAt)
    }));

    return (
        <React.Fragment>
            <Divider orientation="left" style={{ color: '#333' }}>Account History</Divider>
            <Table loading={loading} columns={columns} dataSource={data} scroll={{ x: '100%' }} />
        </React.Fragment>
    );
};

export default observer(AccountHistory);