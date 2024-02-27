import { FC, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { AuthForm } from '@components/forms/auth';
import { FormLogoWrapper } from './styled';
import './styles.css';
import { RegistrForm } from '@components/forms/registration';
import { CommonCardWrap } from '@pages/comonCardWrap';
import { StyledCard } from '@components/styledCard/styled';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/constants';
import { useLoginMutation, useSignupMutation } from '../../services/auth';
import { Loader } from '@components/loader/Loader';

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
    const [signup, { isLoading: isSignuLoading }] = useSignupMutation();
    const [login, { isLoading: isLoginLoading }] = useLoginMutation();

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
            {(isSignuLoading || isLoginLoading) && <Loader />}
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
