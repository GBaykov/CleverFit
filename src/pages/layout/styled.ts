import { Layout } from 'antd';
import styled from 'styled-components';
import backgroundIMG from '../../assets/img/MainPageLight.png';

export const StyledMainLayout = styled(Layout)`
    background-color: #fff;
    background: no-repeat center/cover url(${backgroundIMG});
    position: relative;
    height: 100%;
    display: flex;
    padding: 24px;
    @media (max-width: 360px) {
        padding: 0;
    }
`;
