import { FC, useEffect } from 'react';
import 'antd/dist/antd.css';

import { useNavigate } from 'react-router-dom';

import { Loader } from '@components/loader/Loader';
import { Feedbacks } from '@components/feedbacks';
import { LayoutWrapper } from '@pages/layout';

export const CommentsPage: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {}, []);

    return (
        <LayoutWrapper>
            {/* {(isSignUpLoading || isLoginLoading) && <Loader />} */}
            <Feedbacks />
        </LayoutWrapper>
    );
};
