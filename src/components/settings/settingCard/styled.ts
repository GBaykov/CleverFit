import { Card } from 'antd';
import styled from 'styled-components';

export const StyledSettingsCard = styled(Card)`
    max-width: 240px;
    @media (max-width: 360px) {
        max-width: 312px;
        width: 100%;
    }
`;
