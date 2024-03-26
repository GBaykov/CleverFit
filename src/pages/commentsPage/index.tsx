import { FC, useEffect, useState } from 'react';
import 'antd/dist/antd.css';

import { useNavigate } from 'react-router-dom';

import { Loader } from '@components/loader/Loader';
import { Feedbacks } from '@components/feedbacks';
import { LayoutWrapper } from '@pages/layout';
import { Button } from 'antd';

import { ModalComponent } from '@components/modal';
import { modalData } from '@constants/modalData';
import { ModalCreatePost } from '@components/modal/modalCreatePost';

export const CommentsPage: FC = () => {
    const [isWrapped, setIsWrapped] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {}, []);

    return (
        <LayoutWrapper>
            {/* {(isSignUpLoading || isLoginLoading) && <Loader />} */}
            <ModalCreatePost />
            {/* <Feedbacks isWrapped={isWrapped} /> */}
            <div style={{ marginTop: '112px' }}>
                <Button size='large' type='primary'>
                    Написать отзыв
                </Button>
                <Button onClick={() => setIsWrapped(!isWrapped)} size='large' type='link'>
                    {isWrapped ? 'Развернуть' : 'Свернуть'} все отзывы
                </Button>
            </div>
        </LayoutWrapper>
    );
};
