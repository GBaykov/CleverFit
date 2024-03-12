import { CommentType } from '@components/commentCard/types';

export const Comments = () => {
    const commentsList: CommentType[] = [
        {
            id: '35',
            fullName: null,
            imageSrc: null,
            message: null,
            rating: 0,
            createdAt: '2024-03-12T08:34:55.309Z',
        },
        {
            id: '21',
            fullName: 'Вероника Киверова',
            imageSrc: null,
            message:
                'Я очень довольна этим приложением! Оно помогает мне следить за своим здоровьем и физической формой, предлагая разнообразные упражнения и питание. Я люблю, что приложение адаптируется к моему уровню и целям, и дает мне полезные советы и обратную связь. Я рекомендую это приложение всем, кто хочет улучшить свою жизнь!',
            rating: 0,
            createdAt: '2024-03-12T08:34:55.309Z',
        },
    ];
    return <div />;
};
