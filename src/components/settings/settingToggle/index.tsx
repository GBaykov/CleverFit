import { FC } from 'react';
import { StyledSettingToggle } from './styled';
import { Switch, Tooltip, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Tariffs } from '../../../commonTypes';

type SettingsToggleProps = {
    text: string;
    tooltipText: string;
    checked: boolean;
    onToggleChange: (e: boolean) => void;
    type?: 'readyForJointTraining' | 'sendNotification' | 'isDarkTheme';
    userTariff?: Tariffs;
};

export const SettingsToggle: FC<SettingsToggleProps> = ({
    text,
    checked,
    onToggleChange,
    userTariff,
    tooltipText,
}) => {
    return (
        <StyledSettingToggle>
            <Typography.Text strong>
                {text}{' '}
                <Tooltip placement='bottomLeft' title={tooltipText}>
                    <ExclamationCircleOutlined />
                </Tooltip>
            </Typography.Text>
            <Switch
                disabled={userTariff === 'free'}
                onChange={(e) => onToggleChange(e)}
                checked={checked}
            />
        </StyledSettingToggle>
    );
};
