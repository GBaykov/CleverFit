import { FC } from 'react';
import { SettingsCards, StyledSettings } from './styled';
import { Typography } from 'antd';
import { SettingCard } from './settingCard';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { userInfo } from '@redux/reducers/userSlice';
import { Tariffs } from '../../commonTypes';
import { SettingsToggle } from './settingToggle';

export const Settings: FC = () => {
    const profileUser = useAppSelector(userInfo);
    const userTariff: Tariffs = profileUser.tariff ? 'pro' : 'free';
    return (
        <StyledSettings>
            <Typography.Text title='Мой тариф' />
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
            <div>
                <SettingsToggle
                    text='Открыт для совместных тренировок'
                    type='readyForJointTraining'
                />
                <SettingsToggle text='Уведомления' type='sendNotification' />
                <SettingsToggle text='Тёмная тема' type='isDarkTheme' />
            </div>
        </StyledSettings>
    );
};
