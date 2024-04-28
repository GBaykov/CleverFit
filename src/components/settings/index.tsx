import { FC } from 'react';
import { SettingsCards, SettingsToggleList, StyledSettings } from './styled';
import { Typography } from 'antd';
import { SettingCard } from './settingCard';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { baseUser, userInfo } from '@redux/reducers/userSlice';
import { Tariffs } from '../../commonTypes';
import { SettingsToggle } from './settingToggle';
import { useUpdateUserMutation } from '../../services/user';
import { isDark, setIsDarkTheme } from '@redux/reducers/appSlice';

export const Settings: FC = () => {
    const profileUser = useAppSelector(userInfo);
    const userTariff: Tariffs = profileUser.tariff ? 'pro' : 'free';

    const [updateUser, { data }] = useUpdateUserMutation();
    const { password } = useAppSelector(baseUser);

    const isDarkTheme = useAppSelector(isDark);
    const dispatch = useAppDispatch();

    const onReadyForJointTraining = (e: boolean) => {
        let newUser = { ...profileUser, readyForJointTraining: e };
        updateUser(newUser);
    };
    const onSendNotificationg = (e: boolean) => {
        let newUser = { ...profileUser, sendNotification: e };
        updateUser(newUser);
    };
    const onIsDarkChange = (e: boolean) => {
        dispatch(setIsDarkTheme(e));
    };

    return (
        <StyledSettings>
            <Typography.Title level={4} title='Мой тариф'>
                Мой тариф
            </Typography.Title>
            <SettingsCards>
                <SettingCard
                    expired={profileUser.tariff?.expired}
                    userTariff={userTariff}
                    cardTariffType='free'
                />
                <SettingCard
                    expired={profileUser.tariff?.expired}
                    userTariff={userTariff}
                    cardTariffType='pro'
                />
            </SettingsCards>
            <SettingsToggleList>
                <SettingsToggle
                    tooltipText='включеная функция  позволит участвовать  в совместных тренировках'
                    text='Открыт для совместных тренировок'
                    type='readyForJointTraining'
                    onToggleChange={onReadyForJointTraining}
                    checked={profileUser.readyForJointTraining}
                />
                <SettingsToggle
                    text='Уведомления'
                    type='sendNotification'
                    onToggleChange={onSendNotificationg}
                    checked={profileUser.sendNotification}
                    tooltipText='включеная функция  позволит получать  уведомления об активностях'
                />

                <SettingsToggle
                    text='Тёмная тема'
                    type='isDarkTheme'
                    checked={isDarkTheme}
                    onToggleChange={onIsDarkChange}
                    userTariff={userTariff}
                    tooltipText='темная тема  доступна для  PRO tarif'
                />
            </SettingsToggleList>
        </StyledSettings>
    );
};
