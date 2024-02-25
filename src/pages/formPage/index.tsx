import { FC, useEffect, useState } from 'react';
import { Layout, Card, Button } from 'antd';
import 'antd/dist/antd.css';
import { AuthForm } from '@components/forms/auth';
import { FormLogoWrapper, StyledformCard } from './styled';
import './styles.css';
import FormpageLight from '../../assets/img/FormPageLight.png';
import { RegistrForm } from '@components/forms/registration';
import { ConfirmPasswordForm } from '@components/forms/confirm';

const tabList = [
    {
        key: 'auth',
        tab: 'Вход',
    },
    {
        key: 'registraation',
        tab: 'Регистрация',
    },
];

const contentList: Record<string, React.ReactNode> = {
    auth: <AuthForm />,
    registraation: <RegistrForm />,
};

export const FormPage: FC = () => {
    const [activeTab, setActiveTab] = useState<string>('auth');

    const onTab1Change = (key: string) => {
        setActiveTab(key);
    };

    useEffect(() => {
        setActiveTab('auth');
    }, []);
    return (
        <Layout
            style={{
                boxSizing: 'border-box',
                width: '100%',
                maxWidth: '1440px',
                height: '100vh',
                margin: '0 auto',
                background: `no-repeat center/cover url(${FormpageLight})`,
                position: 'relative',
            }}
        >
            <Layout
                style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                    margin: '0 auto',
                    padding: '90px 16px',
                    backgroundColor: 'rgba(121, 156, 212, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <ConfirmPasswordForm />
                {/* <StyledformCard
                    defaultActiveTabKey={activeTab}
                    title={<FormLogoWrapper></FormLogoWrapper>}
                    tabList={tabList}
                    onTabChange={(key) => {
                        onTab1Change(key);
                    }}
                >
                    {contentList[activeTab]}
                </StyledformCard> */}
            </Layout>
        </Layout>
    );
};
