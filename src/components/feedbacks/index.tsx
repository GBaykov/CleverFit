import { CommentCard } from '@components/commentCard';
// import { CommentType } from '@components/commentCard/types';
import { List, Skeleton } from 'antd';
import { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Feedback } from 'src/services/types';

const sortData = (data: Feedback[]) => {
    return data.sort((a, b) => {
        if (new Date(a.createdAt) < new Date(b.createdAt)) {
            return 1;
        }
        return -1;
    });
};

export type FeedbacksProps = {
    isWrapped: boolean;
};
export const Feedbacks: FC<FeedbacksProps> = ({ isWrapped }) => {
    const commentsList: Feedback[] = [
        {
            id: '1',
            fullName: 'Вероника Киверова',
            imageSrc: null,
            message:
                'Я очень довольна этим приложением! Оно помогает мне следить за своим здоровьем и физической формой, предлагая разнообразные упражнения и питание. Я люблю, что приложение адаптируется к моему уровню и целям, и дает мне полезные советы и обратную связь. Я рекомендую это приложение всем, кто хочет улучшить свою жизнь!',
            rating: 5,
            createdAt: '2023-10-17T08:34:55.309Z',
        },
        {
            id: '2',
            fullName: 'Иван Петров',
            imageSrc: null,
            message:
                'Это приложение - отличный помощник для тех, кто занимается спортом. Оно показывает мне, как правильно выполнять упражнения, сколько калорий я сжигаю, и какой прогресс я достиг. Оно также мотивирует меня не сдаваться и достигать новых рекордов. Я уверен, что это приложение поможет мне достичь своей мечты - стать чемпионом!',
            rating: 5,
            createdAt: '2024-03-12T08:34:55.309Z',
        },
        {
            id: '3',
            fullName: 'Елена Ковалева',
            imageSrc: null,
            message:
                'Я не могу представить свою жизнь без этого приложения! Оно стало моим лучшим другом и наставником в области фитнеса. Оно учит меня, как заботиться о своем теле и душе, предоставляя мне интересные и эффективные упражнения, здоровое меню и релаксацию. Я чувствую себя счастливой и красивой благодаря этому приложению!',
            rating: 3,
            createdAt: '2023-12-05T08:34:55.309Z',
        },
        {
            id: '4',
            fullName: 'Елена Ковалева',
            imageSrc: null,
            message: 'Классное приложение!',
            rating: 4,
            createdAt: '2023-01-17T08:34:55.309Z',
        },
        {
            id: '5',
            fullName: 'Вероника Киверова',
            imageSrc: null,
            message:
                'Я очень довольна этим приложением! Оно помогает мне следить за своим здоровьем и физической формой, предлагая разнообразные упражнения и питание. Я люблю, что приложение адаптируется к моему уровню и целям, и дает мне полезные советы и обратную связь. Я рекомендую это приложение всем, кто хочет улучшить свою жизнь!',
            rating: 0,
            createdAt: '2024-03-12T08:34:55.309Z',
        },
        {
            id: '6',
            fullName: 'Вероника Киверова',
            imageSrc: null,
            message:
                'Я очень довольна этим приложением! Оно помогает мне следить за своим здоровьем и физической формой, предлагая разнообразные упражнения и питание. Я люблю, что приложение адаптируется к моему уровню и целям, и дает мне полезные советы и обратную связь. Я рекомендую это приложение всем, кто хочет улучшить свою жизнь!',
            rating: 0,
            createdAt: '2024-03-12T08:34:55.309Z',
        },
    ];
    const dataList = isWrapped ? sortData(commentsList).slice(0, 4) : sortData(commentsList);

    return (
        <div
            id='scrollableDiv'
            style={{
                height: 572,
                overflow: 'auto',
            }}
        >
            <InfiniteScroll
                dataLength={dataList.length}
                next={() => {}}
                hasMore={true}
                loader={null}
                scrollableTarget='scrollableDiv'
                style={{ padding: 0 }}
            >
                <List
                    style={{ padding: 0 }}
                    dataSource={dataList}
                    renderItem={(item) => <CommentCard comment={item} />}
                />
            </InfiniteScroll>
        </div>
    );
};
