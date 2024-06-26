import styled from 'styled-components';
import { Layout } from 'antd';
import { Link } from '@components/styledLink/styled';
import { StyledLinkProps } from '@components/styledLink/types';

export type StyledheaderProps = {
    // isFeedbacks: boolean;
    // isCalendar: boolean;
    isMain: boolean;
};
export const Styledheader = styled(Layout)<StyledheaderProps>`
    padding: 16px 24px 16px 24px;
    height: auto;
    background: rgba(240, 245, 255, 1);
    zindex: 0;
    justify-content: space-between;
    display: ${(props) => (props.isMain ? '' : 'flex')};
    flex-direction: ${(props) => (props.isMain ? '' : 'row')};
`;

export const LinkMain = styled(Link)<StyledLinkProps>`
    display: inline;
    color: black;
    height: 18px;
    line-height: 15px;
    text-decoration: none;
    cursor: pointer;
`;
export const H1Wrapper = styled('div')`
    display: flex;
    justify-content: space-between;
`;
export const H1 = styled('h1')`
    max-width: 970px;
    margin: 0;
    font-weight: 700;
    font-size: 38px;
    @media screen and (max-width: 834px) {
        font-weight: 500;
        font-size: 18px;
    }
`;

export const SettingsWrapper = styled('div')`
    @media screen and (max-width: 730px) {
        display: none;
    }
`;

export const SettingsMobileWrapper = styled('div')`
    display: none;
    height: 40px;
    width: 41px;
    background-color: #fff;
    border-radius: 50%;
    padding-top: 10px;
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.043);
    border: 1px solid rgba(240, 240, 240, 1);
    margin-left: 10px;
    flex: none;
    @media screen and (max-width: 730px) {
        display: block;
    }
`;
