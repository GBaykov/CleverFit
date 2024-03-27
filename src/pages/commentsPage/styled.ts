import { primaryLight4, primaryLight5, primaryLight6, primaryLight7 } from '@constants/styles';
import { Button } from 'antd';
import styled from 'styled-components';

export const StyledBtnsContainer = styled.div`
    margin-top: 112px;

    @media (max-width: 600px) {
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        button {
            width: 100%;
        }
    }
`;

export const StyledBtn = styled(Button)`
background-color: ${primaryLight6};
 fontSize: 14px;
  border: none
  hover: {
    background-color: ${primaryLight4};
  }

pressed: {
    background-color: ${primaryLight7};
}
active: {
    background-color: ${primaryLight5};
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}
`;
