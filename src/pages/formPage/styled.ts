import styled from 'styled-components';
import { Card } from 'antd';
import logoIco from '../../assets/icons/logo.svg';

export const StyledformCard = styled(Card)`
    width: 100%;
    max-width: 539px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    height: 742px;
    padding: 64px 85.5px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
    font-size: 16px;

    span {
        font-size: 16px;
    }

    @media (min-width: 560px) {
        width: 100%;
    }
    @media (max-width: 540px) {
        padding: 48px 32px;
    }

    @media (max-width: 400px) {
        padding: 32px 16px;
        height: 612px;
    }
`;

interface FormLogoProps {
    logoIco?: string;
}

export const FormLogoWrapper = styled.div<FormLogoProps>`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 76px;
    padding: 0 29.5px 48px;
    background: no-repeat center url(${logoIco});
    background-size: 100% 100%;
    margin-bottom: 48px;

    @media (max-width: 540px) {
        margin-bottom: 40px;
    }

    @media (max-width: 400px) {
        margin-bottom: 32px;
    }
`;

// background-image:url('${logoIco}') ;
// // background: no-repeat center cover url(`${logoIco}`)
