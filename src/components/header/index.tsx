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
import { Text } from '@pages/mainPage/styled';
import { PATHS } from '@constants/constants';

export const Header: React.FC = () => {
    const location = useLocation();

    const isFeedbacks = location.pathname === PATHS.FEEDBACKS ? true : false;

    return (
        <Styledheader isFeedbacks={isFeedbacks}>
            <LinkMain to='/'>Главная</LinkMain>
            {isFeedbacks && (
                <span style={{ fontSize: '14px', height: '18px', lineHeight: '15px' }}>
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
                        <StyledLink to='/' text='Настройки'>
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
