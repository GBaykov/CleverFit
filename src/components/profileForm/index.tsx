import { Form, UploadFile } from 'antd';

import { FC, useState } from 'react';
import { ImageUploader } from './imageUploader';
import { useGetUserInfoQuery, useUpdateUserMutation } from '../../services/user';
import { Nullable } from '../../commonTypes';
import { UserInfo } from '../../services/types';
const IMG_BASE_URL = 'https://training-api.clevertec.ru/';

export const ProfileForm: FC = () => {
    const { data: userInfo } = useGetUserInfoQuery();
    const [updateUser] = useUpdateUserMutation();
    const [currenfImage, setCurrentImage] = useState<Nullable<UploadFile>>(null);
    console.log(userInfo);
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
        if (currenfImage) {
            const imgSrc = `${IMG_BASE_URL}${currenfImage.response.url}`;
            userToSet = { ...userToSet, ...userInfo, imgSrc };
            updateUser(userToSet);
            console.log(userToSet);
        }
    };
    return (
        <Form style={{ width: '100%', maxWidth: '480px' }}>
            {' '}
            <ImageUploader imgSrc={userInfo?.imgSrc} setCurrentImage={setImage} />
            <button type='submit' onClick={onFormSubmit} />
        </Form>
    );
};
