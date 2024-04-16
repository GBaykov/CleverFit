import { Form, UploadFile } from 'antd';

import { FC, useState } from 'react';
import { ImageUploader } from './imageUploader';
import { useGetUserInfoQuery, useUpdateUserMutation } from '../../services/user';
import { Nullable } from '../../commonTypes';
import { UserInfo } from '../../services/types';
import { ModalNotification } from '@components/modal/calendarModalError';
import { ModalNotificationType } from '@constants/enums';
const IMG_BASE_URL = 'https://training-api.clevertec.ru';

export const ProfileForm: FC = () => {
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
    const [modalType, setModalType] = useState(ModalNotificationType.ERROR);
    const { data: userInfo } = useGetUserInfoQuery();
    console.log(userInfo);
    const [updateUser] = useUpdateUserMutation();
    const [currenfImage, setCurrentImage] = useState<Nullable<UploadFile>>(null);
    function setImage(img: UploadFile) {
        setCurrentImage(img);
    }
    let userToSet: UserInfo = {
        email: 'user@example.com',
        password: 'Shp1H23UmZI2CzX9t3zr6hjE9hKmM7xe1wvGKMixxeHVIWtzK6h24',
        firstName: 'string',
        lastName: 'string',
        birthday: '2024-04-16T10:06:46.647Z',
        imgSrc: 'string',
        readyForJointTraining: true,
        sendNotification: true,
    };

    const onFormSubmit = () => {
        console.log(currenfImage);
        const imgSrc = currenfImage?.response.url
            ? `${IMG_BASE_URL}${currenfImage?.response.url}`
            : '';
        userToSet = { ...userToSet, ...userInfo, imgSrc };
        updateUser(userToSet);
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
            <Form style={{ width: '100%', maxWidth: '480px' }}>
                {' '}
                <ImageUploader
                    userInfo={userInfo}
                    setCurrentImage={setImage}
                    setModal={setIsModal}
                    setModalType={setType}
                />
                <button type='submit' onClick={onFormSubmit} />
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
                    title='Файл слишком большой '
                    subtitle='Выберите файл размером [......] МБ.'
                    open={isModalErrorOpen}
                />
            )}
        </>
    );
};
