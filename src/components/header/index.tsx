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

export const Header: React.FC = () => {
    return (
        <Styledheader
            style={{
                padding: `16px 24px 16px 24px`,
                height: 'auto',
                background: `rgba(240, 245, 255, 1)`,
                zIndex: '0',
            }}
        >
            <LinkMain to='/'>Главная</LinkMain>
            <H1Wrapper>
                <H1>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
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
        </Styledheader>
    );
};
