import styled from 'styled-components';
export type StyledCalendarModalProp = {
    offsetTop: number;
    isLeft: boolean;
    position: {
        offsetTop: number;
        isLeft: boolean;
    };
};
export const StyledCalendarModal = styled.div<StyledCalendarModalProp>`
    min-width: 264px;
    min-height: 200px;
    position: absolute;
    animation: fade-in 0.3s ease-in;
    z-index: 150;
    ${(position) => (position.offsetTop ? 'left: 50%; transform: translate(-50%, 0);' : '')}
    ${(position) => (position.isLeft && !position.offsetTop ? 'left: 0;' : '')}
    ${(position) => (!position.isLeft && !position.offsetTop ? 'right: 0;' : '')}
`;
