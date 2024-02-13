import React from 'react';
import 'antd/dist/antd.css';
import './main-page.css';
import { HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Card, Layout } from 'antd';
import { CardButtonWrapper } from './styled';
import calendarIco from '../../assets/icons/Calendar.svg';
import backgroundIMG from '../../assets/img/MainPageLight.png';
import { StyledLink } from '@components/styledLink';
import { Header } from '../../components/header';

export const MainPage: React.FC = () => {
    return (
        <>
            <Layout style={{ maxWidth: '1440px', margin: '0 auto' }}>
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
                        <CardButtonWrapper>
                            <Card
                                title='Расписать тренировки'
                                bordered={false}
                                style={{ width: '100%', marginRight: '25px' }}
                            >
                                <StyledLink to='/' text='Тренировки' color='rgba(47, 84, 235, 1)'>
                                    <HeartFilled
                                        style={{
                                            color: 'rgba(47, 84, 235, 1)',
                                            marginRight: '8px',
                                        }}
                                    />
                                </StyledLink>
                            </Card>

                            <Card
                                title='Назначить календарь'
                                bordered={false}
                                style={{ width: '100%', marginRight: '25px' }}
                            >
                                <StyledLink to='/' text='Календарь' color='rgba(47, 84, 235, 1)'>
                                    <img src={calendarIco} style={{ marginRight: '8px' }} />
                                </StyledLink>
                            </Card>

                            <Card
                                title='Заполнить профиль'
                                bordered={false}
                                style={{ width: '100%' }}
                            >
                                <StyledLink to='/' text='Профиль' color='rgba(47, 84, 235, 1)'>
                                    <IdcardOutlined
                                        style={{
                                            color: 'rgba(47, 84, 235, 1)',
                                            marginRight: '8px',
                                        }}
                                    />
                                </StyledLink>
                            </Card>
                        </CardButtonWrapper>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};
