import styled from 'styled-components';

export const StyledButton = styled('button')`
    height: 0;
    width: 91px;
    position: absolute;
    top: 310px;
    left: -36px;
    z-index: 15;
    border-bottom: 20px solid white;
    border-left: 19px solid transparent;
    border-right: 19px solid transparent;
    background-color: transparent;
    border-top: transparent;
    padding: 0;
    border-radius: 0;
    rotate: 90deg;

    outline: 0;

    svg {
        path {
            fill: #8c8c8c;
        }
    }

    &:hover {
        border-bottom: 20px solid white;
        border-left: 19px solid transparent;
        border-right: 19px solid transparent;
        border-top: transparent;
    }

    &:focus {
        outline: 0;
    }

    @media screen and (max-width: 730px) {
        display: none;
    }
`;
