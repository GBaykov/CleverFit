import { FC } from 'react';
import 'antd/dist/antd.css';

import { StyledCard } from '@components/styledCard/styled';
import { CommonCardWrap } from '@pages/comonCardWrap';
import { Button, Result } from 'antd';

import { IResultDataItem } from '@constants/resultData';
import { useNavigate } from 'react-router-dom';

export interface ResultPageProps {
    resultData: IResultDataItem;
}

export const ResultPage: FC<ResultPageProps> = ({ resultData }) => {
    const { status, title, text, btnText, dataAtribute, btnPath } = resultData;
    const navigate = useNavigate();
    return (
        <CommonCardWrap>
            <StyledCard style={{ height: 'auto' }}>
                <Result
                    status={status}
                    title={title}
                    subTitle={text}
                    extra={[
                        <Button
                            type='primary'
                            key='dataAtribute'
                            data-test-id={dataAtribute}
                            onClick={() => {
                                navigate('.', { replace: true }),
                                    navigate(btnPath, { state: location.pathname });
                            }}
                        >
                            {btnText}
                        </Button>,
                    ]}
                />
            </StyledCard>
        </CommonCardWrap>
    );
};
