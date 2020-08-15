import React from 'react';
import './ReferralLink.scss';
import { AuthContext } from '../../store';
import { useStore } from '../../utils/hooks';
import { CopyOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

const ReferralLink: React.FC = () => {
    const authStore = useStore(AuthContext);

    const origin = window.location.origin;
    const link = origin + '/register?ref=' + authStore.user?.id

    return (
        <div className="referral-link">
            <label>Referral Link: </label>
            <a rel="noreferrer noopener" target="_blank" href={link}>{link}</a>
            <CopyToClipboard text={link} onCopy={() => message.info('Link Copied!')}>
                <span><CopyOutlined /></span>
            </CopyToClipboard>
        </div>
    );
};

export default observer(ReferralLink);