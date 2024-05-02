import { FC, useState } from 'react';
import { SettingsCards, SettingsCommentsBlock, SettingsToggleList, StyledSettings } from './styled';
import { Button, Typography } from 'antd';
import { SettingCard } from './settingCard';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { baseUser, userInfo } from '@redux/reducers/userSlice';
import { Tariffs } from '../../commonTypes';
import { SettingsToggle } from './settingToggle';
import { useUpdateUserMutation } from '../../services/user';
import { isDark, setIsDarkTheme } from '@redux/reducers/appSlice';
import { ModalsVariants } from '@components/modal/enums';
import { ModalCreatePost } from '@components/modal/modalCreatePost';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/constants';
import { SettingsDrawer } from './settingsDrawer';

export const Settings: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<ModalsVariants>(ModalsVariants.modalClosed);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const profileUser = useAppSelector(userInfo);
    const userTariff: Tariffs = profileUser.tariff ? 'pro' : 'free';

    const [updateUser, { data }] = useUpdateUserMutation();
    const { password } = useAppSelector(baseUser);

    const isDarkTheme = useAppSelector(isDark);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onReadyForJointTraining = (e: boolean) => {
        let newUser = { ...profileUser, readyForJointTraining: e };
        updateUser(newUser);
    };
    const onSendNotifications = (e: boolean) => {
        let newUser = { ...profileUser, sendNotification: e };
        updateUser(newUser);
    };
    const onIsDarkChange = (e: boolean) => {
        dispatch(setIsDarkTheme(e));
    };

    return (
        <>
            <ModalCreatePost isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <StyledSettings>
                <Typography.Title level={4} title='Мой тариф'>
                    Мой тариф
                </Typography.Title>
                <SettingsCards>
                    <SettingCard
                        expired={profileUser.tariff?.expired}
                        userTariff={userTariff}
                        cardTariffType='free'
                        setIsDrawerOpen={setIsDrawerOpen}
                    />
                    <SettingCard
                        expired={profileUser.tariff?.expired}
                        userTariff={userTariff}
                        cardTariffType='pro'
                        setIsDrawerOpen={setIsDrawerOpen}
                    />
                </SettingsCards>
                <SettingsToggleList>
                    <SettingsToggle
                        tooltipText='включеная функция позволит участвовать в совместных тренировках'
                        text='Открыт для совместных тренировок'
                        type='readyForJointTraining'
                        onToggleChange={onReadyForJointTraining}
                        checked={profileUser.readyForJointTraining}
                    />
                    <SettingsToggle
                        text='Уведомления'
                        type='sendNotification'
                        onToggleChange={onSendNotifications}
                        checked={profileUser.sendNotification}
                        tooltipText='включеная функция позволит получать уведомления об активностях'
                    />

                    <SettingsToggle
                        text='Тёмная тема'
                        type='isDarkTheme'
                        checked={isDarkTheme}
                        onToggleChange={onIsDarkChange}
                        userTariff={userTariff}
                        tooltipText='темная тема доступна для PRO tarif'
                    />
                </SettingsToggleList>
                <SettingsCommentsBlock>
                    <Button
                        block
                        type='primary'
                        onClick={() => setIsModalOpen(ModalsVariants.createPost)}
                    >
                        Написать отзыв
                    </Button>
                    <Button block type='link' onClick={() => navigate(PATHS.FEEDBACKS)}>
                        Смотреть все отзывы
                    </Button>
                </SettingsCommentsBlock>
            </StyledSettings>
            <SettingsDrawer
                isBuyDisabled={true}
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
            />
        </>
    );
};
