import React from 'react';
import { isBrowser, isMobile } from 'react-device-detect';
import { Layout } from 'antd';
import SideNav from './SideNav/SideNav';
import Navigation from './Navigation/Navigation';
import { useStore } from '../utils/hooks';
import { AuthContext } from '../store';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AppMenu from './AppMenu/AppMenu';

const { Header, Content, Footer } = Layout;

const AppLayout: React.FC = (props) => {
    const authStore = useStore(AuthContext);

    if (authStore.user === null) return <Redirect to='/login' />;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {isBrowser ? <SideNav /> : null}
            <Layout className='site-layout'>
                <Header className='site-layout-background' style={{ padding: 0 }}>
                    {isMobile ? <div style={{color: '#000000'}} className='logo'>My Wallet</div> : null}
                </Header>
                {isMobile ? <AppMenu /> : null}
                <Content style={{ margin: '0 16px' }}>
                    <Navigation />
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Copyright © 2020 My Lifeline Wallet. All rights reserved.</Footer>
            </Layout>
        </Layout>
    );
};

export default observer(AppLayout);