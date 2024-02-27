export type IUrlAPI = string;

export interface RequestLogin {
    email: string;
    password: string;
}

export interface ResponseLogin {
    accessToken: string;
}

export interface RequestCheck {
    email: string;
}

export interface ResponseCheck {
    email: string;
    message: string;
}

export interface RequestConfirm {
    email: string;
    code: string;
}

export interface ResponseConfirm {
    email: string;
    message: string;
}

export interface RequestChangePass {
    password: string;
    confirmPassword: string;
}

export interface ResponseChangePass {
    message: string;
}
