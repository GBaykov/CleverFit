import styled from 'styled-components';
import logoIco from '../../assets/icons/logo.svg';

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
