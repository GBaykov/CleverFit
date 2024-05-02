import styled from 'styled-components';

export const StyledSettings = styled.section`
    width: 100%;
    max-width: 505px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;
export const SettingsCards = styled.div`
    display: flex;
    gap: 25px;
    @media (max-width: 820px) {
        flex-wrap: wrap;
    }
`;

export const SettingsToggleList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 96px;
    @media (max-width: 820px) {
        margin-bottom: 20px;
    }
`;

export const SettingsCommentsBlock = styled.div`
    display: flex;
    gap: 23px;
    max-width: 331px;
    @media (max-width: 820px) {
        flex-wrap: wrap;
        gap: 16px;
    }
`;
