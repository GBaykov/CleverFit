import React from 'react';
import 'antd/dist/antd.css';
import { HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Card, Layout } from 'antd';
import { CardButtonWrapper, Text } from './styled';
import calendarIco from '../../assets/icons/Calendar.svg';
import backgroundIMG from '../../assets/img/MainPageLight.png';
import { StyledLink } from '@components/styledLink';
import { Header } from '../../components/header';
import { CardText } from '../../components/cardText';

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
                        <CardText>
                            <Text
                                fontSize='16px'
                                color='rgba(6, 17, 120, 1)'
                                lineheight='20.8px'
                                fontWeight='400'
                            >
                                С CleverFit ты сможешь: <br />— планировать свои тренировки на
                                календаре, выбирая тип и уровень нагрузки;
                                <br />— отслеживать свои достижения в разделе статистики, сравнивая
                                свои результаты с нормами и рекордами;
                                <br />— создавать свой профиль, где ты можешь загружать свои фото,
                                видео и отзывы о тренировках;
                                <br />— выполнять расписанные тренировки для разных частей тела,
                                следуя подробным инструкциям и советам профессиональных тренеров.
                            </Text>
                        </CardText>

                        <CardText>
                            <Text
                                fontSize='20px'
                                lineheight='26px'
                                fontWeight='500'
                                maxWidth='650px'
                            >
                                CleverFit — это не просто приложение, а твой личный помощник в мире
                                фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                            </Text>
                        </CardText>
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
