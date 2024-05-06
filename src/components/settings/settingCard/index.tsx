import { Button } from 'antd';
import { FC } from 'react';
import freeAcc from '../../../assets/img/freeAcc.png';
import proAcc from '../../../assets/img/proAcc.png';
import proAccActive from '../../../assets/img/proAccActive.png';
import { CheckOutlined } from '@ant-design/icons';
import { Tariffs } from '../../../commonTypes';
import { StyledCardText, StyledSettingsCard } from './styled';
import { FORMAT_D_M, formatDate } from '@utils/format-date';

export type SettingCardProps = {
    userTariff: Tariffs;
    cardTariffType: Tariffs;
    expired?: string;
    setIsDrawerOpen: (b: boolean) => void;
};

export const SettingCard: FC<SettingCardProps> = ({ cardTariffType, expired, setIsDrawerOpen }) => {
    const proCardImg = expired ? proAccActive : proAcc;
    return (
        <StyledSettingsCard
            title={cardTariffType === 'pro' ? 'PRO tariff' : 'FREE tariff'}
            extra={
                <Button type='link' onClick={() => setIsDrawerOpen(true)}>
                    Подробнее
                </Button>
            }
            actions={
                cardTariffType === 'free'
                    ? [
                          <StyledCardText>
                              активен
                              <CheckOutlined />
                          </StyledCardText>,
                      ]
                    : expired
                    ? [
                          <StyledCardText>
                              активен до
                              <br />
                              <span>{formatDate(expired, FORMAT_D_M)}</span>
                          </StyledCardText>,
                      ]
                    : [<Button type='primary'>Активировать</Button>]
            }
        >
            <img style={{ width: '100%' }} src={cardTariffType === 'free' ? freeAcc : proCardImg} />
        </StyledSettingsCard>
    );
};
