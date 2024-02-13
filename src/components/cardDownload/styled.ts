import styled from 'styled-components';

export const Card = styled('div')`
    width: 240px;
    background-color: rgba(255, 255, 255, 1);
    @media screen and (max-width: 600px) {
        width: 100%;
        margin-bottom: 40px;
    }
`;
export const Text = styled('p')`
    color: rgba(140, 140, 140, 1);
    font-size: 14px;
    font-weight: 400;
    line-height: 18.2px;
    margin-top: 8px;
    margin-bottom: 0;
`;
export const WrapperTop = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 12px 24px;
    padding: 12px 24px 0px 12px;

    @media screen and (max-width: 600px) {
        align-items: center;
    }
`;

export const WrapperBottom = styled('div')`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 12px 11px;
`;

export const Line = styled('div')`
    display: inline-block;
    width: 100%;
    height: 0;
    border: 1px solid rgba(240, 240, 240, 1);
`;
