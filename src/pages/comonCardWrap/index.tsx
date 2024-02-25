import { FC, ReactNode } from 'react';
import 'antd/dist/antd.css';
import { ContentWrapper, StyledLayout } from './styled';
import FormpageLight from '../../assets/img/FormPageLight.png';

export interface CommonCardWrapProps {
    children: ReactNode;
}

export const CommonCardWrap: FC<CommonCardWrapProps> = ({ children }) => {
    return (
        <StyledLayout style={{ background: `no-repeat center/cover url(${FormpageLight})` }}>
            <ContentWrapper>{children}</ContentWrapper>
        </StyledLayout>
    );
};
