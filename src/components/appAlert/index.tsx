import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAppAlert } from '@redux/reducers/appSlice';
import { FC } from 'react';
import { AlertWrapper, StyledAlert } from './styled';

type AppAlertProps = {
    message?: React.ReactNode;
    type?: 'success' | 'info' | 'warning' | 'error';
    dataTestId?: string;
};

export const AppAlert: FC<AppAlertProps> = (props) => {
    const { message, type, dataTestId } = props;
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(
            setAppAlert({
                message: '',
                type: undefined,
            }),
        );
    };

    if (!type) return null;

    return (
        <AlertWrapper>
            <StyledAlert
                data-test-id={dataTestId}
                message={message}
                type={type}
                showIcon
                closable
                onClose={handleClose}
            />
        </AlertWrapper>
    );
};
