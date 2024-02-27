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
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/constants';

const tabList = [
    {
        key: 'auth',
        tab: 'Вход',
    },
    {
        key: 'registration',
        tab: 'Регистрация',
    },
];

const contentList: Record<string, React.ReactNode> = {
    auth: <AuthForm />,
    registration: <RegistrForm />,
};

export interface FormPageProps {
    activePage: 'auth' | 'registration';
}

export const FormPage: FC<FormPageProps> = ({ activePage }) => {
    const [activeTab, setActiveTab] = useState<string>(activePage);

    const location = useLocation();
    const navigate = useNavigate();

    const onTabChange = (key: string) => {
        setActiveTab(key);
    };

    useEffect(() => {
        setActiveTab(activePage);
    }, []);

    useEffect(() => {
        const link = activeTab === 'auth' ? PATHS.AUTH : PATHS.REGISTRATION;
        navigate(link);
    }, [activeTab]);

    return (
        <CommonCardWrap>
            {/* <ConfirmPasswordForm /> */}
            <StyledCard
                defaultActiveTabKey={activeTab}
                title={<FormLogoWrapper></FormLogoWrapper>}
                tabList={tabList}
                onTabChange={(key) => {
                    onTabChange(key);
                }}
            >
                {contentList[activeTab]}
            </StyledCard>
        </CommonCardWrap>
    );
};
