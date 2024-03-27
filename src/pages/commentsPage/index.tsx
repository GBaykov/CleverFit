import { FC, useEffect, useState } from 'react';
import 'antd/dist/antd.css';

import { useNavigate } from 'react-router-dom';

import { Loader } from '@components/loader/Loader';
import { Feedbacks } from '@components/feedbacks';
import { LayoutWrapper } from '@pages/layout';
import { Button } from 'antd';

import { ModalCreatePost } from '@components/modal/modalCreatePost';
import { FedbacksEmty } from '@components/feedbacksEmpty';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useGetFeedbacksQuery } from '../../services/feedbacks';
import { Feedback } from 'src/services/types';
import { PATHS } from '@constants/constants';
import { StyledBtnsContainer } from './styled';
// import { useGetFeedbacksQuery } from 'src/services/feedbacks';

export const CommentsPage: FC = () => {
    const [isWrapped, setIsWrapped] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: commentsList = [], isFetching, isLoading } = useGetFeedbacksQuery();
    // const commentsList: any[] = [];
    const token = useAppSelector((state) => state.userReducer.token);
    // const {} = useAppSelector((state) => state.feedbacksAPI.mutations);

    const { user } = useAppSelector((state) => state.userReducer);
    const navigate = useNavigate();

    useEffect(() => {
        user.email === '' && !localStorage.getItem('token') && navigate(PATHS.AUTH);
    }, [navigate, user.email]);

    const setmodal = (bol: boolean) => {
        setIsModalOpen(bol);
    };

    console.log('token', token);
    console.log('data', commentsList);

    return (
        <LayoutWrapper isFooter={false}>
            {(isFetching || isLoading) && <Loader />}
            {
                <>
                    <ModalCreatePost isOpen={isModalOpen} setIsModalOpen={setmodal} />
                    {commentsList.length && (
                        <>
                            <Feedbacks commentsList={commentsList} isWrapped={isWrapped} />
                            <StyledBtnsContainer>
                                <Button size='large' type='primary' onClick={() => setmodal(true)}>
                                    Написать отзыв
                                </Button>
                                <Button
                                    onClick={() => setIsWrapped(!isWrapped)}
                                    size='large'
                                    type='link'
                                >
                                    {isWrapped ? 'Развернуть' : 'Свернуть'} все отзывы
                                </Button>
                            </StyledBtnsContainer>{' '}
                        </>
                    )}
                    {!commentsList.length && <FedbacksEmty setIsModalOpen={setmodal} />}{' '}
                </>
            }
        </LayoutWrapper>
    );
};
