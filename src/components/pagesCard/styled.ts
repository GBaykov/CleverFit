import styled from 'styled-components';

type StyledPagesCard = {
    rightPadding?: number;
};

export const StyledPagesCard = styled.div<StyledPagesCard>`
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 24px;
    padding-right: ${({ rightPadding }) => (rightPadding ? rightPadding : '24x')};
`;
