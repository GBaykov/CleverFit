import { FC } from 'react';

import { CardInfoProps } from './types';
import { Link } from './styled';

export const StyledLink: FC<CardInfoProps> = ({ text, children, to, color, fontSize }) => {
    return (
        <Link to={to} color={color} fontSize={fontSize}>
            {children}
            {text}
        </Link>
    );
};
