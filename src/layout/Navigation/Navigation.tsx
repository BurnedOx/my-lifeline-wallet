import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { useStore } from '../../utils/hooks';
import { AuthContext } from '../../store';
import { observer } from 'mobx-react-lite';

const Navigation: React.FC<RouteComponentProps> = (props) => {
    const authStore = useStore(AuthContext);
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{authStore.user?.name}</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default withRouter(observer(Navigation));