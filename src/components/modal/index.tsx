import { FC, useState } from 'react';
import 'antd/dist/antd.css';
import { StyledCard } from '@components/styledCard/styled';
import { Button, Result, Modal } from 'antd';
import { ModalDataItem } from '@constants/modalData';

export type ModalProps = {
    modalData: ModalDataItem;
    isModal: boolean;
};

export const ModalComponent: FC<ModalProps> = ({ modalData, isModal }) => {
    const { status, title, text, btnText, dataAtribute, secondaryBtnText } = modalData;
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
            <Result style={{ padding: 0 }} status={status} title={title} subTitle={text}></Result>
        </Modal>
    );
};
