import { Card } from 'antd';
import styled from 'styled-components';

export const StyledEmptyCard = styled(Card)`
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    padding: 56px 130px;
    box-sizing: border-box;
    @media (max-width: 1325px) {
        padding: 15px 30px;
    }
`;
