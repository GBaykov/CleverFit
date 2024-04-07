import React from 'react';
import type { Dayjs } from 'dayjs';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Button, Calendar, Typography } from 'antd';
import { Moment } from 'moment';
import { EditOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';

export const CalendarApp = () => {
    const onChangeCell = (event: any, date: Moment | string) => {
        event.stopPropagation();
        console.log(date);
        const d = document.querySelectorAll<any>(`[title*="${date}"]`);
        console.log(d);
    };

    const dateCellRender = (props: Moment) => {
        return (
            <div
                onClick={(event) => onChangeCell(event, props)}
                style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            >
                <Button data-test-id={`${DATA_TEST_ID.modalUpdateTrainingEditButton}`} type='link'>
                    <EditOutlined />
                </Button>
                <Badge color='green' text={`формат ${props.format()}`} />
                <Typography.Text type='secondary'>calendar ${props.calendar()}</Typography.Text>
            </div>
        );
    };

    const onPanelChange = () => {
        // if (!isBlock) {
        //     changeCardEvent(false);
        //     setParent(undefined);
        // }
    };

    return <Calendar dateCellRender={dateCellRender} />;
};
