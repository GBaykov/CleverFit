import { FC } from 'react';
import 'antd/dist/antd.css';
import { LayoutWrapper } from '@pages/layout';
import { PagesCard } from '@components/pagesCard';
import { Settings } from '@components/settings';
import { useGetTariffListQuery } from '../../services/tariffs';

export const SettingsPage: FC = () => {
    useGetTariffListQuery();

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
