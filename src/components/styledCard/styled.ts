import { Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
    width: 100%;
    max-width: 539px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    height: 742px;
    padding: 64px 85.5px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
    font-size: 16px;
    text-align: center;
    span {
        font-size: 16px;
    }

    @media (min-width: 560px) {
        width: 100%;
    }
    @media (max-width: 540px) {
        padding: 48px 32px;
    }

    @media (max-width: 400px) {
        padding: 32px 16px;
        height: 612px;
    }
`;
