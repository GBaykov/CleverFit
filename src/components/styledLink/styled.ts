import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { StyledLinkProps } from './types';

export const Link = styled(NavLink)<StyledLinkProps>`
    cursor: pointer;
    text-decoration: none;
    color: rgba(47, 84, 235, 1);
    display: flex;
    justify-content: center;
    color: ${(props) => (props.color ? props.color : 'black')};
    line-height: 18px;
    font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
`;
