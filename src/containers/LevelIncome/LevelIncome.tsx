import React, { useEffect, useState } from 'react';
import { Table, Divider } from 'antd';
import { useStore } from '../../utils/hooks';
import { IncomeContext } from '../../store';
import { observer } from 'mobx-react-lite';
import { getFormatedDate } from '../../utils/getTime';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'From Id',
        dataIndex: 'fromId',
        key: 'fromId',
    },
    {
        title: 'From Name',
        dataIndex: 'fromName',
        key: 'fromName',
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

const LevelIncome: React.FC = () => {
    const levelIncomeStore = useStore(IncomeContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchMembers() {
            if (levelIncomeStore.levelIncomes.length === 0) {
                setLoading(true);
                try {
                    await levelIncomeStore.loadLevelIncomes()
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchMembers();
        // eslint-disable-next-line
    }, []);

    const data = levelIncomeStore.levelIncomes.map((income, i) => ({
        key: i,
        id: income.id,
        fromId: income.from.id,
        fromName: income.from.name,
        level: income.level,
        amount: income.amount,
        createdAt: getFormatedDate(income.createdAt)
    }));

    return (
        <React.Fragment>
            <Divider orientation="left" style={{ color: '#333' }}>Level Income Details</Divider>
            <Table loading={loading} columns={columns} dataSource={data} scroll={{ x: '100%' }} />
        </React.Fragment>
    );
};

export default observer(LevelIncome);