import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ApiEndpoints } from '@constants/api';
import { URL } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { userToken } from '@redux/reducers/userSlice';
import { Form, Upload, message } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import { FC, useState } from 'react';
import { UserInfo } from 'src/services/types';

type ImageUploaderProps = {
    userInfo?: UserInfo;
};

export const ImageUploader: FC<ImageUploaderProps> = ({ userInfo }) => {
    const [isPhotoLoading, setIsPhotoLoading] = useState(false);
    const userImage = userInfo?.imgSrc;
    const token = useAppSelector(userToken);
    const tokenLS = localStorage.getItem('token');
    const tokenForHeader = token || tokenLS;

    const uploadButton = (
        <div>
            {isPhotoLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Загрузить фото профиля</div>
        </div>
    );

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        console.log(info);
    };
    const uploadHeader = { Authorization: `Bearer ${tokenForHeader}` };
    return (
        <Form.Item>
            {' '}
            <Upload
                action={`${URL}/${ApiEndpoints.UPLOAD_IMAGE}`}
                name='avatar'
                headers={uploadHeader}
                maxCount={1}
                // listType='picture-card'
                // fileList={fileList}
                className='avatar-uploader'
                showUploadList={false}
                onChange={handleChange}
            ></Upload>
        </Form.Item>
    );
};
