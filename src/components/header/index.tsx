import React from 'react';
import {
    H1,
    H1Wrapper,
    Styledheader,
    LinkMain,
    SettingsMobileWrapper,
    SettingsWrapper,
} from './styled';
import { StyledLink } from '../styledLink';
import { SettingOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/constants';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';

export const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.userReducer);

    const isFeedbacks = location.pathname === PATHS.FEEDBACKS;

    return (
        <Styledheader isFeedbacks={isFeedbacks}>
            <LinkMain to={PATHS.MAIN}>Главная</LinkMain>
            {isFeedbacks && (
                <span style={{ fontSize: '14px', height: '18px', lineHeight: '18px' }}>
                    {' '}
                    <span>{` /  `}</span>Отзывы пользователей
                </span>
            )}
            {!isFeedbacks && (
                <H1Wrapper>
                    <H1>
                        Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться
                        своей мечты!
                    </H1>
                    <SettingsWrapper>
                        <StyledLink to={PATHS.MAIN} text='Настройки'>
                            <SettingOutlined style={{ marginRight: '10px' }} />
                        </StyledLink>
                    </SettingsWrapper>

                    <SettingsMobileWrapper>
                        <StyledLink to='/' text=''>
                            <SettingOutlined style={{ fontSize: '19px' }} size={16} />
                        </StyledLink>
                    </SettingsMobileWrapper>
                </H1Wrapper>
            )}
        </Styledheader>
    );
};
