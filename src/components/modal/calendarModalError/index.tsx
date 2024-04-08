import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { Button, Modal, Typography, notification } from 'antd';
import { FC, memo, useEffect, useState } from 'react';
import { StyledCloseCircleOutlined } from './styled';
import './styles.css';

type ModalNotificationProps = {
    textButton: string;
    title: string;
    isCloseIcon: boolean;
    type: 'warning' | 'error';
    open: boolean;
    onClose?: () => void;
    onClickButton: () => void;
    subtitle?: string;
};

export const ModalNotification: FC<ModalNotificationProps> = memo(
    ({ open, onClickButton, onClose, title, isCloseIcon, type, subtitle, textButton }) => {
        const [openModal, setOpenModal] = useState(true);

        const openNotification = () => {
            const key = 'open';
            const btn = (
                <Button
                    type='primary'
                    size='middle'
                    onClick={onClickButton}
                    data-test-id={DATA_TEST_ID.modalErrorUserTrainingButton}
                >
                    {textButton}
                </Button>
            );

            notification.open({
                message: (
                    <Typography.Title
                        data-test-id={DATA_TEST_ID.modalErrorUserTrainingTitle}
                        level={5}
                    >
                        {title}
                    </Typography.Title>
                ),
                description: (
                    <Typography.Text
                        data-test-id={DATA_TEST_ID.modalErrorUserTrainingSubTitle}
                        type='secondary'
                    >
                        {subtitle}
                    </Typography.Text>
                ),
                btn,
                key,
                icon: <StyledCloseCircleOutlined type={type} />,
                duration: 0,
                closeIcon: isCloseIcon ? (
                    <CloseOutlined data-test-id={DATA_TEST_ID.modalErrorUserTrainingButtonClose} />
                ) : (
                    ''
                ),
                onClose,
                className: 'notification',

                placement: 'top',
            });
        };

        useEffect(() => {
            if (open && !openModal) {
                openNotification();

                return;
            }
            notification.close('open');
            setOpenModal(false);
        }, [open, openModal]);

        return (
            <Modal
                style={{ padding: 0 }}
                open={open}
                maskClosable={true}
                centered={true}
                onCancel={onClose}
                footer={null}
                closable={false}
                maskStyle={{ backdropFilter: 'blur(6px)' }}
            >
                <div />
            </Modal>
        );
    },
);
