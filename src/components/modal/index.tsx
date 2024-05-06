import { FC } from 'react';
import 'antd/dist/antd.css';
import { Button, Result, Modal } from 'antd';
import { ModalDataItem, modalData } from '@constants/modalData';
import { ModalsVariants } from './enums';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setDefault, userInfo } from '@redux/reducers/userSlice';
import { setToken, setUser } from '@redux/reducers/userSlice';

export type ModalProps = {
    isModal: ModalsVariants;
    setIsModalOpen: (modal: ModalsVariants) => void;
};

export const ModalComponent: FC<ModalProps> = ({ isModal, setIsModalOpen }) => {
    const { email } = useAppSelector(userInfo);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let modalDataDisplayed: ModalDataItem;

    switch (isModal) {
        case ModalsVariants.error_get_feedbacks:
            modalDataDisplayed = modalData.error_get_feedbacks;
            break;
        case ModalsVariants.error_post_feedbacks:
            modalDataDisplayed = modalData.error_post_feedbacks;
            break;
        case ModalsVariants.success_post_feedback:
            modalDataDisplayed = modalData.success_post_feedback;
            break;
        case ModalsVariants.error_calendar_data:
            modalDataDisplayed = modalData.error_get_feedbacks;
            break;
        case ModalsVariants.payment:
            modalDataDisplayed = modalData.payment;
            break;
        default:
            return;
    }

    const { status, title, text, btnText, dataAtribute, secondaryBtnText } = modalDataDisplayed;

    const subTitle = ` Мы отправили инструкцию для оплаты вам на e-mail ${email}. После подтверждения оплаты войдите в приложение заново. Не пришло письмо? Проверьте папку Спам.`;

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch(setUser({ email: '', password: '' }));
        dispatch(setToken(''));
        dispatch(setDefault());
        navigate(PATHS.AUTH);
        console.log('logOut');
    };
    const handleCancel = () => {
        if (isModal === ModalsVariants.payment) {
            console.log('payment');
            setIsModalOpen(ModalsVariants.modalClosed);
            logOut();
        } else setIsModalOpen(ModalsVariants.modalClosed);
    };

    const handlePrimary = () => {
        if (isModal === ModalsVariants.error_post_feedbacks) {
            setIsModalOpen(ModalsVariants.createPost);
        } else if (isModal === ModalsVariants.error_get_feedbacks) {
            setIsModalOpen(ModalsVariants.modalClosed);
            navigate(PATHS.MAIN);
        } else if (isModal === ModalsVariants.success_post_feedback) {
            setIsModalOpen(ModalsVariants.modalClosed);
        } else if (isModal === ModalsVariants.error_calendar_data) {
            setIsModalOpen(ModalsVariants.modalClosed);
        }
    };

    const isModalOpen =
        isModal === ModalsVariants.error_post_feedbacks ||
        isModal === ModalsVariants.error_get_feedbacks ||
        isModal === ModalsVariants.success_post_feedback ||
        isModal === ModalsVariants.error_calendar_data ||
        isModal === ModalsVariants.payment;

    return (
        <Modal
            open={isModalOpen}
            // onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                isModal !== ModalsVariants.payment && (
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            type='primary'
                            key={dataAtribute}
                            data-test-id={dataAtribute}
                            onClick={handlePrimary}
                        >
                            {btnText}
                        </Button>
                        {secondaryBtnText && (
                            <Button onClick={handleCancel} key={dataAtribute}>
                                {secondaryBtnText}
                            </Button>
                        )}
                    </div>
                ),
            ]}
        >
            {/* <Result
                style={{ padding: 0 }}
                status={status}
                title={title}
                subTitle={text || subTitle}
            /> */}
            {isModal !== ModalsVariants.payment ? (
                <Result style={{ padding: 0 }} status={status} title={title} subTitle={text} />
            ) : (
                <Result style={{ padding: 0 }} title={title} subTitle={subTitle} />
            )}
        </Modal>
    );
};
