import { Select } from 'antd';
import styled from 'styled-components';

export type StyledSelectProp = {
    onChange: (value: string) => void;
};
export const StyledSelect = styled(Select)<StyledSelectProp>`
    width: 100%;

    .ant-select-selector {
        border: none;
        background-color: #ff4d4f;
        font-size: 400px;
    }
`;
