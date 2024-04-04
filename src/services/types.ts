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

export type Catalog = {
    name: string;
    key: string;
};

export type CatalogsList = Catalog[];

export type Exercise = {
    _id: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type TrainingParams = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[];
};

export type Training = {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: TrainingParams;
    exercises: Exercise[];
};

export type UserTrainings = Training[];
