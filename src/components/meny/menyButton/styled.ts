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
    padding: 0;
    border-radius: 0;
    rotate: 90deg;

    svg {
        path {
            fill: #8c8c8c;
        }
    }

    &:hover {
        color: none;
    }

    &:focus {
        outline: 0;
    }

    @media screen and (max-width: 730px) {
        display: none;
    }
`;
