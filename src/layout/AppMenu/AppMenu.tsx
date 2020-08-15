import React, { useState } from 'react';
import './AppMenu.scss';
import { Menu } from 'antd';
import { DashboardOutlined, BarChartOutlined, StockOutlined, BankOutlined, SettingOutlined, LogoutOutlined, ProfileOutlined, KeyOutlined } from '@ant-design/icons';
import { useStore } from '../../utils/hooks';
import { AuthContext } from '../../store';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import BankForm from '../../components/BankForm/BankForm';
import Password from '../../components/Password/Password';

const { SubMenu } = Menu;

const AppMenu: React.FC<RouteComponentProps> = (props) => {
    const [current, setCurrent] = useState('Dashboard');
    const [editPassword, setEditPassword] = useState(false);
    const [editBank, setEditBank] = useState(false);
    const [editProfile, setEditProfile] = useState(false);

    const authStore = useStore(AuthContext);
    const { user } = authStore;

    const handleClick = (e: any) => setCurrent(e.key);
    const toggleEditPassword = () => setEditPassword(s => !s);
    const toggleEditBank = () => setEditBank(s => !s);
    const toggleEditProfile = () => setEditProfile(s => !s);

    const handleLogOut = () => {
        authStore.logout();
    };

    return (
        <>
            <Menu className='app-menu' onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
                <SubMenu key={'Home'} icon={<DashboardOutlined />} title='Home'>
                    <Menu.Item key='Dashboard' onClick={() => props.history.push('')}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key='Profile' onClick={() => props.history.push('/profile')}>Profile</Menu.Item>
                </SubMenu>
                <SubMenu key={'Business'} icon={<BarChartOutlined />} title='Business'>
                    <Menu.Item key='Direct' onClick={() => props.history.push('/direct')}>
                        Direct Members
                    </Menu.Item>
                    <Menu.Item key='Downline' onClick={() => props.history.push('/downline')}>
                        My Downline
                    </Menu.Item>
                    <Menu.Item key='SingleLeg' onClick={() => props.history.push('/single-leg')}>
                        Single Leg Members
                    </Menu.Item>
                </SubMenu>
                <SubMenu key={'Payout'} icon={<StockOutlined />} title='Payout Details'>
                    <Menu.Item key='Level' onClick={() => props.history.push('/level-incomes')}>
                        Level Income Details
                    </Menu.Item>
                    <Menu.Item key='SingleLegIncome' onClick={() => props.history.push('/single-leg-incomes')}>
                        Single Leg Income Details
                    </Menu.Item>
                    <Menu.Item key='LeadershipBonus'>
                        Leadership Bonus Details
                    </Menu.Item>
                </SubMenu>
                <SubMenu key={'Account'} icon={<BankOutlined />} title='Account'>
                    <Menu.Item key='History' onClick={() => props.history.push('/account-history')}>
                        Account History
                    </Menu.Item>
                    <Menu.Item key='WithdrawFund' onClick={() => props.history.push('/withdraw')}>
                        Withdraw Fund
                    </Menu.Item>
                    <Menu.Item key='WithdrawReport' onClick={() => props.history.push('/withdraw-report')}>
                        Withdraw Report
                    </Menu.Item>
                </SubMenu>
                <SubMenu key='Settings' icon={<SettingOutlined />} title='Settings'>
                    <Menu.Item key={'Edit Profile'} icon={<ProfileOutlined />} onClick={toggleEditProfile}>
                        Edit Profile
                    </Menu.Item>
                    <Menu.Item key={'Update Bank'} icon={<BankOutlined />} onClick={toggleEditBank}>
                        {user?.bankDetails === null ? "Add Bank" : "Update Bank"}
                    </Menu.Item>
                    <Menu.Item key={'Change Password'} icon={<KeyOutlined />} onClick={toggleEditPassword}>
                        Change Password
                    </Menu.Item>
                    <Menu.Item key={'Log Out'} icon={<LogoutOutlined />} onClick={handleLogOut}>
                        Log Out
                    </Menu.Item>
                </SubMenu>
            </Menu>

            <ProfileForm visible={editProfile} toggle={toggleEditProfile} />
            <BankForm visible={editBank} toggle={toggleEditBank} />
            <Password visible={editPassword} toggle={toggleEditPassword} />
        </>
    );
};

export default withRouter(AppMenu);