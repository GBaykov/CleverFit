import { Layout } from 'antd';
import styled from 'styled-components';
import backgroundIMG from '../../assets/img/MainPageLight.png';
import backgroundIMGDark from '../../assets/img/MainPageDark.png';

export const StyledMainLayoutDark = styled(Layout)`
    background-color: #fff;
    background: no-repeat center/cover url('${backgroundIMGDark}');
    position: relative;
    height: 100%;
    display: flex;
    padding: 24px;
    @media (max-width: 360px) {
        padding: 0;
    }
`;
export const StyledMainLayoutLight = styled(Layout)`
    background-color: #fff;
    background: no-repeat center/cover url('${backgroundIMG}');
    position: relative;
    height: 100%;
    display: flex;
    padding: 24px;
    @media (max-width: 360px) {
        padding: 0;
    }
`;
