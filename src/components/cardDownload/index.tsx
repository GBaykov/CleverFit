import React from 'react';
import { Card, WrapperBottom, WrapperTop, Line, Text } from './styled';
import { StyledLink } from '@components/styledLink';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

export const CardDownload: React.FC = () => {
    return (
        <Card>
            <WrapperTop>
                <StyledLink
                    to='/'
                    text='Скачать на телефон'
                    color='rgba(47, 84, 235, 1)'
                    fontSize='16px'
                />
                <Text>Доступно в PRO-тарифе</Text>
            </WrapperTop>
            <Line />
            <WrapperBottom>
                <div>
                    <StyledLink to='/' text='Android OS' fontSize='14px'>
                        <AndroidFilled size={14} style={{ marginRight: '10px' }} />
                    </StyledLink>
                </div>
                <div>
                    <StyledLink to='/' text='Apple iOS' fontSize='14px'>
                        <AppleFilled size={14} style={{ marginRight: '10px' }} />
                    </StyledLink>
                </div>
            </WrapperBottom>
        </Card>
    );
};
