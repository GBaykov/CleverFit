import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { CardButtonWrapper, MainpageCard, Text } from './styled';
import calendarIco from '../../assets/icons/Calendar.svg';
import { StyledLink } from '@components/styledLink';
import { CardText } from '../../components/cardText';
import './styles.css';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATHS } from '@constants/constants';
import { LayoutWrapper } from '@pages/layout';
import { baseUser, setToken } from '@redux/reducers/userSlice';
import { push } from 'redux-first-history';

export const MainPage: React.FC = () => {
    const user = useAppSelector(baseUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        if (accessToken) {
            localStorage.setItem('token', accessToken);
            dispatch(setToken(accessToken));
            dispatch(push(PATHS.MAIN));
        }
    }, [dispatch, searchParams]);

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        if (!localStorage.getItem('token') && !accessToken && user.email === '')
            dispatch(push(PATHS.AUTH));
    }, [navigate, user.email]);

    return (
        <LayoutWrapper>
            <CardText>
                <Text
                    fontSize='16px'
                    color='rgba(6, 17, 120, 1)'
                    lineheight='20.8px'
                    fontWeight='400'
                >
                    С CleverFit ты сможешь: <br />— планировать свои тренировки на календаре,
                    выбирая тип и уровень нагрузки;
                    <br />— отслеживать свои достижения в разделе статистики, сравнивая свои
                    результаты с нормами и рекордами;
                    <br />— создавать свой профиль, где ты можешь загружать свои фото, видео и
                    отзывы о тренировках;
                    <br />— выполнять расписанные тренировки для разных частей тела, следуя
                    подробным инструкциям и советам профессиональных тренеров.
                </Text>
            </CardText>

            <CardText>
                <Text fontSize='20px' lineheight='26px' fontWeight='500' maxWidth='650px'>
                    CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                    откладывай на завтра — начни тренироваться уже сегодня!
                </Text>
            </CardText>
            <CardButtonWrapper>
                <MainpageCard title='Расписать тренировки' bordered={false}>
                    <StyledLink to={PATHS.CALENDAR} text='Тренировки' color='rgba(47, 84, 235, 1)'>
                        <HeartFilled
                            style={{
                                color: 'rgba(47, 84, 235, 1)',
                                marginRight: '8px',
                            }}
                        />
                    </StyledLink>
                </MainpageCard>

                <MainpageCard title='Назначить календарь' bordered={false}>
                    <StyledLink to='/' text='Календарь' color='rgba(47, 84, 235, 1)'>
                        <img src={calendarIco} style={{ marginRight: '8px' }} />
                    </StyledLink>
                </MainpageCard>

                <MainpageCard title='Заполнить профиль' bordered={false}>
                    <StyledLink to={PATHS.PROFILE} text='Профиль' color='rgba(47, 84, 235, 1)'>
                        <IdcardOutlined
                            style={{
                                color: 'rgba(47, 84, 235, 1)',
                                marginRight: '8px',
                            }}
                        />
                    </StyledLink>
                </MainpageCard>
            </CardButtonWrapper>
        </LayoutWrapper>
    );
};
