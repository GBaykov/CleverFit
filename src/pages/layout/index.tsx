import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { MenuMobile } from '@components/mobileMeny';
import { Menu } from '@components/meny';
import backgroundIMG from '../../assets/img/MainPageLight.png';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/constants';
import { ButtonMenu } from '@components/meny/menyButton';
import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { useGetUserInfoQuery } from '../../services/user';
import { baseUser, userToken } from '@redux/reducers/userSlice';
import { AppAlert } from '@components/appAlert';
import { appAlert } from '@redux/reducers/appSlice';

export type LayoutWrapperProps = {
    children: React.ReactNode;
    isFooter?: boolean;
};

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children, isFooter = true }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { data } = useGetUserInfoQuery();

    // const { user } = useAppSelector((state) => state.userReducer);
    const user = useAppSelector(baseUser);
    const token = useAppSelector(userToken);
    const navigate = useNavigate();
    const alert = useAppSelector(appAlert);

    useEffect(() => {
        user.email === '' && !localStorage.getItem('token') && !token && navigate(PATHS.AUTH);
    }, [navigate, user.email]);

    return (
        <>
            <MenuMobile collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
            <Layout style={{ maxWidth: '1440px', margin: '0 auto', minHeight: '100vh' }}>
                <Menu collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout
                    style={{
                        backgroundColor: '#fff',
                    }}
                >
                    <Header />
                    <Layout
                        style={{
                            backgroundColor: '#fff',
                            background: `no-repeat center/cover url(${backgroundIMG})`,
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            padding: 24,
                        }}
                    >
                        <ButtonMenu
                            collapsed={collapsed}
                            onClick={() => setCollapsed(!collapsed)}
                        />
                        {children}
                        {isFooter && <Footer />}
                    </Layout>
                </Layout>
            </Layout>
            <AppAlert message={alert.message} type={alert.type} dataTestId='alert' />
        </>
    );
};
