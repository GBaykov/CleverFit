export enum StatusCode {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    Forbidden = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}

export enum ModalNotificationType {
    ERROR = 'error',
    BIG_FILE = 'big-file',
}

export enum ProfileInfoFormName {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    BIRTHDAY = 'birthday',
    IMAGE = 'imgSrc',
}
export enum AuthFormName {
    EMAIL = 'email',
    PASSWORD = 'password',
    REPEAT_PASSWORD = 'repeatPassword',
}
