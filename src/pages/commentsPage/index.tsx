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
// import { useGetFeedbacksQuery } from 'src/services/feedbacks';

export const CommentsPage: FC = () => {
    const [isWrapped, setIsWrapped] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: commentsList = [], isFetching, isLoading } = useGetFeedbacksQuery();

    const token = useAppSelector((state) => state.userReducer.token);
    const {} = useAppSelector((state) => state.feedbacksAPI.mutations);

    const { user } = useAppSelector((state) => state.userReducer);
    const navigate = useNavigate();

    useEffect(() => {
        user.email === '' && !localStorage.getItem('token') && navigate(PATHS.AUTH);
    }, [navigate, user.email]);

    const setmodal = (bol: boolean) => {
        setIsModalOpen(bol);
    };

    useEffect(() => {
        console.log('token', token);
        console.log('data', commentsList);
    }, [commentsList]);

    // const commentsList: Feedback[] = [
    //     {
    //         id: '1',
    //         fullName: 'Вероника Киверова',
    //         imageSrc: null,
    //         message:
    //             'Я очень довольна этим приложением! Оно помогает мне следить за своим здоровьем и физической формой, предлагая разнообразные упражнения и питание. Я люблю, что приложение адаптируется к моему уровню и целям, и дает мне полезные советы и обратную связь. Я рекомендую это приложение всем, кто хочет улучшить свою жизнь!',
    //         rating: 1,
    //         createdAt: '2023-10-17T08:34:55.309Z',
    //     },
    //     {
    //         id: '2',
    //         fullName: 'Иван Петров',
    //         imageSrc: null,
    //         message:
    //             'Это приложение - отличный помощник для тех, кто занимается спортом. Оно показывает мне, как правильно выполнять упражнения, сколько калорий я сжигаю, и какой прогресс я достиг. Оно также мотивирует меня не сдаваться и достигать новых рекордов. Я уверен, что это приложение поможет мне достичь своей мечты - стать чемпионом!',
    //         rating: 1,
    //         createdAt: '2024-03-12T08:34:55.309Z',
    //     },
    //     {
    //         id: '3',
    //         fullName: 'Елена Ковалева',
    //         imageSrc: null,
    //         message:
    //             'Я не могу представить свою жизнь без этого приложения! Оно стало моим лучшим другом и наставником в области фитнеса. Оно учит меня, как заботиться о своем теле и душе, предоставляя мне интересные и эффективные упражнения, здоровое меню и релаксацию. Я чувствую себя счастливой и красивой благодаря этому приложению!',
    //         rating: 1,
    //         createdAt: '2023-12-05T08:34:55.309Z',
    //     },
    //     {
    //         id: '4',
    //         fullName: 'Елена Ковалева',
    //         imageSrc: null,
    //         message: 'Классное приложение!',
    //         rating: 4,
    //         createdAt: '2023-01-17T08:34:55.309Z',
    //     },
    //     {
    //         id: '5',
    //         fullName: 'Вероника Киверова',
    //         imageSrc: null,
    //         message:
    //             'Я очень довольна этим приложением! Оно помогает мне следить за своим здоровьем и физической формой, предлагая разнообразные упражнения и питание. Я люблю, что приложение адаптируется к моему уровню и целям, и дает мне полезные советы и обратную связь. Я рекомендую это приложение всем, кто хочет улучшить свою жизнь!',
    //         rating: 0,
    //         createdAt: '2024-03-12T08:34:55.309Z',
    //     },
    // ];

    return (
        <LayoutWrapper isFooter={false}>
            {(isFetching || isLoading) && <Loader />}
            {!isFetching && !isLoading && (
                <>
                    <ModalCreatePost isOpen={isModalOpen} setIsModalOpen={setmodal} />
                    {commentsList && (
                        <>
                            <Feedbacks commentsList={commentsList} isWrapped={isWrapped} />
                            <div style={{ marginTop: '112px' }}>
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
                            </div>{' '}
                        </>
                    )}
                    {!commentsList && <FedbacksEmty setIsModalOpen={setmodal} />}{' '}
                </>
            )}
        </LayoutWrapper>
    );
};
