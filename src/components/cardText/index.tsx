import { FC } from 'react';
import { StyledCard } from './syled';
import { CardtextProps } from './types';

export const CardText: FC<CardtextProps> = ({ children }) => {
    return <StyledCard>{children}</StyledCard>;
};
