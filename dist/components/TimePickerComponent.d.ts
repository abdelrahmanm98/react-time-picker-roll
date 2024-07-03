import React from 'react';
interface TimePickerProps {
    initialTime: {
        hours: number;
        minutes: number;
        period: string;
    };
    onChange: (time: {
        hours: number;
        minutes: number;
        period: string;
    }) => void;
}
declare const TimePickerComponent: React.FC<TimePickerProps>;
export default TimePickerComponent;
