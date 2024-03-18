import { List } from 'antd';
import styled from 'styled-components';

export const StyledItemList = styled(List.Item)`
    padding: 16px;
    justify-content: flex-start;
    margin-bottom: 16px;
    border: none;
    border: none;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
`;

export const ItemListSider = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    margin-right: 12px;
    min-width: 174px;
    text-align: center;
`;

export const ItemListTitle = styled.div``;

export const ItemListStars = styled.div``;
