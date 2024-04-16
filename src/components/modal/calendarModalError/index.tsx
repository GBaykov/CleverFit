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
    modalBtnId?: string;
    modalTitleId?: string;
    modalSubTitleId?: string;
    modalButtonCloseId?: string;
};

export const ModalNotification: FC<ModalNotificationProps> = memo(
    ({
        open,
        onClickButton,
        onClose,
        title,
        isCloseIcon,
        type,
        subtitle,
        textButton,
        modalBtnId,
        modalTitleId,
        modalSubTitleId,
        modalButtonCloseId,
    }) => {
        const [openModal, setOpenModal] = useState(true);

        const openNotification = () => {
            const key = 'open';
            const btn = (
                <Button
                    type='primary'
                    size='middle'
                    onClick={onModalCancel}
                    data-test-id={modalBtnId}
                >
                    {textButton}
                </Button>
            );

            notification.open({
                message: (
                    <Typography.Title data-test-id={modalTitleId} level={5}>
                        {title}
                    </Typography.Title>
                ),
                description: (
                    <Typography.Text data-test-id={modalSubTitleId} type='secondary'>
                        {subtitle}
                    </Typography.Text>
                ),
                btn,
                key,
                icon: <StyledCloseCircleOutlined type={type} />,
                duration: 0,
                closeIcon: isCloseIcon ? <CloseOutlined data-test-id={modalButtonCloseId} /> : '',
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

        function onModalCancel() {
            setOpenModal(false);
            notification.close('open');
            onClickButton();
        }

        return (
            <Modal
                style={{ padding: 0, maxWidth: '300px' }}
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
