import { FC, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { LayoutWrapper } from '@pages/layout';
import { PagesCard } from '@components/pagesCard';
import { ProfileForm } from '@components/profileForm';
import { Alert } from 'antd';

export const ProfilePage: FC = () => {
    return (
        <>
            {/* {(isLoading || isFetching) && <Loader />} */}
            <LayoutWrapper isFooter={false}>
                <PagesCard>
                    <ProfileForm />
                </PagesCard>
            </LayoutWrapper>
        </>
    );
};
