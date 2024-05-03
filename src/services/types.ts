export type IUrlAPI = string;

export type RequestLogin = {
    email: string;
    password: string;
};

export type ResponseLogin = {
    accessToken: string;
};

export type RequestCheck = {
    email: string;
};

export type ResponseCheck = {
    email: string;
    message: string;
};

export type RequestConfirm = {
    email: string;
    code: string;
};

export type ResponseConfirm = {
    email: string;
    message: string;
};

export type RequestChangePass = {
    password: string;
    confirmPassword: string;
};

export type ResponseChangePass = {
    message: string;
};

export type Feedback = {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
};

export type FeedbackResponse = Feedback[];
export type FeedbackRequest = {};

export type FeedbackPostRequest = {
    message: string;
    rating: number;
};

export type FeedbackPostResponse = {};

export type Tariff = {
    tariffId: string;
    expired: string;
};

export type UserInfo = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
};
export type UserInfoRequest = Partial<UserInfo>;
export type UserResponce = Omit<UserInfo, 'password'> & {
    tariff?: Tariff;
};

export type TariffListItem = {
    _id: string;
    name: string;
    periods: [
        {
            text: string;
            cost: number;
            days: number;
        },
    ];
};

export type TariffList = TariffListItem[];
export type TariffData = {
    tariffId: string;
    days: 0;
};

export type UpdateTariffRequest = {
    days: number;
    tariffId: string;
};
