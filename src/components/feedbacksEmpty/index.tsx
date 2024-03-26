import { primaryLight9 } from '@constants/styles';
import { Button, Card } from 'antd';
import { FC } from 'react';
import { StyledEmptyCard } from './styled';

export type ModalCreatePostProps = {
    // isOpen: boolean;
    setIsModalOpen: (bol: boolean) => void;
};

export const FedbacksEmty: FC<ModalCreatePostProps> = ({ setIsModalOpen }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <StyledEmptyCard
                title='Оставьте свой отзыв первым'
                headStyle={{
                    fontSize: 24,
                    color: primaryLight9,
                }}
            >
                <p style={{ padding: '0px 20px' }}>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями, и помогите им сделать
                    правильный выбор.
                </p>
            </StyledEmptyCard>
            <Button onClick={() => setIsModalOpen(true)} type='primary'>
                Написать отзыв
            </Button>
        </div>
    );
};