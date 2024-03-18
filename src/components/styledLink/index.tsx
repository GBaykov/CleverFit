import { FC } from 'react';

import { CardInfoProps } from './types';
import { Link } from './styled';

export const StyledLink: FC<CardInfoProps> = ({ text, children, to, color, fontSize, onClick }) => {
    return (
        <Link to={to} color={color} fontSize={fontSize} onClick={onClick}>
            {children}
            {text}
        </Link>
    );
};
