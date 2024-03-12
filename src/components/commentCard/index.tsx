import React, { FC } from 'react';
import { Avatar, List } from 'antd';
import { ItemListSider, ItemListTitle } from './styled';
import { Text } from '@pages/mainPage/styled';
import { CommentType } from './types';

export type CommentCardProps = CommentType;

// export const CommentAvatar = (imageSrc: string) => {
//     return (

//     );
// };

export const CommentCard: FC<CommentCardProps> = (comment) => {
    return (
        <List.Item key={comment.id}>
            <ItemListSider>
                <Avatar src={comment.imageSrc} />
                <Text fontSize='16px' lineheight='130%' />
            </ItemListSider>
            <div>
                <ItemListTitle />
                <Text fontSize='16px' />
            </div>
        </List.Item>
    );
};
