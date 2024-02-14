import { FC } from 'react';
import { StyledButton } from './styled';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ButtonMenuProps } from './types';

export const ButtonMenu: FC<ButtonMenuProps> = ({ collapsed, onClick }) => {
    return (
        <StyledButton data-test-id={'sider-switch'} onClick={onClick}>
            {collapsed ? (
                <MenuUnfoldOutlined size={16} style={{ rotate: '-90deg', marginTop: '4px' }} />
            ) : (
                <MenuFoldOutlined size={16} style={{ rotate: '-90deg', marginTop: '4px' }} />
            )}
        </StyledButton>
    );
};
