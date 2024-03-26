import { FC, useEffect, useState } from 'react';
import 'antd/dist/antd.css';

import { Button, Modal, Form, Rate } from 'antd';
import { ModalDataItem } from '@constants/modalData';

import { StyledRate } from '@components/commentCard/styled';
import TextareaAutosize from 'react-autosize-textarea';

export type ModalProps = {
    modalData: ModalDataItem;
    isModal: boolean;
};

export type ValuesCreatePostForm = {
    rate: number;
    textarea: string;
};

export type ModalCreatePostProps = {
    isOpen: boolean;
    setIsModalOpen: (bol: boolean) => void;
};

export const ModalCreatePost: FC<ModalCreatePostProps> = ({ isOpen, setIsModalOpen }) => {
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values: ValuesCreatePostForm) => {
        setIsModalOpen(false);
        console.log(values);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            title='Ваш отзыв'
            footer={null}
        >
            <Form onFinish={onFinish}>
                <Form.Item name='rate'>
                    <StyledRate />
                </Form.Item>
                <Form.Item name='textarea'>
                    <TextareaAutosize style={{ width: '100%' }} rows={2} />
                </Form.Item>
                <Form.Item>
                    <Button
                        style={{ width: '100%' }}
                        data-test-id='new-review-submit-button'
                        onSubmit={(e) => e.preventDefault()}
                        type='primary'
                        htmlType='submit'
                    >
                        Опубликовать
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
