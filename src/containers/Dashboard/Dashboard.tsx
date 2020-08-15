import React, { useState } from 'react';
import './Dashboard.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../utils/hooks';
import { AuthContext } from '../../store';
import { Input, Button, Tag, Divider, Card } from 'antd';
import Cards from '../../components/Cards/Cards';
import { RouteComponentProps } from 'react-router-dom';
import ReferralLink from '../../components/ReferralLink/ReferralLink';

const { Meta } = Card;

const Dashboard: React.FC<RouteComponentProps> = (props) => {
    const authStore = useStore(AuthContext);
    const [loading, setLoading] = useState(false);
    const [pin, setPin] = useState('')

    const handleActive = async () => {
        setLoading(true);
        const user = await authStore.activate(pin);
        localStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
    };

    return (
        <div className="dashboard">
            <Card hoverable title="Me" style={{ width: 240 }} onClick={() => props.history.push('/profile')}>
                <Meta title={authStore.user?.name} description={authStore.user?.id} />
                <Tag
                    style={{ marginTop: 8 }}
                    color={authStore.user?.status === 'active' ? 'green' : 'red'}>{authStore.user?.status}</Tag>
            </Card>
            {
                authStore.user?.status === 'inactive'
                    ? <div style={{ marginTop: 16, maxWidth: 425, display: 'flex' }}>
                        <Input
                            // maxLength={}
                            placeholder="Enter E-Pin to activate your account"
                            value={pin}
                            onChange={e => setPin(e.target.value)} />
                        <Button loading={loading} onClick={handleActive}>Activate</Button>
                    </div>
                    : <ReferralLink />
            }
            <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>Cards</Divider>

            <Cards />
        </div>
    );
};

export default observer(Dashboard);