import { Form } from 'antd';

import { FC, useState } from 'react';
import { ImageUploader } from './imageUploader';
import { useGetUserInfoQuery } from 'src/services/user';

export const ProfileForm: FC = () => {
    const { data: userInfo } = useGetUserInfoQuery();
    return (
        <Form style={{ width: '100%', maxWidth: '480px' }}>
            {' '}
            <ImageUploader userInfo={userInfo} />
        </Form>
    );
};
