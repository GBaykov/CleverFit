import { FC, useState } from 'react';
import 'antd/dist/antd.css';

import { Button, Modal, Form, Rate } from 'antd';
import { ModalDataItem } from '@constants/modalData';
import TextArea from 'antd/lib/input/TextArea';

export type ModalProps = {
    modalData: ModalDataItem;
    isModal: boolean;
};

export type ValuesCreatePostForm = {
    rate: number;
    textarea: string;
};

export const ModalCreatePost: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values: ValuesCreatePostForm) => {
        setIsModalOpen(false);
        console.log(values);
    };

    return (
        <Modal open={isModalOpen} onOk={handleOk} title='Ваш отзыв' footer={null}>
            <Form onFinish={onFinish}>
                <Form.Item name='rate' label='Rate'>
                    <Rate />
                </Form.Item>
                <Form.Item name='textarea' label='TextArea'>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button onSubmit={(e) => e.preventDefault()} type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
