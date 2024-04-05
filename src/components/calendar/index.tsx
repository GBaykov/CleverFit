import React from 'react';
import type { Dayjs } from 'dayjs';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import { Moment } from 'moment';

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
                <p>формат {props.format()}</p>
                <p>calendar {props.calendar()}</p>
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
