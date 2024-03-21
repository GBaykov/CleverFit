import { ResultStatusType } from 'antd/lib/result';
import { PATHS } from './constants';

export type ResultDataItem = {
    status: ResultStatusType;
    title: string;
    text: string;
    btnText: string;
    btnPath: string;
    dataAtribute: string;
};

export type IResultData = {
    error_login: ResultDataItem;
    success_signup: ResultDataItem;
    error_user_exist: ResultDataItem;
    error: ResultDataItem;
    error_change_password: ResultDataItem;
    success_change_password: ResultDataItem;
    error_email_no_exist: ResultDataItem;
    error_check_email: ResultDataItem;
};

export const resultData: IResultData = {
    error_login: {
        status: 'warning',
        title: 'Вход не выполнен',
        text: 'Что-то пошло не так. Попробуйте еще раз',
        btnText: 'Повторить',
        btnPath: PATHS.AUTH,
        dataAtribute: 'login-retry-button',
    },
    success_signup: {
        status: 'success',
        title: 'Регистрация успешна',
        text: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
        btnText: 'Войти',
        btnPath: PATHS.AUTH,
        dataAtribute: 'registration-enter-button',
    },
    error_user_exist: {
        status: 'error',
        title: 'Данные не сохранились',
        text: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        btnText: 'Назад к регистрации',
        btnPath: PATHS.REGISTRATION,
        dataAtribute: 'registration-back-button',
    },
    error: {
        status: 'error',
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        btnText: 'Повторить',
        btnPath: PATHS.REGISTRATION,
        dataAtribute: 'registration-retry-button',
    },
    error_change_password: {
        status: 'error',
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так попробуйте ещё раз.',
        btnText: 'Повторить',
        btnPath: PATHS.CHANGE_PASSWORD,
        dataAtribute: 'change-retry-button',
    },
    success_change_password: {
        status: 'success',
        title: 'Пароль успешно изменен',
        text: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        btnText: 'Вход',
        btnPath: PATHS.AUTH,
        dataAtribute: 'change-entry-button',
    },
    error_email_no_exist: {
        status: 'error',
        title: 'Такой e-mail не зарегистрирован',
        text: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
        btnText: 'Попробовать снова',
        btnPath: PATHS.AUTH,
        dataAtribute: 'check-retry-button',
    },
    error_check_email: {
        status: '500',
        title: 'Что-то пошло не так',
        text: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
        btnText: 'Назад',
        btnPath: PATHS.AUTH,
        dataAtribute: 'check-back-button',
    },
};
