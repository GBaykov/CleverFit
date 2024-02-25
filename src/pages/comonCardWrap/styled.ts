import { Card, Layout } from 'antd';
import styled from 'styled-components';

export const StyledLayout = styled(Layout)`
    box-sizing: border-box;
    width: 100%;
    max-width: 1440px;
    height: 100vh;
    margin: 0 auto;

    position: relative;
`;

export const ContentWrapper = styled(Layout)`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 90px 16px;
    background-color: rgba(121, 156, 212, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

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
