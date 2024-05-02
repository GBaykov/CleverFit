import { Button, Drawer } from 'antd';
import { FC, useState } from 'react';

export type SettingsDrawerProps = {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (bol: boolean) => void;
    isBuyDisabled: boolean;
};

export const SettingsDrawer: FC<SettingsDrawerProps> = ({
    isDrawerOpen,
    setIsDrawerOpen,
    isBuyDisabled,
}) => {
    const showDrawer = () => {
        setIsDrawerOpen(true);
    };

    const onClose = () => {
        setIsDrawerOpen(false);
    };
    return (
        <Drawer
            title='Сравнить тарифы'
            placement='right'
            footer={
                <Button type='primary' disabled={isBuyDisabled}>
                    Выбрать и оплатить
                </Button>
            }
            onClose={onClose}
            open={isDrawerOpen}
        >
            <p>Some contents...</p>
        </Drawer>
    );
};
