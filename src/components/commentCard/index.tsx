import { FC } from 'react';
import { Avatar } from 'antd';
import { ItemListSider, StyledItemList, ItemListMain, StyledRate, ItemListTop } from './styled';
import { Text } from '@pages/mainPage/styled';
import avatar from '../../assets/icons/avatar.svg';
import { gray6, secondary45, title85 } from '@constants/styles';
import { Feedback } from 'src/services/types';

export type CommentCardProps = { comment: Feedback };

const dataToFeedback = (date: string) => {
    return date.split('T')[0].split('-').reverse().join('.');
};

export const CommentCard: FC<CommentCardProps> = ({ comment }) => {
    return (
        <StyledItemList key={comment.id}>
            <ItemListSider>
                <Avatar
                    style={{ width: '42px', height: '42px' }}
                    src={comment.imageSrc ? comment.imageSrc : avatar}
                />
                <Text fontSize='16px' lineheight='130%' width='auto' color={title85}>
                    {comment.fullName?.split(' ')[0]}
                    <br />
                    {comment.fullName?.split(' ')[1]}
                </Text>
            </ItemListSider>
            <div>
                <ItemListMain>
                    <ItemListTop>
                        <StyledRate defaultValue={comment.rating} disabled />
                        <Text fontSize={'12px'} line-height={'130%'} color={gray6} width='auto'>
                            {dataToFeedback(comment.createdAt)}
                        </Text>
                    </ItemListTop>
                    <Text color={secondary45} fontSize='16px'>
                        {comment.message}
                    </Text>
                </ItemListMain>
            </div>
        </StyledItemList>
    );
};
