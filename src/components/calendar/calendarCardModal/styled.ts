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

export const StyledButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background-color: #f0f0f0;
    border-radius: 0 0 8px 8px;
    margin-top: 24px;
`;

export const StyledTitleDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > * * {
        color: var(--secondary-light);
    }
`;
