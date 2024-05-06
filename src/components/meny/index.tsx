import { CommentOutlined, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { FC } from 'react';
import { LogoWrapper, StyledMeny, StyledSider } from './styled';

import logoIco from '../../assets/icons/logo.svg';
import logoCollapsedIco from '../../assets/icons/logo_collapse.svg';
import calendarIco from '../../assets/icons/calendar_icon.svg';
import exit from '../../assets/icons/Exit.svg';
import { ButtonMenu } from './menyButton/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setDefault, setToken, setUser } from '@redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/constants';

export interface MenuProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu: FC<MenuProps> = ({ collapsed, setCollapsed }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    type key = {
        key: string;
    };

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch(setUser({ email: '', password: '' }));
        dispatch(setToken(''));
        dispatch(setDefault());
        navigate(PATHS.AUTH);
    };

    function onExitClick({ key }: key) {
        switch (key) {
            case PATHS.CALENDAR:
                navigate(PATHS.CALENDAR);
                break;
            case PATHS.PROFILE:
                navigate(PATHS.PROFILE);
                break;
            case PATHS.FEEDBACKS:
                navigate(PATHS.FEEDBACKS);
                break;
            case 'exit':
                logOut();
        }
    }

    return (
        <StyledSider trigger={null} collapsible collapsed={collapsed} width={'208px'}>
            <LogoWrapper>
                {collapsed ? <img src={logoCollapsedIco} /> : <img src={logoIco} />}
            </LogoWrapper>

            <StyledMeny
                onClick={onExitClick}
                theme='light'
                mode='inline'
                defaultSelectedKeys={[location.pathname]}
                items={[
                    {
                        key: PATHS.CALENDAR,
                        icon: <img src={calendarIco} />,
                        label: 'Календарь',
                    },
                    {
                        key: '2',
                        icon: <HeartFilled style={{ color: 'rgba(6, 17, 120, 1)' }} />,
                        label: 'Тренировки',
                    },
                    {
                        key: '3',
                        icon: <TrophyFilled style={{ color: 'rgba(6, 17, 120, 1)' }} />,
                        label: 'Достижения',
                    },
                    {
                        key: PATHS.PROFILE,
                        icon: <IdcardOutlined style={{ color: 'rgba(6, 17, 120, 1)' }} />,
                        label: 'Профиль',
                    },
                    {
                        key: PATHS.FEEDBACKS,
                        icon: <CommentOutlined style={{ color: 'rgba(6, 17, 120, 1)' }} />,
                        label: 'Отзывы',
                    },
                    {
                        key: 'exit',
                        icon: <img src={exit} />,
                        style: {
                            position: 'absolute',
                            bottom: 0,
                            boxShadow: `0px 1px 0px 0px rgba(240, 240, 240, 1) inset`,
                            transition: 'all 0.2s',
                        },
                        label: 'Выход',
                    },
                ]}
            >
                <ButtonMenu collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
            </StyledMeny>
        </StyledSider>
    );
};
