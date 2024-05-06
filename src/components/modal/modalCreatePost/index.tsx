import { FC, useEffect } from 'react';
import 'antd/dist/antd.css';

import { Button, Modal, Form } from 'antd';
import { ModalDataItem } from '@constants/modalData';

import { StyledRate } from '@components/commentCard/styled';
import TextareaAutosize from 'react-autosize-textarea';
import { usePostFeedbackMutation } from '../../../services/feedbacks';
import { Loader } from '@components/loader/Loader';
import { ModalsVariants } from '../enums';

export type ModalProps = {
    modalData: ModalDataItem;
    isModal: boolean;
};

export type ValuesCreatePostForm = {
    message: string;
    rating: number;
};

export type ModalCreatePostProps = {
    isOpen: ModalsVariants;
    setIsModalOpen: (modal: ModalsVariants) => void;
};

export const ModalCreatePost: FC<ModalCreatePostProps> = ({ isOpen, setIsModalOpen }) => {
    const [postFeedback, { isLoading, isSuccess, isError }] = usePostFeedbackMutation();
    const handleOk = () => {
        setIsModalOpen(ModalsVariants.modalClosed);
    };

    const onFinish = (values: ValuesCreatePostForm) => {
        postFeedback({ message: values.message, rating: values.rating });
        setIsModalOpen(ModalsVariants.modalClosed);
    };

    const handleCancel = () => {
        setIsModalOpen(ModalsVariants.modalClosed);
    };

    useEffect(() => {
        if (!isLoading) {
            if (isError) {
                setIsModalOpen(ModalsVariants.error_post_feedbacks);
            } else if (isSuccess) {
                setIsModalOpen(ModalsVariants.success_post_feedback);
            }
        }
    }, [isError, isLoading, isSuccess]);

    return (
        <>
            {isLoading && <Loader />}
            <Modal
                open={isOpen === ModalsVariants.createPost}
                onOk={handleOk}
                onCancel={handleCancel}
                title='Ваш отзыв'
                footer={null}
            >
                <Form onFinish={onFinish}>
                    <Form.Item name='rating'>
                        <StyledRate />
                    </Form.Item>
                    <Form.Item name='message'>
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
        </>
    );
};
