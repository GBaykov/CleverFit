import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ApiEndpoints } from '@constants/api';
import { URL } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Form, Upload, UploadFile } from 'antd';

import { FC, useEffect, useMemo, useState } from 'react';

import { UploadFileStatus } from 'antd/lib/upload/interface';
import { ModalNotificationType, StatusCode } from '@constants/enums';
import { UserResponce } from '../../../services/types';

export type UploadType = {
    file?: UploadFile;
    fileList: UploadFile[];
};

type ImageUploaderProps = {
    // imgSrc?: string;
    userInfo?: UserResponce;
    setCurrentImage: (img: UploadFile) => void;
    setModal: (open: boolean) => void;
    setModalType: (type: ModalNotificationType) => void;
};

export const ImageUploader: FC<ImageUploaderProps> = ({
    userInfo,
    setCurrentImage,
    setModal,
    setModalType,
}) => {
    const url = userInfo?.imgSrc as string;
    console.log('userInfo?.imgSrc', userInfo?.imgSrc);
    console.log('url', url);

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
    const [initialFile, setInitialFile] = useState(initialImage);
    const [isPhotoLoading, setIsPhotoLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>(file);
    console.log();

    useEffect(() => {
        setInitialFile(initialImage);
        if (userInfo?.imgSrc && !fileList.length) {
            setFileList([initialImage]);
        }
    }, [userInfo?.imgSrc]);

    const token = useAppSelector((state) => state.userReducer.token);

    const tokenLS = localStorage.getItem('token');

    const handleChange = ({ fileList }: UploadType) => {
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
                setModal(true);
                setModalType(ModalNotificationType.ERROR);
            }
            if (newFile.error?.status === StatusCode.CONFLICT) {
                setModal(true);
                setModalType(ModalNotificationType.BIG_FILE);
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

    // useEffect(() => {
    //     if (userInfo?.imgSrc) {
    //         const file = {
    //             ...fileList[0],
    //             url: userInfo?.imgSrc,
    //         };

    //         setFileList([file]);
    //     }
    // }, [userInfo, initialImage]);
    console.log(fileList);

    return (
        <Form.Item>
            <Upload
                action={`${URL}${ApiEndpoints.UPLOAD_IMAGE}`}
                headers={uploadHeader}
                maxCount={1}
                listType='picture-card'
                fileList={fileList}
                accept='image/*'
                onChange={handleChange}
                withCredentials={true}
                progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
            >
                {fileList.length < 1 && uploadButton}
            </Upload>
        </Form.Item>
    );
};
