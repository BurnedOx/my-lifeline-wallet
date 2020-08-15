import React, { useEffect, useState } from 'react';
import { Table, Divider } from 'antd';
import { useStore } from '../../utils/hooks';
import { MembersContext } from '../../store';
import { observer } from 'mobx-react-lite';
import { getFormatedDate } from '../../utils/getTime';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Activated At',
        dataIndex: 'activatedAt',
        key: 'activatedAt',
    }
];

const SingleLeg: React.FC = () => {
    const memberStore = useStore(MembersContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            if (memberStore.singleLeg.length === 0) {
                setLoading(true);
                try {
                    await memberStore.loadSingleLeg();
                } finally {
                    setLoading(false);
                }
            }
        }
        load();
        // eslint-disable-next-line
    }, []);

    const data = memberStore.singleLeg.map((m, key) => {
        const { id, name, activatedAt } = m;
        return { key, id, name, activatedAt: getFormatedDate(activatedAt) };
    })

    return (
        <React.Fragment>
            <Divider orientation="left" style={{ color: '#333' }}>Single Leg Members</Divider>
            <Table loading={loading} columns={columns} dataSource={data} scroll={{ x: '100%' }} />
        </React.Fragment>
    );
};

export default observer(SingleLeg);