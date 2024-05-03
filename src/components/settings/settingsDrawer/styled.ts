import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import styled from 'styled-components';

export const Badges = styled.div`
    padding-top: 24px;
    display: flex;
    gap: 14px;
    justify-content: end;
    margin-bottom: 24px;

    @media (max-width: 360px) {
        padding: 0;
        margin-bottom: 12px;
    }
`;
export const TariffTitle = styled.div`
    display: inline-block;
    max-width: 56px;
    width: 100%;
    padding: 3px 8px;
    font-size: 12px;
    text-align: center;
    background-color: rgba(240, 240, 240, 1);
`;

export const TariffPossibilities = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 50px;
    @media (max-width: 360px) {
        gap: 8px;
        padding-bottom: 24px;
    }
`;

export const Possibility = styled.div`
    display: flex;
    justify-content: end;
`;
export const PossibilityTitle = styled.div`
    margin-right: auto;
`;

export const StyledCheckCircleFilled = styled(CheckCircleFilled)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`;
export const StyledCloseCircleOutlined = styled(CloseCircleOutlined)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`;

export const RadioWrapper = styled(Radio)`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding-right: 12px;
    margin-bottom: 4px;

    & > :nth-child(2) {
        flex: 1 0;
        padding: 0;
    }

    @media (max-width: 360px) {
        margin-bottom: 0;
    }
`;

export const TariffLabel = styled.div`
    display: flex;
    align-items: center;
    max-width: 257px;
    width: 100%;
    gap: 48px;
    justify-content: space-between;
    padding: 0;

    span {
        padding: 7px 0;
        white-space: nowrap;
    }
`;
