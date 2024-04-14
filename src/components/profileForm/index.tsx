import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Upload, message } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import { FC, useState } from 'react';

export const ProfileForm: FC = () => {
    const [isPhotoLoading, setIsPhotoLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const uploadButton = (
        <div>
            {isPhotoLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Загрузить фото профиля</div>
        </div>
    );

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        console.log(info);
    };

    return (
        <Form style={{ width: '100%', maxWidth: '480px' }}>
            {' '}
            <Upload
                name='avatar'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}
                onChange={handleChange}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
                ) : (
                    uploadButton
                )}
            </Upload>
        </Form>
    );
};
