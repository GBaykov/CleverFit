import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ApiEndpoints } from '@constants/api';
import { URL } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Form, Upload, UploadFile } from 'antd';

import { FC, useEffect, useMemo, useState } from 'react';

import { UploadFileStatus } from 'antd/lib/upload/interface';
import { ModalNotificationType, ProfileInfoFormName, StatusCode } from '@constants/enums';
import { UserResponce } from '../../../services/types';
import { userToken } from '@redux/reducers/userSlice';
import { useWindowSize } from '@uidotdev/usehooks';

export type UploadType = {
    file?: UploadFile;
    fileList: UploadFile[];
};

type ImageUploaderProps = {
    imgSrc?: string;
    // userInfo?: UserResponce;
    setCurrentImage: (img: UploadFile) => void;
    setModal: (open: boolean) => void;
    setModalType: (type: ModalNotificationType) => void;
    // name: ProfileInfoFormName;
};

export const ImageUploader: FC<ImageUploaderProps> = ({
    imgSrc,
    setCurrentImage,
    setModal,
    setModalType,
    // name,
}) => {
    const size = useWindowSize();
    const isDesktop = Number(size.width) && Number(size.width) > 440;
    const listType = isDesktop ? 'picture-card' : 'picture';

    const url = imgSrc as string;

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
    const [newFileList, setNewFileList] = useState<UploadFile[]>(file);
    const showPreview = !!newFileList[0];

    useEffect(() => {
        if (imgSrc) {
            setNewFileList([initialImage]);
        }
    }, [imgSrc, initialImage]);

    useEffect(() => {
        if (imgSrc) {
            setNewFileList([{ ...initialImage, url: imgSrc }]);
        }
    }, []);

    const token = useAppSelector(userToken);
    const tokenLS = localStorage.getItem('token');

    const handleChange = ({ fileList }: UploadType) => {
        setNewFileList(fileList);
        const newFile = fileList[0];
        if (newFile) {
            // setCurrentImage(newFile);
            if (newFile.status === 'error') {
                const errorFile = {
                    ...initialImage,
                    uid: '1',
                    url: '',
                    name: newFile.name,
                    status: 'error' as UploadFileStatus,
                };

                setNewFileList([errorFile]);
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

    return (
        <Form.Item name='imgSrc'>
            <Upload
                action={`${URL}${ApiEndpoints.UPLOAD_IMAGE}`}
                headers={uploadHeader}
                maxCount={1}
                listType={listType}
                fileList={newFileList}
                defaultFileList={newFileList}
                accept='image/*'
                onChange={handleChange}
                withCredentials={true}
                progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
            >
                {!showPreview && uploadButton}
            </Upload>
        </Form.Item>
    );
};
