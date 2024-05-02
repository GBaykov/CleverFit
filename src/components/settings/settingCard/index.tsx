import { Button, Card } from 'antd';
import { FC } from 'react';
import freeAcc from '../../../assets/img/freeAcc.png';
import proAcc from '../../../assets/img/proAcc.png';
import { CheckOutlined } from '@ant-design/icons';
import { Tariffs } from '../../../commonTypes';
import { StyledSettingsCard } from './styled';

export type SettingCardProps = {
    userTariff: Tariffs;
    cardTariffType: Tariffs;
    expired?: string;
    setIsDrawerOpen: (b: boolean) => void;
};

export const SettingCard: FC<SettingCardProps> = ({
    userTariff,
    cardTariffType,
    expired,
    setIsDrawerOpen,
}) => {
    return (
        <StyledSettingsCard
            // style={{ maxWidth: 240 }}
            title={cardTariffType === 'pro' ? 'PRO tariff' : 'FREE tariff'}
            extra={
                <Button type='link' onClick={() => setIsDrawerOpen(true)}>
                    Подробнее
                </Button>
            }
            actions={
                cardTariffType === 'free'
                    ? [
                          <p>
                              активен
                              <CheckOutlined />
                          </p>,
                      ]
                    : expired
                    ? [
                          <p>
                              активен до
                              <br />
                              <span>expired</span>
                          </p>,
                      ]
                    : [<Button type='primary'>Активировать</Button>]
            }
        >
            <img style={{ width: '100%' }} src={cardTariffType === 'pro' ? proAcc : freeAcc} />
        </StyledSettingsCard>
    );
};
