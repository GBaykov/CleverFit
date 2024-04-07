import { Card } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import styled from 'styled-components';

export const StyledExerciseCard = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
        padding: 0;
    }
`;

export const StyledBattonGroup = styled(ButtonGroup)`
    max-height: 72px;
    width: 100%;
    padding: 0 var12px;
    flex-direction: column;
`;

export const StyledExerciseWraper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 12px 12px;
    border-bottom: 1px solid #f0f0f0;
    .ant-select-selection-item.ant-select-selection-item {
        text-align: start;
    }
`;
