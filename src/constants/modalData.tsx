import { ResultStatusType } from 'antd/lib/result';

export type ModalDataItem = {
    status: ResultStatusType;
    title: string;
    text?: string;
    btnText: string;
    secondaryBtnText?: string;
    dataAtribute?: string;
};

export type ModalData = {
    error_get_feedbacks: ModalDataItem;
    error_post_feedbacks: ModalDataItem;
    success_post_feedback: ModalDataItem;
};

export const modalData: ModalData = {
    error_get_feedbacks: {
        status: '500',
        title: 'Что-то пошло не так',
        text: 'Произошла ошибка, попробуйте ещё раз.',
        btnText: 'Назад',
    },
    error_post_feedbacks: {
        status: 'error',
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так. Попробуйте ещё раз.',
        btnText: 'Написать отзыв',
        secondaryBtnText: 'Закрыть',
        dataAtribute: 'write-review-not-saved-modal',
    },
    success_post_feedback: {
        status: 'success',
        title: 'Отзыв успешно опубликован',
        btnText: 'Отлично',
    },
};
