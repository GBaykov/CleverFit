import { FC } from 'react';
import { StyledSettingToggle } from './styled';
import { Switch, Tooltip, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useUpdateUserMutation } from '../../../services/user';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { baseUser, userInfo } from '@redux/reducers/userSlice';
import { isDark } from '@redux/reducers/appSlice';
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
    const [updateUser, { data }] = useUpdateUserMutation();
    const { password } = useAppSelector(baseUser);
    const profileUser = useAppSelector(userInfo);
    const isDarkTheme = useAppSelector(isDark);
    const dispatch = useAppDispatch();
    // const onChange = (e: boolean) => {
    // if (type === 'isDarkTheme') {
    //     dispatch(setIsDarkTheme());
    // } else {
    //     let newUser: UserInfo = { ...profileUser, password };
    //     if (type === 'readyForJointTraining') {
    //         newUser.readyForJointTraining = e;
    //     }
    //     if (type === 'sendNotification') {
    //         newUser.sendNotification = e;
    //     }
    //     console.log(newUser);
    //     updateUser(newUser);
    // }
    // };

    // let checked: boolean = false;

    // if (type === 'isDarkTheme') {
    //     checked = isDarkTheme;
    // }
    // if (type === 'readyForJointTraining') {
    //     checked = profileUser.readyForJointTraining;
    // }
    // if (type === 'sendNotification') {
    //     checked = profileUser.sendNotification;
    // }

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
