import { Button, Card } from 'antd';
import { FC } from 'react';
import freeAcc from '../../../assets/img/freeAcc.png';
import proAcc from '../../../assets/img/proAcc.png';
import { Tariffs } from '@constants/enums';
import { CheckOutlined } from '@ant-design/icons';

export type SettingCardProps = {
    userTariff: Tariffs;
    cardTariffType: Tariffs;
};

export const SettingCard: FC<SettingCardProps> = ({ userTariff, cardTariffType }) => {
    return (
        <Card
            title={cardTariffType === Tariffs.PRO ? 'PRO tariff' : 'FREE tariff'}
            extra={<Button type='link'>Подробнее</Button>}
            actions={
                userTariff === cardTariffType
                    ? [
                          <p>
                              активен
                              <CheckOutlined />
                          </p>,
                      ]
                    : [<Button type='primary'>Активировать</Button>]
            }
        >
            <img src={cardTariffType === Tariffs.FREE ? freeAcc : proAcc} />
        </Card>
    );
};
