import { FC, useEffect, useState } from 'react';
import 'antd/dist/antd.css';

import { useNavigate } from 'react-router-dom';

import { Loader } from '@components/loader/Loader';
import { Feedbacks } from '@components/feedbacks';
import { LayoutWrapper } from '@pages/layout';
import { Button } from 'antd';

import { ModalCreatePost } from '@components/modal/modalCreatePost';
import { FedbacksEmty } from '@components/feedbacksEmpty';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useGetFeedbacksQuery } from '../../services/feedbacks';
import { Feedback } from 'src/services/types';
import { PATHS } from '@constants/constants';
import { StyledBtnsContainer } from './styled';
import { ModalsVariants } from '@components/modal/enums';
import { ModalComponent } from '@components/modal';
import { setToken } from '@redux/reducers/userSlice';
import { push } from 'redux-first-history';
// import { useGetFeedbacksQuery } from 'src/services/feedbacks';

export type ErrorRequestType = {
    data: {
        statusCode: number;
        message: string;
        error: string;
    };
    status: number;
};

export const CommentsPage: FC = () => {
    const dispatch = useAppDispatch();

    const [isWrapped, setIsWrapped] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState<ModalsVariants>(ModalsVariants.modalClosed);
    const {
        data: commentsList = [],
        error,
        isLoading,
        isFetching,
        isError,
        isSuccess,
    } = useGetFeedbacksQuery();

    // const { user } = useAppSelector((state) => state.userReducer);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     user.email === '' && !localStorage.getItem('token') && navigate(PATHS.AUTH);
    // }, [navigate, user.email]);

    useEffect(() => {
        if (!isLoading && isFetching) {
            if (isError && (error as ErrorRequestType).status === 403) {
                localStorage.removeItem('token');
                dispatch(setToken(''));
                dispatch(push(PATHS.AUTH));
            } else if (isError) {
                setIsModalOpen(ModalsVariants.error_get_feedbacks);
            }
        }
    }, [isError, error, dispatch, isLoading]);

    return (
        <>
            {(isLoading || isFetching) && <Loader />}
            <LayoutWrapper isFooter={false}>
                <>
                    <ModalCreatePost isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    <ModalComponent isModal={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    {commentsList.length && (
                        <>
                            <Feedbacks commentsList={commentsList} isWrapped={isWrapped} />
                            <StyledBtnsContainer>
                                <Button
                                    data-test-id='write-review'
                                    size='large'
                                    type='primary'
                                    onClick={() => setIsModalOpen(ModalsVariants.createPost)}
                                >
                                    Написать отзыв
                                </Button>
                                <Button
                                    data-test-id='all-reviews-button'
                                    onClick={() => setIsWrapped(!isWrapped)}
                                    size='large'
                                    type='link'
                                >
                                    {isWrapped ? 'Развернуть' : 'Свернуть'} все отзывы
                                </Button>
                            </StyledBtnsContainer>{' '}
                        </>
                    )}
                    {!commentsList.length && isSuccess && (
                        <FedbacksEmty setIsModalOpen={setIsModalOpen} />
                    )}{' '}
                </>
            </LayoutWrapper>
        </>
    );
};
