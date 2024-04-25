import { DatePicker } from 'antd';
import styled from 'styled-components';

export const PersonalInfo = styled.div`
    display: flex;
    gap: 24px;
    width: 100%;
    // flex-direction: row;
    // div {
    //     display: flex;
    //     gap: 16px;
    // }

    @media (max-width: 440px) {
        flex-direction: column-reverse;
    }
`;

export const UserInfoFields = styled.div`
    flex: 1 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 352px;
    width: 100%;

    & > div {
        margin-bottom: 0;
    }
`;

export const StyledDatePicker = styled(DatePicker)`
    width: 100%;
    max-width: 350px;
    cursor: pointer;
`;
