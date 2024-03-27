import { CommentCard } from '@components/commentCard';
import { List } from 'antd';
import { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Feedback } from 'src/services/types';

export type FeedbacksProps = {
    isWrapped: boolean;
    commentsList: Feedback[];
};

const sortData = (data: Feedback[]) => {
    const result = [...data];
    return result.sort((a, b) => {
        if (new Date(a.createdAt) < new Date(b.createdAt)) {
            return 1;
        }
        return -1;
    });
};

export const Feedbacks: FC<FeedbacksProps> = ({ isWrapped, commentsList }) => {
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
