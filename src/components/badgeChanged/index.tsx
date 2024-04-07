import { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Badge, Button, Typography } from 'antd';
import { Moment } from 'moment';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { StyledBadgeWraper } from './styled';

const defaultColor = ['pink', 'yellow', 'green', 'blue', 'purple', 'gold'];

function getColorStatus() {
    const randomIndex = Math.floor(Math.random() * defaultColor.length);

    return defaultColor[randomIndex];
}

type BadgeChangedProps = {
    isEdit: boolean;
    text: string;
    date: Moment;
    index?: number;
    disabled?: boolean;
    isStatus?: boolean;
    onChange?: (value: Moment, text: string) => void;
};

export const BadgeChanged: FC<BadgeChangedProps> = ({
    isEdit = true,
    isStatus,
    onChange,
    text,
    date,
    disabled,
    index,
}) =>
    text ? (
        <StyledBadgeWraper isEdit>
            {isStatus ? (
                <Badge
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: disabled ? '#BFBFBF' : '',
                    }}
                    color={getColorStatus()}
                    size='small'
                    text={text}
                />
            ) : (
                <Typography.Text type='secondary'>{text}</Typography.Text>
            )}

            {isEdit && (
                <Button
                    data-test-id={`${DATA_TEST_ID.modalUpdateTrainingEditButton}${index}`}
                    type='link'
                    onClick={() => onChange && onChange(date, text)}
                    style={{ padding: 0, height: '25x' }}
                    disabled={disabled}
                >
                    <EditOutlined />
                </Button>
            )}
        </StyledBadgeWraper>
    ) : null;
