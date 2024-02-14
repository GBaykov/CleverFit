import React from 'react';
import { Footers } from './styled';
import { CardDownload } from '@components/cardDownload';
import { StyledLink } from '@components/styledLink';

export const Footer: React.FC = () => {
    return (
        <Footers>
            <div>
                <StyledLink
                    to='/'
                    text='Смотреть отзывы'
                    color='rgba(47, 84, 235, 1)'
                    fontSize='16px'
                />
            </div>
            <CardDownload />
        </Footers>
    );
};
