export const URL: string = 'https://marathon-api.clevertec.ru';
export const IMG_BASE_URL: string = 'https://training-api.clevertec.ru';

export const PATHS = {
    INITIAL: '/',
    MAIN: '/main',
    AUTH: '/auth',
    REGISTRATION: '/auth/registration',
    CONFIRM_EMAIL: '/auth/confirm-email',
    CHANGE_PASSWORD: '/auth/change-password',
    FEEDBACKS: '/feedbacks',
    CALENDAR: '/calendar',
    LOGINGOOGLE: '/auth/google',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    RESULT: {
        ERROR_LOGIN: '/result/error-login',
        ERROR_USER_EXIST: '/result/error-user-exist',
        ERROR: '/result/error',
        SUCCESS: '/result/success',
        ERROR_EMAIL_NO_EXIST: '/result/error-check-email-no-exist',
        ERROR_CHECK_EMAIL: '/result/error-check-email',
        ERROR_CHANGE_PASSWORD: '/result/error-change-password',
        SUCCESS_CHANGE_PASSWORD: '/result/success-change-password',
    },
};

export const tariffPossibilities = [
    {
        title: 'Статистика за месяц',
        free: true,
    },
    {
        title: 'Статистика за всё время',
        free: false,
    },
    {
        title: 'Совместные тренировки',
        free: true,
    },
    {
        title: 'Участие в марафонах',
        free: false,
    },
    {
        title: 'Приложение iOS',
        free: false,
    },
    {
        title: 'Приложение Android',
        free: false,
    },
    {
        title: 'Индивидуальный Chat GPT',
        free: false,
    },
];
