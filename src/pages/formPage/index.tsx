import { FC, useEffect, useState } from 'react';
import { Layout, Card, Button } from 'antd';
import 'antd/dist/antd.css';
import { AuthForm } from '@components/forms/auth';
import { FormLogoWrapper, StyledformCard } from './styled';
import './styles.css';
import FormpageLight from '../../assets/img/FormPageLight.png';
import { RegistrForm } from '@components/forms/registration';

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
                margin: '0 auto',
                padding: '90px 16px',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                background: `no-repeat center/cover url(${FormpageLight})`,
                position: 'relative',
            }}
        >
            <StyledformCard
                defaultActiveTabKey={activeTab}
                title={<FormLogoWrapper>{/* <img src={logoIco} /> */}</FormLogoWrapper>}
                tabList={tabList}
                // activeTabKey={activeTab}
                onTabChange={(key) => {
                    onTab1Change(key);
                }}
            >
                {/* <AuthForm />
                <RegistrForm /> */}
                {contentList[activeTab]}
            </StyledformCard>
        </Layout>
    );
};
