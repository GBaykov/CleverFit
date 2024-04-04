import { FC, useState } from 'react';
import 'antd/dist/antd.css';
import { LayoutWrapper } from '@pages/layout';

import { ModalsVariants } from '@components/modal/enums';
import { ModalComponent } from '@components/modal';
import { CalendarApp } from '@components/calendar';

export const CalendarPage: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<ModalsVariants>(ModalsVariants.modalClosed);

    return (
        <>
            {/* {(isLoading || isFetching) && <Loader />} */}
            <LayoutWrapper isFooter={false}>
                <ModalComponent isModal={isModalOpen} setIsModalOpen={setIsModalOpen} />
                <CalendarApp />
            </LayoutWrapper>
        </>
    );
};
