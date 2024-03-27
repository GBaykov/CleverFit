import { FC, useState } from 'react';
import 'antd/dist/antd.css';
import { StyledCard } from '@components/styledCard/styled';
import { Button, Result, Modal } from 'antd';
import { ModalDataItem, modalData } from '@constants/modalData';
import { ModalsVariants } from './enums';

export type ModalProps = {
    isModal: ModalsVariants;
    setIsModalOpen: (modal: ModalsVariants) => void;
};

export const ModalComponent: FC<ModalProps> = ({ isModal, setIsModalOpen }) => {
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
        default:
            return;
    }

    const { status, title, text, btnText, dataAtribute, secondaryBtnText } = modalDataDisplayed;

    const handleOk = () => {
        setIsModalOpen(ModalsVariants.modalClosed);
    };
    const handleCancel = () => {
        setIsModalOpen(ModalsVariants.modalClosed);
    };

    const isModalOpen =
        isModal === ModalsVariants.error_post_feedbacks ||
        isModal === ModalsVariants.error_get_feedbacks ||
        isModal === ModalsVariants.success_post_feedback;

    return (
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <div style={{ textAlign: 'center' }}>
                    <Button
                        type='primary'
                        key={dataAtribute}
                        data-test-id={dataAtribute}
                        onClick={handleOk}
                    >
                        {btnText}
                    </Button>
                    {secondaryBtnText && (
                        <Button
                            onClick={handleCancel}
                            key={dataAtribute}
                            data-test-id={dataAtribute}
                        >
                            {secondaryBtnText}
                        </Button>
                    )}
                </div>,
            ]}
        >
            <Result style={{ padding: 0 }} status={status} title={title} subTitle={text} />
        </Modal>
    );
};
