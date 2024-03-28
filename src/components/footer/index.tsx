import React, { useEffect, useState } from 'react';
import { Footers } from './styled';
import { CardDownload } from '@components/cardDownload';
import { StyledLink } from '@components/styledLink';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/constants';

export const Footer: React.FC = () => {
    const navigate = useNavigate();

    // const onLinkClick = () => {
    //     navigate(PATHS.FEEDBACKS);
    // };
    return (
        <>
            <Footers>
                <div>
                    <StyledLink
                        //  onClick={onLinkClick}
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
