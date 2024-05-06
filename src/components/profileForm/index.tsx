import { Button, Form, UploadFile } from 'antd';
import { FC, useCallback, useState } from 'react';
import { Nullable } from '../../commonTypes';
import { ModalNotification } from '@components/modal/calendarModalError';
import { ModalNotificationType } from '@constants/enums';
import { IMG_BASE_URL } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { userInfo } from '@redux/reducers/userSlice';
import { ProfileInfo } from './profileInfo';
import { useUpdateUserMutation } from '../../services/user';
import { PrivacyInfo } from './privacyInfo';
import { UserInfo } from '../../services/types';
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

    const profileInfo = useAppSelector(userInfo);

    const [updateUser] = useUpdateUserMutation();
    const [currenfImage, setCurrentImage] = useState<Nullable<UploadFile>>(null);
    function setImage(img: UploadFile) {
        setCurrentImage(img);
    }
    console.log(form.isFieldsTouched());

    console.log(form.getFieldsError());

    const onFinish = useCallback(
        (values: ValuesProfileForm) => {
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
            }
            newUserInfo.email = values.email;
            updateUser(newUserInfo);
        },
        [profileInfo],
    );

    const onFinishFailed = (errorInfo: any) => {
        setIsModal(true);
        setType(ModalNotificationType.ERROR);
        console.log(errorInfo);
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

    return (
        <>
            <Form
                style={{ width: '100%', maxWidth: '480px' }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                name='profileInfo'
            >
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
                            disabled={
                                !form.isFieldsTouched() ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
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
