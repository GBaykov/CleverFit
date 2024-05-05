import { primaryLight9 } from '@constants/styles';
import { Card } from 'antd';
import styled from 'styled-components';

export const StyledSettingsCard = styled(Card)`
    max-width: 240px;
    @media (max-width: 360px) {
        max-width: 312px;
        width: 100%;
    }
`;

export const StyledCardText = styled.p`
    color: ${primaryLight9};
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
`;
