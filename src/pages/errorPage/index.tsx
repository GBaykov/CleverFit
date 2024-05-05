import { PagesCard } from '@components/pagesCard';
import { PATHS } from '@constants/constants';
import { LayoutWrapper } from '@pages/layout';
import { Button, Result } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const ErrorPage: FC = () => {
    const navigate = useNavigate();
    const onBtnClick = () => {
        navigate(PATHS.MAIN);
    };
    return (
        <>
            {/* {(isLoading || isFetching) && <Loader />} */}
            <LayoutWrapper isFooter={false}>
                <PagesCard>
                    <Result
                        status='404'
                        title='Такой страницы нет'
                        subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
                        extra={
                            <Button type='primary' onClick={onBtnClick}>
                                На главную
                            </Button>
                        }
                    />
                </PagesCard>
            </LayoutWrapper>
        </>
    );
};
