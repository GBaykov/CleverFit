import { FC } from 'react';
import 'antd/dist/antd.css';
import './styles.css';

import { StyledCard } from '@components/styledCard/styled';
import { CommonCardWrap } from '@pages/comonCardWrap';
import { Button, Result } from 'antd';
import { ResultStatusType } from 'antd/lib/result';

export interface ResultPageProps {
    status: ResultStatusType;
    title: string;
    subTitle?: string;
    btnText: string;
}

export const ResultPage: FC<ResultPageProps> = ({ status, title, subTitle, btnText }) => {
    return (
        <CommonCardWrap>
            <StyledCard>
                <Result
                    status={status}
                    title={title}
                    subTitle={subTitle}
                    extra={[
                        <Button type='primary' key='console'>
                            {btnText}
                        </Button>,
                    ]}
                />
            </StyledCard>
        </CommonCardWrap>
    );
};
