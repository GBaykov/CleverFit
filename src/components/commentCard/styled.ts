import { warningCol } from '@constants/styles';
import { List, Rate } from 'antd';
import styled from 'styled-components';

export const StyledItemList = styled(List.Item)`
    padding: 16px;
    justify-content: flex-start;
    margin-bottom: 16px;
    gap: 12px;
    border: none;
    border: none;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
    background-color: white;
    border-radius: 2px;
    @media (max-width: 600px) {
        gap: 12px;
    }
`;

export const ItemListSider = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    margin-right: 12px;
    min-width: 174px;
    text-align: center;
    @media (max-width: 600px) {
        flex-direction: row;
    }
`;

export const ItemListTop = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
    @media (max-width: 600px) {
        margin-bottom: 16px;
    }
`;

export const ItemListMain = styled.div``;

export const StyledRate = styled(Rate)`
    font-size: 8px;
    svg {
        width: 16px;
        height: 16px;

        path {
            fill: ${warningCol};
        }
    }

    li:not(:last-child) {
        margin-right: 4px;
    }
`;
