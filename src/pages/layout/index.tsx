import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { MenuMobile } from '@components/mobileMeny';
import { Menu } from '@components/meny';
import backgroundIMG from '../../assets/img/MainPageLight.png';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/constants';
import { ButtonMenu } from '@components/meny/menyButton';
import { Footer } from '@components/footer';
import { Header } from '@components/header';

export type LayoutWrapperProps = {
    children: React.ReactNode;
};

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    // const { user } = useAppSelector((state) => state.userReducer);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (user.email === '' && !localStorage.getItem('token')) navigate(PATHS.AUTH);
    // }, [navigate, user.email]);

    return (
        <>
            <MenuMobile collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
            <Layout style={{ maxWidth: '1440px', margin: '0 auto' }}>
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
                            height: 'auto',
                            padding: 24,
                        }}
                    >
                        <ButtonMenu
                            collapsed={collapsed}
                            onClick={() => setCollapsed(!collapsed)}
                        />
                        {children}
                        <Footer />
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};
