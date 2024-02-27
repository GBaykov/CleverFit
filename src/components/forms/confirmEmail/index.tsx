import { FC, useEffect, useState } from 'react';
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { StyledCard } from '@components/styledCard/styled';
import { CommonCardWrap } from '@pages/comonCardWrap';
import { Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConfirmEmailMutation } from '../../../services/auth';
import { PATHS } from '@constants/constants';
import { Loader } from '@components/loader/Loader';
import VerificationInput from 'react-verification-input';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

const { Title, Text } = Typography;

export const ConfirmEmail: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAppSelector((state) => state.userReducer);
    const [confirmEmail, { isLoading, isError }] = useConfirmEmailMutation();
    const [borderStyle, setBorderStyle] = useState<string>('character');
    const [value, setValue] = useState<string>('');

    const onComplete = (value: string) => {
        confirmEmail({ email: user.email, code: value })
            .unwrap()
            .then(() => {
                navigate(PATHS.CHANGE_PASSWORD, { state: PATHS.CONFIRM_EMAIL });
            })
            .catch(() => {
                setBorderStyle('character-error'), setValue('');
            });
    };

    useEffect(() => {
        location.state != PATHS.AUTH ? navigate(PATHS.AUTH) : '';
    }, [location.state, navigate]);

    const iconStyle = { fontSize: '80px', marginBottom: '24px', color: '#2f54eb' };

    const icon = isError ? (
        <CloseCircleFilled style={iconStyle} />
    ) : (
        <ExclamationCircleFilled style={iconStyle} />
    );

    const title = isError
        ? 'Неверный код. Введите код для восстановления аккауанта'
        : 'Введите код для восстановления аккауанта';

    return (
        <CommonCardWrap>
            {isLoading && <Loader />}
            <StyledCard>
                {icon}
                <Title level={3}>{title}</Title>
                <Text disabled>
                    Мы отправили вам на e-mail{' '}
                    <span style={{ fontWeight: '600' }}>{user.email}</span> шестизначный код.
                    Введите его в поле ниже.
                </Text>
                <VerificationInput
                    value={value}
                    placeholder=''
                    inputProps={{ 'data-test-id': 'verification-input' }}
                    classNames={{
                        container: 'container',
                        character: `${borderStyle}`,
                        characterInactive: 'character__inactive',
                        characterSelected: 'character__selected',
                        characterFilled: 'character__filled',
                    }}
                    onChange={(value) => setValue(value)}
                    onComplete={onComplete}
                />
                <Text disabled>Не пришло письмо? Проверьте папку Спам.</Text>
            </StyledCard>
        </CommonCardWrap>
    );
};
