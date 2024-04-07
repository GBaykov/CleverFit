import styled from 'styled-components';

export type StyledBadgeWraperProp = {
    isEdit: boolean;
};
export const StyledBadgeWraper = styled.div<StyledBadgeWraperProp>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    height: ${(isEdit) => (isEdit ? '18px' : '')};
`;
