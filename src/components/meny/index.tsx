import { HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { FC } from 'react';
import { LogoWrapper, StyledMeny, StyledSider } from './styled';

import logoIco from '../../assets/icons/logo.svg';
import logoCollapsedIco from '../../assets/icons/logo_collapse.svg';
import calendarIco from '../../assets/icons/calendar_icon.svg';
import exit from '../../assets/icons/Exit.svg';
import { ButtonMenu } from './menyButton/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setUser } from '@redux/reducers/userSlice';

export interface MenuProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu: FC<MenuProps> = ({ collapsed, setCollapsed }) => {
    const dispatch = useAppDispatch();

    type key = {
        key: string;
    };

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch(setUser({ email: '', password: '' }));
    };

    function onExitClick({ key }: key) {
        switch (key) {
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
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
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
                        key: '4',
                        icon: <IdcardOutlined style={{ color: 'rgba(6, 17, 120, 1)' }} />,
                        label: 'Профиль',
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
