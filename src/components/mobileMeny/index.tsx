import { FC } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ButtonMobileMenu, ExitButton, LogoWrapper, Menu, MenuList } from './styled';
import { StyledLink } from '@components/styledLink';

import logoMobIco from '../../assets/icons/logoMobile.svg';

export interface MenuMobileProps {
    collapsed: boolean;
    onClick: () => void;
}

export const MenuMobile: FC<MenuMobileProps> = ({ collapsed, onClick }) => {
    return (
        <Menu collapsed={collapsed}>
            <ButtonMobileMenu
                data-test-id={'sider-switch-mobile'}
                onClick={onClick}
                style={{ zIndex: '999' }}
            >
                {collapsed ? (
                    <MenuUnfoldOutlined
                        size={16}
                        style={{
                            position: 'absolute',
                            rotate: '-90deg',
                            bottom: '-36px',
                            right: '11px',
                            fontSize: '24px',
                        }}
                    />
                ) : (
                    <MenuFoldOutlined
                        size={16}
                        style={{
                            position: 'absolute',
                            rotate: '-90deg',
                            bottom: '-36px',
                            right: '11px',
                            fontSize: '24px',
                        }}
                    />
                )}
            </ButtonMobileMenu>
            <LogoWrapper>
                <img src={logoMobIco} />
            </LogoWrapper>

            <MenuList>
                <div>
                    <StyledLink to='/' text='Календарь' fontSize='14px' />
                </div>
                <div>
                    <StyledLink to='/' text='Тренировки' fontSize='14px' />
                </div>
                <div>
                    <StyledLink to='/' text='Достижения' fontSize='14px' />
                </div>
                <div>
                    <StyledLink to='/' text='Профиль' fontSize='14px' />
                </div>
            </MenuList>
            <ExitButton>
                <StyledLink to='/' text='Выход' fontSize='14px' />
            </ExitButton>
        </Menu>
    );
};
