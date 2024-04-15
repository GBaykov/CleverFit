import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ApiEndpoints } from '@constants/api';
import { URL } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { userToken } from '@redux/reducers/userSlice';
import { Form, Upload, UploadFile } from 'antd';

import { FC, useEffect, useMemo, useState } from 'react';
import { UserInfo } from '../../../services/types';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import { StatusCode } from '@constants/enums';
import { useGetUserInfoQuery } from '../../../services/user';

export type UploadType = {
    file?: UploadFile;
    fileList: UploadFile[];
};

type ImageUploaderProps = {
    userInfo?: UserInfo;
};
// const defaultFile: UploadFile = {
//     uid: '',
//     name: 'image.png',
//     status: 'done',
//     url: '',
// };

export const ImageUploader: FC<ImageUploaderProps> = ({ userInfo }) => {
    const url = userInfo?.imgSrc as string;

    const initialImage = useMemo(
        () => ({
            uid: '1',
            name: 'image',
            status: undefined,
            url,
        }),
        [url],
    );

    const file = url ? [initialImage] : [];

    const [isPhotoLoading, setIsPhotoLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>(file);

    const token = useAppSelector((state) => state.userReducer.token);

    const tokenLS = localStorage.getItem('token');

    const handleChange = ({ fileList }: UploadType) => {
        setFileList(fileList);
        const newFile = fileList[0];
        if (newFile) {
            if (newFile.status === 'error') {
                const errorFile = {
                    ...initialImage,
                    uid: '1',
                    url: '',
                    name: newFile.name,
                    status: 'error' as UploadFileStatus,
                };

                setFileList([errorFile]);
            }
            if (newFile.error?.status === StatusCode.CONFLICT) {
                console.log('BIIIIIG');
            }
        }
        console.log(newFile);
    };
    const uploadButton = (
        <div>
            {isPhotoLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Загрузить фото профиля</div>
        </div>
    );

    const uploadHeader = { Authorization: `Bearer ${token || tokenLS}` };
    console.log(fileList);

    useEffect(() => {
        if (userInfo?.imgSrc) {
            setFileList([initialImage]);
            useGetUserInfoQuery();
        }
    }, [userInfo?.imgSrc, initialImage]);
    console.log(userInfo);

    return (
        <Form.Item>
            <Upload
                action={`${URL}${ApiEndpoints.UPLOAD_IMAGE}`}
                headers={uploadHeader}
                maxCount={1}
                listType='picture-card'
                fileList={fileList}
                accept='image/*'
                // className='avatar-uploader'
                // showUploadList={false}
                onChange={handleChange}
                withCredentials={true}
                progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
        </Form.Item>
    );
};
