import { FC, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { LayoutWrapper } from '@pages/layout';
import { PagesCard } from '@components/pagesCard';
import { ProfileForm } from '@components/profileForm';
import { Alert } from 'antd';

export const ProfilePage: FC = () => {
    // const [isAlert, setIsAlert] = useState(false)
    return (
        <>
            {/* {(isLoading || isFetching) && <Loader />} */}
            <LayoutWrapper isFooter={false}>
                <PagesCard>
                    <ProfileForm />
                    {/* <Alert message='Данные профиля успешно обновлены' type='success' showIcon closable /> */}
                </PagesCard>
            </LayoutWrapper>
        </>
    );
};
