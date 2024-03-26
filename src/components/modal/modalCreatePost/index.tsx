import { FC, useState } from 'react';
import 'antd/dist/antd.css';

import { Button, Modal, Form, Rate } from 'antd';
import { ModalDataItem } from '@constants/modalData';
import TextArea from 'antd/lib/input/TextArea';
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

export const ModalCreatePost: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

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
            open={isModalOpen}
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
