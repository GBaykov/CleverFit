import React from 'react';
import { Footers } from './styled';
import { CardDownload } from '@components/cardDownload';
import { StyledLink } from '@components/styledLink';
import { PATHS } from '@constants/constants';

export const Footer: React.FC = () => {
    return (
        <>
            <Footers>
                <div>
                    <StyledLink
                        data-test-id='see-reviews'
                        to={PATHS.FEEDBACKS}
                        text='Смотреть отзывы'
                        color='rgba(47, 84, 235, 1)'
                        fontSize='16px'
                    />
                </div>
                <CardDownload />
            </Footers>
        </>
    );
};
