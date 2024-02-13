import { FC } from 'react';
import { StyledCard } from './syled';

export interface CardtextProps {
    children: React.ReactNode;
}

export const CardText: FC<CardtextProps> = ({ children }) => {
    return <StyledCard>{children}</StyledCard>;
};
