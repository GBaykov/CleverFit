import { FC, ReactNode } from 'react';
import { StyledPagesCard } from './styled';

type PagesCardProps = {
    children: ReactNode;
    rightPadding?: number;
};

export const PagesCard: FC<PagesCardProps> = ({ children, rightPadding }) => {
    return <StyledPagesCard rightPadding={rightPadding}>{children}</StyledPagesCard>;
};
