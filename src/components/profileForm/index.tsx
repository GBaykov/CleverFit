import { Alert, Button, Form, UploadFile } from 'antd';

import { FC, useCallback, useState } from 'react';

import { Nullable } from '../../commonTypes';

import { ModalNotification } from '@components/modal/calendarModalError';
import { ModalNotificationType } from '@constants/enums';
import { IMG_BASE_URL } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ValuesSignupForm, userInfo } from '@redux/reducers/userSlice';

import { ProfileInfo } from './profileInfo';
import { useUpdateUserMutation } from '../../services/user';
import { PrivacyInfo } from './privacyInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserInfo, UserResponce } from '../../services/types';
import { FORMAT_D_M_Y_POINT, formatDate } from '@utils/format-date';
import { UploadType } from './imageUploader';

export type ValuesProfileForm = {
    email: string;
    password: string;
    confirm?: string;
    imgSrc?: string | UploadType | undefined;
    firstName?: string;
    lastName?: string;
    birthday?: string;
};

export const ProfileForm: FC = () => {
    const [form] = Form.useForm();
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
    const [modalType, setModalType] = useState(ModalNotificationType.ERROR);
    // const { data: userInfo } = useGetUserInfoQuery();
    const profileInfo = useAppSelector(userInfo);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [updateUser] = useUpdateUserMutation();
    const [currenfImage, setCurrentImage] = useState<Nullable<UploadFile>>(null);
    function setImage(img: UploadFile) {
        setCurrentImage(img);
    }
    // let userToSet: UserResponce = {
    //     email: 'user@example.com',
    //     // password: 'Shp1H23UmZI2CzX9t3zr6hjE9hKmM7xe1wvGKMixxeHVIWtzK6h24',
    //     firstName: 'string',
    //     lastName: 'string',
    //     birthday: '2024-04-16T10:06:46.647Z',
    //     imgSrc: 'string',
    //     readyForJointTraining: true,
    //     sendNotification: true,
    // };

    const onFormSubmit = () => {
        console.log(currenfImage);
        const imgSrc = currenfImage?.response.url
            ? `${IMG_BASE_URL}${currenfImage?.response.url}`
            : '';
        const userToSet = { ...profileInfo, imgSrc };
        updateUser(userToSet);
    };

    const onFinish = useCallback(
        (values: ValuesProfileForm) => {
            // updateUser(userToSet);
            let newUserInfo: UserInfo = { ...profileInfo };
            if (values.birthday) {
                newUserInfo.birthday = values.birthday;
            }
            if (values.firstName) {
                newUserInfo.firstName = values.firstName;
            }
            if (values.lastName) {
                newUserInfo.lastName = values.lastName;
            }
            if (values.password) {
                newUserInfo.password = values.password;
            }
            if (values.imgSrc) {
                // newUserInfo.imgSrc = values.imgSrc;
                const imgSrc = values.imgSrc;
                if (typeof imgSrc === 'string' && imgSrc !== '') {
                    newUserInfo.imgSrc = imgSrc;
                } else if ((imgSrc as UploadType).file?.status === 'removed') {
                    newUserInfo.imgSrc = '';
                } else {
                    newUserInfo.imgSrc = `${IMG_BASE_URL}${
                        (imgSrc as UploadType).file?.response?.url
                    }`;
                }

                // const imgSrc = values.imgSrc?.response.url
                //     ? `${IMG_BASE_URL}${currenfImage?.response.url}`
                //     : '';
            }
            newUserInfo.email = values.email;
            console.log(newUserInfo);
            updateUser(newUserInfo);
        },
        [profileInfo],
    );

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onClickButtonError = () => {
        setIsModalErrorOpen(false);
    };
    const setIsModal = (open: boolean) => {
        setIsModalErrorOpen(open);
    };
    const setType = (type: ModalNotificationType) => {
        setModalType(type);
    };

    //     <Form
    //     form={form}
    //     name='auth'
    //     initialValues={{ remember: false }}
    //     onFinish={onFinish}
    //     onFinishFailed={onFinishFailed}
    //     autoComplete='off'
    // >

    return (
        <>
            <Form
                style={{ width: '100%', maxWidth: '480px' }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                name='profileInfo'
            >
                {/* <ImageUploader
                                userInfo={profileInfo}
                                setCurrentImage={setImage}
                                setModal={setIsModal}
                                setModalType={setType}
                            /> */}
                <ProfileInfo
                    setCurrentImage={setImage}
                    setModal={setIsModal}
                    setModalType={setType}
                    imgSrc={profileInfo.imgSrc}
                />
                <PrivacyInfo />
                <Form.Item shouldUpdate style={{ marginBottom: '16px' }}>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            block
                            // disabled={
                            //     !form.isFieldsTouched(true) ||
                            //     !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            // }
                        >
                            Сохранить изменения
                        </Button>
                    )}
                </Form.Item>
            </Form>
            {modalType === ModalNotificationType.ERROR && isModalErrorOpen && (
                <ModalNotification
                    textButton='Закрыть'
                    onClickButton={onClickButtonError}
                    type='error'
                    isCloseIcon={false}
                    title='При сохранении данных произошла ошибка'
                    subtitle='Придётся попробовать ещё раз'
                    open={isModalErrorOpen}
                />
            )}
            {modalType === ModalNotificationType.BIG_FILE && isModalErrorOpen && (
                <ModalNotification
                    textButton='Закрыть'
                    onClickButton={onClickButtonError}
                    type='error'
                    isCloseIcon={false}
                    title='Файл слишком большой'
                    subtitle='Выберите файл размером менее 5МБ.'
                    open={isModalErrorOpen}
                />
            )}
        </>
    );
};
