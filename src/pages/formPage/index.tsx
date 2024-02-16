import { FC, useEffect, useState } from 'react';
import { Layout, Card, Button } from 'antd';
import 'antd/dist/antd.css';
import { AuthForm } from '@components/forms/auth';

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
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
};

export const FormPage: FC = () => {
    const [activeTab, setActiveTab] = useState<string>('Вход');

    const onTab1Change = (key: string) => {
        setActiveTab(key);
    };

    useEffect(() => {
        setActiveTab('Вход');
    }, []);
    return (
        <Layout
            style={{
                width: '100%',
                maxWidth: '1440px',
                margin: '0 auto',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                style={{
                    width: '100%',
                    maxWidth: '539px',
                    margin: '0 auto',
                }}
                defaultActiveTabKey={activeTab}
                title='CleverFIT'
                tabList={tabList}
                // activeTabKey={activeTab}
                onTabChange={(key) => {
                    onTab1Change(key);
                }}
            >
                <AuthForm />
                {contentList[activeTab]}
            </Card>
        </Layout>
    );
};
