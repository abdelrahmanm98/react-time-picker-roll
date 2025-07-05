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
    natural?: boolean;
    variant?: 'default' | 'professional' | 'glass';
    asInput?: boolean;
}
declare const TimePickerComponent: React.FC<TimePickerProps>;
export default TimePickerComponent;
