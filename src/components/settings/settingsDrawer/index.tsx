import { Button, Drawer, Form, Radio, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Tariffs } from '../../../commonTypes';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {
    Badges,
    Possibility,
    PossibilityTitle,
    RadioWrapper,
    StyledCheckCircleFilled,
    StyledCloseCircleOutlined,
    TariffLabel,
    TariffPossibilities,
    TariffTitle,
} from './styled';
import { primaryLight7 } from '@constants/styles';
import { tariffPossibilities } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appTariffs } from '@redux/reducers/appSlice';
import { useForm } from 'antd/lib/form/Form';
import { useLazyGetTariffListQuery, useUpdateTariffMutation } from '../../../services/tariffs';
import { FieldData } from 'rc-field-form/lib/interface';

export type SettingsDrawerProps = {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (bol: boolean) => void;
    userTariff: Tariffs;
    expired?: string;
};
export type TariffsSettingData = {
    days: number;
};

export const SettingsDrawer: FC<SettingsDrawerProps> = ({
    isDrawerOpen,
    setIsDrawerOpen,
    userTariff,
    expired,
}) => {
    const [form] = useForm();
    const [isTouched, setIsTouched] = useState(false);
    const tariffs = useAppSelector(appTariffs);
    const [getTariffs] = useLazyGetTariffListQuery();
    const [updateTariff] = useUpdateTariffMutation();
    const [currentDays, setCurrentDays] = useState<number | null>(null);

    const onClose = () => {
        setIsDrawerOpen(false);
    };

    const handleOnFieldChange = (data: FieldData[]) => {
        const days = data[0].value;
        setCurrentDays(days);
        setIsTouched(true);
    };

    const handleOnFinish = () => {
        const tariffId = tariffs[0]._id;
        const days = currentDays;
        if (days) {
            updateTariff({ days, tariffId });
        }
    };

    useEffect(() => {
        if (!tariffs.length) {
            getTariffs();
        }
    }, [getTariffs, tariffs.length]);

    const tariffList = tariffs[0]?.periods.map(({ text, cost, days }) => (
        <RadioWrapper value={days} key={text} data-test-id={`tariff-${cost}`}>
            <TariffLabel>
                <span>{text}</span>
                <Typography.Title level={5} style={{ margin: '0 24px 0 0' }}>
                    {cost.toString().replace('.', ',')} $
                </Typography.Title>
            </TariffLabel>
        </RadioWrapper>
    ));

    return (
        <Drawer
            title='Сравнить тарифы'
            placement='right'
            footer={
                <Button type='primary' disabled={!isTouched} onClick={handleOnFinish}>
                    Выбрать и оплатить
                </Button>
            }
            onClose={onClose}
            open={isDrawerOpen}
        >
            {userTariff === 'pro' && (
                <div>
                    <Typography.Title level={5}>
                        Ваш PRO tariff активен до {expired}
                    </Typography.Title>
                </div>
            )}
            <Badges>
                <TariffTitle>FREE</TariffTitle>
                <TariffTitle style={{ color: primaryLight7 }}>
                    PRO {userTariff === 'pro' && <CheckCircleOutlined />}
                </TariffTitle>
            </Badges>
            <TariffPossibilities>
                {tariffPossibilities.map(({ title, free }) => (
                    <Possibility>
                        <PossibilityTitle>{title}</PossibilityTitle>
                        {free ? <StyledCheckCircleFilled /> : <StyledCloseCircleOutlined />}
                        <CheckCircleFilled style={{ padding: '0 20px 0 50px' }} />
                    </Possibility>
                ))}
            </TariffPossibilities>
            {userTariff !== 'pro' && tariffs && (
                <Form
                    form={form}
                    id='cost-form'
                    style={{ paddingTop: 12 }}
                    onFinish={handleOnFinish}
                    onFieldsChange={(data) => handleOnFieldChange(data)}
                    data-test-id='tariff-cost'
                >
                    <Typography.Title level={5} style={{ fontWeight: 700, marginTop: 24 }}>
                        Стоимость тарифа
                    </Typography.Title>
                    <Form.Item name='days'>
                        <Radio.Group style={{ display: 'flex', flexDirection: 'column' }}>
                            {tariffList}
                        </Radio.Group>
                    </Form.Item>
                </Form>
            )}
        </Drawer>
    );
};
