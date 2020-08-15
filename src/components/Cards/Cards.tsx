import React, { useEffect, useState } from 'react';
import './Card.scss';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useStore } from '../../utils/hooks';
import { AuthContext } from '../../store';
import { observer } from 'mobx-react-lite';

const Cards: React.FC = () => {
    const authStore = useStore(AuthContext);
    const [loading, setLoading] = useState(false);
    const { details } = authStore;

    useEffect(() => {
        async function loadAll() {
            setLoading(true);
            try {
                await authStore.loadDetails();
            } finally {
                setLoading(false);
            }
        }
        loadAll();
        // eslint-disable-next-line
    }, []);

    return (
        <Row className={loading ? 'row cards-loading': 'row'} gutter={[16, 24]} style={{ background: '#f0f2f5' }}>
            <Col className="gutter-row" span={6}>
                <Card
                    size="small"
                    title="Rank"
                    loading={loading}
                    hoverable
                >
                    <p>{details?.rank ?? "Unavailable"}</p>
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card
                    size="small"
                    title="Dierct Members"
                    extra={<Link to='/direct'>View</Link>}
                    loading={loading}
                    hoverable
                >
                    <p>{details?.direct ?? "Unavailable"}</p>
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card
                    size="small"
                    title="My Downline"
                    extra={<Link to='/downline'>View</Link>}
                    loading={loading}
                    hoverable
                >
                    <p>{details?.downline ?? "Unavailable"}</p>
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card
                    size="small"
                    title="Level Income"
                    extra={<Link to='/level-incomes'>View</Link>}
                    loading={loading}
                    hoverable
                >
                    <p>{details?.levelIncome ?? "Unavailable"}</p>
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card
                    size="small"
                    title="My Walet"
                    loading={loading}
                    hoverable
                >
                    <p>{details?.wallet ?? "Unavailable"}</p>
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card
                    size="small"
                    title="Single-leg Members"
                    extra={<Link to='/single-leg'>View</Link>}
                    loading={loading}
                    hoverable
                >
                    <p>{details?.singleLeg ?? "Unavailable"}</p>
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card
                    size="small"
                    title="Single-leg Income"
                    extra={<Link to='/single-leg-incomes'>View</Link>}
                    loading={loading}
                    hoverable
                >
                    <p>{details?.singleLegIncome ?? "Unavailable"}</p>
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card
                    size="small"
                    title="Leadership Bonus"
                    loading={loading}
                    hoverable
                >
                    <p>Unavailable</p>
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card
                    size="small"
                    title="Total Withdrawl"
                    loading={loading}
                    hoverable
                >
                    <p>{details?.totalWithdrawal ?? "Unavailable"}</p>
                </Card>
            </Col>
            <Col className="gutter-row" span={6}>
                <Card
                    size="small"
                    title="Total Income"
                    loading={loading}
                    hoverable
                >
                    <p>{details?.totalIncome ?? "Unavailable"}</p>
                </Card>
            </Col>
        </Row>
    );
};

export default observer(Cards);