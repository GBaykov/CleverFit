import styled from 'styled-components';

import background from '../../assets/img/MainPageLight.png';
import { TextStyleProps } from './types';

export const Main = styled('main')`
    position: relative;
    background: no-repeat center/cover url(${background});
    height: auto;
`;

export const Text = styled.p<TextStyleProps>`
    color: ${(props) => (props.color ? props.color : 'black')};
    width: ${(props) => (props.width ? props.width : '100%')};
    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'normal')};
    line-height: ${(props) => (props.lineheight ? props.lineheight : 'normal')};
    margin-bottom: 0;
    max-width: ${(props) => (props.maxWidth ? props.maxWidth : '100%')};
`;

export const CardButtonWrapper = styled('div')`
    max-width: 752px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        display: flex;
        flex-direction: column;
        height: 395px;
    }
`;
