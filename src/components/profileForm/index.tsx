import { Form } from 'antd';

import { FC, useState } from 'react';
import { ImageUploader } from './imageUploader';
import { useGetUserInfoQuery } from '../../services/user';

export const ProfileForm: FC = () => {
    const { data: userInfo } = useGetUserInfoQuery();
    console.log(userInfo);
    return (
        <Form style={{ width: '100%', maxWidth: '480px' }}>
            {' '}
            <ImageUploader userInfo={userInfo} />
        </Form>
    );
};
