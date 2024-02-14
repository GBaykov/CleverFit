import styled from 'styled-components';

export const Footers = styled('div')`
    margin-top: 265px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @media screen and (max-width: 600px) {
        margin-top: 32px;
        display: flex;
        align-items: center;
        flex-direction: column-reverse;
        margin-bottom: 20px;
        padding: 0;
    }
`;
