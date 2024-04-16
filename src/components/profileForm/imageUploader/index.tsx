import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ApiEndpoints } from '@constants/api';
import { URL } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Form, Upload, UploadFile } from 'antd';

import React, { FC, useEffect, useMemo, useState } from 'react';

import { UploadFileStatus } from 'antd/lib/upload/interface';
import { StatusCode } from '@constants/enums';
import { useGetUserInfoQuery, useLazyGetUserInfoQuery } from '../../../services/user';

export type UploadType = {
    file?: UploadFile;
    fileList: UploadFile[];
};

type ImageUploaderProps = {
    imgSrc?: string;
    setCurrentImage: (img: UploadFile) => void;
};
// const defaultFile: UploadFile = {
//     uid: '',
//     name: 'image.png',
//     status: 'done',
//     url: '',
// };

export const ImageUploader: FC<ImageUploaderProps> = ({ imgSrc, setCurrentImage }) => {
    // const [getUserInfo, { data: userInfo2 }] = useLazyGetUserInfoQuery();
    const url = imgSrc as string;
    // console.log(userInfo2);

    const initialImage = useMemo(
        () => ({
            uid: '1',
            name: 'image',
            status: undefined,
            url,
        }),
        [url],
    );
    // useEffect(() => {
    //     getUserInfo();
    // }, [userInfo?.imgSrc, initialImage]);

    const file = url ? [initialImage] : [];

    const [isPhotoLoading, setIsPhotoLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>(file);

    const token = useAppSelector((state) => state.userReducer.token);

    const tokenLS = localStorage.getItem('token');

    const handleChange = ({ fileList }: UploadType) => {
        console.log(fileList);
        setFileList(fileList);
        const newFile = fileList[0];
        setCurrentImage(newFile);
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
            }
        }
    };
    const uploadButton = (
        <div>
            {isPhotoLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Загрузить фото профиля</div>
        </div>
    );

    const uploadHeader = { Authorization: `Bearer ${token || tokenLS}` };

    useEffect(() => {
        if (imgSrc) {
            setFileList([initialImage]);
            // useGetUserInfoQuery();
            // getUserInfo();
        }
    }, [imgSrc, initialImage]);

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
