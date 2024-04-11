import { BadgeChanged } from '@components/badgeChanged';
import { UserTraining } from '@redux/types';
import { FORMAT_Y_M_D, formatDate } from '@utils/format-date';
import { Moment } from 'moment';
import { FC } from 'react';
import { StyledBadgesBlock } from './styled';

type BadgeBlocksProps = {
    listData: UserTraining[];
    date: Moment;
    onStop?: (event: any, date: Moment | string) => void;
    onChangeCell?: (date: Moment | string) => void;
    onChangeBadge?: (data: Moment) => void;
};

export const BadgeBlocks: FC<BadgeBlocksProps> = ({
    listData = [],
    onStop,
    onChangeCell,
    date,
    onChangeBadge,
}) => {
    const onStopEvent = (event: any, value: Moment | string) => onStop && onStop(event, value);

    const onChangeCellHandle = (value: Moment | string) => onChangeCell && onChangeCell(value);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus,jsx-a11y/no-static-element-interactions
        <StyledBadgesBlock
            onDoubleClick={() => onChangeCellHandle(formatDate(date, FORMAT_Y_M_D))}
            onClick={(event) => onStopEvent(event, formatDate(date, FORMAT_Y_M_D))}
        >
            <ul className='events'>
                {listData.map(({ name, isImplementation, id }) => (
                    <li key={id} style={{ lineHeight: 1.2 }}>
                        <BadgeChanged
                            disabled={isImplementation}
                            onChange={onChangeBadge}
                            text={name}
                            date={date}
                            isEdit={false}
                            isStatus={true}
                        />
                    </li>
                ))}
            </ul>
        </StyledBadgesBlock>
    );
};
