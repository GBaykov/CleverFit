import { FC } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ButtonMobileMenu, ExitButton, LogoWrapper, Menu, MenuList } from './styled';
import { StyledLink } from '@components/styledLink';
import { setToken, setUser } from '@redux/reducers/userSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

import logoMobIco from '../../assets/icons/logoMobile.svg';
import { PATHS } from '@constants/constants';

export type MenuMobileProps = {
    collapsed: boolean;
    onClick: () => void;
};

export const MenuMobile: FC<MenuMobileProps> = ({ collapsed, onClick }) => {
    const dispatch = useAppDispatch();

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch(setUser({ email: '', password: '' }));
        dispatch(setToken(''));
    };

    function onExitClick() {
        logOut();
    }
    return (
        <Menu collapsed={collapsed}>
            <ButtonMobileMenu
                data-test-id={'sider-switch-mobile'}
                onClick={onClick}
                style={{ zIndex: '999' }}
            >
                {!collapsed ? (
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
                    <StyledLink to={PATHS.CALENDAR} text='Календарь' fontSize='14px' />
                </div>
                <div>
                    <StyledLink to='/' text='Тренировки' fontSize='14px' />
                </div>
                <div>
                    <StyledLink to='/' text='Достижения' fontSize='14px' />
                </div>
                <div>
                    <StyledLink to={PATHS.PROFILE} text='Профиль' fontSize='14px' />
                </div>
            </MenuList>
            <ExitButton onClick={() => onExitClick()}>
                <StyledLink to='/' text='Выход' fontSize='14px' />
            </ExitButton>
        </Menu>
    );
};
