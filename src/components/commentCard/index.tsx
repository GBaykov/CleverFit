import { FC } from 'react';
import { Avatar, List } from 'antd';
import { ItemListSider, ItemListTitle, StyledItemList } from './styled';
import { Text } from '@pages/mainPage/styled';
// import { CommentType } from './types';
import avatar from '../../assets/icons/avatar.svg';
import { secondary45, title85 } from '@constants/styles';
import { Feedback } from 'src/services/types';

export type CommentCardProps = { comment: Feedback };

export const CommentCard: FC<CommentCardProps> = ({ comment }) => {
    return (
        <StyledItemList
            key={comment.id}
            // style={{ padding: 16, justifyContent: 'flex-start', marginBottom: 16, border: 'none' }}
        >
            <ItemListSider>
                <Avatar src={comment.imageSrc ? comment.imageSrc : avatar} />
                <Text fontSize='16px' lineheight='130%' width='auto' color={title85}>
                    {comment.fullName?.split(' ')[0]}
                    <br />
                    {comment.fullName?.split(' ')[1]}
                </Text>
            </ItemListSider>
            <div>
                <ItemListTitle />
                <Text color={secondary45} fontSize='16px'>
                    {comment.message}
                </Text>
            </div>
        </StyledItemList>
    );
};
