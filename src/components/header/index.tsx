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
import { useLocation } from 'react-router-dom';
import { PATHS } from '@constants/constants';

export const Header: React.FC = () => {
    const location = useLocation();

    const isFeedbacks = location.pathname === PATHS.FEEDBACKS;
    const isCalendar = location.pathname === PATHS.CALENDAR;
    const isMain = location.pathname === PATHS.MAIN;

    return (
        <Styledheader isMain={isMain}>
            <div>
                {' '}
                <LinkMain to={PATHS.MAIN}>Главная</LinkMain>
                {isFeedbacks && (
                    <p
                        style={{
                            fontSize: '14px',
                            height: '18px',
                            lineHeight: '18px',
                            display: 'inline',
                        }}
                    >
                        {' '}
                        <span>{` /  `}</span>Отзывы пользователей
                    </p>
                )}
                {isCalendar && (
                    <p
                        style={{
                            fontSize: '14px',
                            height: '18px',
                            lineHeight: '18px',
                            display: 'inline',
                        }}
                    >
                        {' '}
                        <span>{` /  `}</span>Календарь
                    </p>
                )}{' '}
            </div>

            <H1Wrapper>
                {isMain && (
                    <H1>
                        Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться
                        своей мечты!
                    </H1>
                )}

                <>
                    <SettingsWrapper>
                        <StyledLink to={PATHS.SETTINGS} text='Настройки'>
                            <SettingOutlined style={{ marginRight: '10px' }} />
                        </StyledLink>
                    </SettingsWrapper>

                    <SettingsMobileWrapper>
                        <StyledLink to={PATHS.SETTINGS} text=''>
                            <SettingOutlined style={{ fontSize: '19px' }} size={16} />
                        </StyledLink>
                    </SettingsMobileWrapper>
                </>
            </H1Wrapper>
        </Styledheader>
    );
};
