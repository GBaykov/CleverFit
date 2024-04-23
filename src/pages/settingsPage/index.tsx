import { FC } from 'react';
import 'antd/dist/antd.css';
import { LayoutWrapper } from '@pages/layout';
import { PagesCard } from '@components/pagesCard';
import { ProfileForm } from '@components/profileForm';
import { Settings } from '@components/settings';

export const SettingsPage: FC = () => {
    return (
        <>
            {/* {(isLoading || isFetching) && <Loader />} */}
            <LayoutWrapper isFooter={false}>
                <PagesCard>
                    <Settings />
                </PagesCard>
            </LayoutWrapper>
        </>
    );
};
