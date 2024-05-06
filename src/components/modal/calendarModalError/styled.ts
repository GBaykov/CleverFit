import { CloseCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

type IconProp = {
    type: string;
};

export const StyledCloseCircleOutlined = styled(CloseCircleOutlined)<IconProp>`
    > * {
        fill: ${({ type }) => (type === 'warning' ? '#2f54eb' : '#FF4D4F')};
    }
`;
