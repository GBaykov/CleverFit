import { FC } from 'react';
import { StyledSettingToggle } from './styled';
import { Switch, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useUpdateUserMutation } from '../../../services/user';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { baseUser, userInfo } from '@redux/reducers/userSlice';
import { UserInfo } from '../../../services/types';
import { isDark, setIsDarkTheme } from '@redux/reducers/appSlice';

type SettingsToggleProps = {
    text: string;
    // checked: boolean;
    type: 'readyForJointTraining' | 'sendNotification' | 'isDarkTheme';
};

export const SettingsToggle: FC<SettingsToggleProps> = ({ text, type }) => {
    const [updateUser, { data }] = useUpdateUserMutation();
    const { password } = useAppSelector(baseUser);
    const profileUser = useAppSelector(userInfo);
    const isDarkTheme = useAppSelector(isDark);
    const dispatch = useAppDispatch();
    const onChange = (e: boolean) => {
        if (type === 'isDarkTheme') {
            dispatch(setIsDarkTheme());
        } else {
            let newUser: UserInfo = { ...profileUser, password };
            if (type === 'readyForJointTraining') {
                newUser.readyForJointTraining = e;
            }
            if (type === 'sendNotification') {
                newUser.sendNotification = e;
            }
            console.log(newUser);
            updateUser(newUser);
        }
    };

    let checked: boolean = false;

    if (type === 'isDarkTheme') {
        checked = isDarkTheme;
    }
    if (type === 'readyForJointTraining') {
        checked = profileUser.readyForJointTraining;
    }
    if (type === 'sendNotification') {
        checked = profileUser.sendNotification;
    }

    return (
        <StyledSettingToggle>
            <Typography.Text>
                {text}
                <ExclamationCircleOutlined />
            </Typography.Text>
            <Switch onChange={(e) => onChange(e)} checked={checked} />
        </StyledSettingToggle>
    );
};
