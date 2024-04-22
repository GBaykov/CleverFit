import { Alert } from 'antd';
import styled from 'styled-components';

export const AlertWrapper = styled.div`
    position: fixed;
    width: 100%;
    bottom: 72px;
`;

export const StyledAlert = styled(Alert)`
    margin: 0 auto;
    z-index: 999;
    max-width: 395px;
    width: 100%;
`;
