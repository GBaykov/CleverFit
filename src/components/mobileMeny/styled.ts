import styled from 'styled-components';

export interface MenuMobileStyleProps {
    collapsed: boolean;
}

export const Menu = styled('div')<MenuMobileStyleProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 106px;
    height: 100%;
    z-index: 9;
    background-color: white;
    transition: transform 0.3s ease-in-out;
    transform: ${({ collapsed }) => (collapsed ? 'translateX(0)' : 'translateX(-100%)')};
    display: none;
    @media screen and (max-width: 730px) {
        display: block;
    }
`;

export const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 53px;
    padding: 17px 17px;
`;

export const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 192px;
    color: #fff;
    padding-left: 8px;
    padding-right: 8px;

    margin-top: 16px;
`;

export const ExitButton = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    bottom: 0;
    border-top: 1px solid rgba(240, 240, 240, 1);
`;

export const ButtonMobileMenu = styled.div`
    position: fixed;
    rotate: 90deg;
    z-index: 10;
    background-color: transparent;
    top: 61px;
    left: 94px;
    width: 69px;
    height: 51px;
    border-bottom: 48px solid white;
    border-left: 10px solid transparent;
    border-right: 15px solid transparent;
    cursor: pointer;
    svg {
        path {
            fill: #8c8c8c;
        }
    }
`;
