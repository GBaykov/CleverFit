import { FC, useState } from 'react';
import { SettingsCards, StyledSettings } from './styled';
import { Typography } from 'antd';
import { SettingCard } from './settingCard';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { userInfo } from '@redux/reducers/userSlice';
import { Tariffs } from '@constants/enums';

export const Settings: FC = () => {
    const { tariff } = useAppSelector(userInfo);
    const [userTariff, setUserTariff] = useState(Tariffs.FREE);
    return (
        <StyledSettings>
            <Typography.Text title='Мой тариф' />
            <SettingsCards>
                <SettingCard userTariff={userTariff} cardTariffType={Tariffs.FREE} />
                <SettingCard userTariff={userTariff} cardTariffType={Tariffs.PRO} />
            </SettingsCards>
        </StyledSettings>
    );
};
