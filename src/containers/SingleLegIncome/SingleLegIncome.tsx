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
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
    },
    {
        title: 'Credit',
        dataIndex: 'income',
        key: 'income',
    },
    {
        title: 'Tr Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

const SingleLegIncome: React.FC = () => {
    const incomeStore = useStore(IncomeContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            if (incomeStore.roiIncomes.length === 0) {
                setLoading(true);
                try {
                    await incomeStore.loadRoiIncomes();
                } finally {
                    setLoading(false);
                }
            }
        }
        load();
        // eslint-disable-next-line
    }, []);

    const data = incomeStore.roiIncomes.map((roi, key) => ({
        ...roi, key,
        createdAt: getFormatedDate(roi.createdAt)
    }));

    return (
        <React.Fragment>
            <Divider orientation="left" style={{ color: '#333' }}>Single Leg Incomes</Divider>
            <Table loading={loading} columns={columns} dataSource={data} scroll={{ x: '100%' }} />
        </React.Fragment>
    );
};

export default observer(SingleLegIncome);