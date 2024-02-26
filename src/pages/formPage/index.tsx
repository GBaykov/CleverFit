import { FC, useEffect, useState } from 'react';
// import { Layout, Card, Button } from 'antd';
import 'antd/dist/antd.css';
import { AuthForm } from '@components/forms/auth';
import { FormLogoWrapper } from './styled';
import './styles.css';
// import FormpageLight from '../../assets/img/FormPageLight.png';
import { RegistrForm } from '@components/forms/registration';

import { CommonCardWrap } from '@pages/comonCardWrap';
import { StyledCard } from '@components/styledCard/styled';

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

export interface FormPageProps {
    activePage: 'auth' | 'registraation';
}

export const FormPage: FC<FormPageProps> = ({ activePage }) => {
    const [activeTab, setActiveTab] = useState<string>(activePage);

    const onTab1Change = (key: string) => {
        setActiveTab(key);
    };

    useEffect(() => {
        setActiveTab(activePage);
    }, []);

    return (
        <CommonCardWrap>
            {/* <ConfirmPasswordForm /> */}
            <StyledCard
                defaultActiveTabKey={activeTab}
                title={<FormLogoWrapper></FormLogoWrapper>}
                tabList={tabList}
                onTabChange={(key) => {
                    onTab1Change(key);
                }}
            >
                {contentList[activeTab]}
            </StyledCard>
        </CommonCardWrap>
    );
};
