import React from 'react';
import type { Dayjs } from 'dayjs';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import { Moment } from 'moment';

export const CalendarApp = () => {
    const dateCellRender = (props: Moment) => {
        console.log(props);
        return (
            <div>
                <p>формат {props.format()}</p>
                <p>calendar {props.calendar()}</p>
            </div>
        );
    };

    return <Calendar dateCellRender={dateCellRender} />;
};
