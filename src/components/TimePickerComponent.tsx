import React, { useState, useEffect, useRef } from 'react';
import styles from './TimePicker.module.css';

interface TimePickerProps {
  initialTime: { hours: number; minutes: number; period: string };
  onChange: (time: { hours: number; minutes: number; period: string }) => void;
}

const TimePickerComponent: React.FC<TimePickerProps> = ({
  initialTime,
  onChange,
}) => {
  const [hours, setHours] = useState(6);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState('AM');

  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollStartTop, setScrollStartTop] = useState(0);
  const [dragType, setDragType] = useState<string | null>(null);

  useEffect(() => {
    onChange({ hours, minutes, period });
  }, [hours, minutes, period, onChange]);

  useEffect(() => {
    if (hoursRef.current) {
      hoursRef.current.scrollTop = (hours + 1) * 40; // Adjust to keep the third item active
    }
    if (minutesRef.current) {
      minutesRef.current.scrollTop = (minutes + 2) * 40;
    }
    if (periodRef.current) {
      periodRef.current.scrollTop = period === 'AM' ? 80 : 120;
    }
  }, [hours, minutes, period]);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    type: string
  ) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setDragType(type);

    if (type === 'hour' && hoursRef.current) {
      setScrollStartTop(hoursRef.current.scrollTop);
    } else if (type === 'minute' && minutesRef.current) {
      setScrollStartTop(minutesRef.current.scrollTop);
    } else if (type === 'period' && periodRef.current) {
      setScrollStartTop(periodRef.current.scrollTop);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const delta = startY - e.clientY;

      if (dragType === 'hour' && hoursRef.current) {
        hoursRef.current.scrollTop = scrollStartTop + delta;
      } else if (dragType === 'minute' && minutesRef.current) {
        minutesRef.current.scrollTop = scrollStartTop + delta;
      } else if (dragType === 'period' && periodRef.current) {
        periodRef.current.scrollTop = scrollStartTop + delta;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    updateScrollPosition(dragType);
    setDragType(null);
  };

  const handleScroll = (type: string) => {
    updateScrollPosition(type);
  };

  const updateScrollPosition = (type: string | null) => {
    if (type === 'hour' && hoursRef.current) {
      let newHour = Math.round(hoursRef.current.scrollTop / 40) - 1; // Adjust to keep the third item active
      if (newHour < 1) newHour += 12;
      if (newHour > 12) newHour -= 12;
      setHours(newHour);
    } else if (type === 'minute' && minutesRef.current) {
      let newMinute = Math.round(minutesRef.current.scrollTop / 40) - 2;
      if (newMinute < 0) newMinute += 60;
      if (newMinute >= 60) newMinute -= 60;
      setMinutes(newMinute);
    } else if (type === 'period' && periodRef.current) {
      const newPeriod = periodRef.current.scrollTop < 100 ? 'AM' : 'PM';
      setPeriod(newPeriod);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const renderItems = (type: 'hour' | 'minute' | 'period') => {
    const items = [];
    if (type === 'hour') {
      items.push(<div className={styles.timeItem} key='empty-top-1'></div>);
      items.push(<div className={styles.timeItem} key='empty-top-2'></div>);
      for (let i = 1; i <= 12; i++) {
        items.push(
          <div
            key={i}
            className={`${styles.timeItem} ${
              hours === i ? styles.selected : ''
            }`}
          >
            {i.toString().padStart(2, '0')}
          </div>
        );
      }
      items.push(<div className={styles.timeItem} key='empty-bottom-1'></div>);
      items.push(<div className={styles.timeItem} key='empty-bottom-2'></div>);
    } else if (type === 'minute') {
      items.push(<div className={styles.timeItem} key='empty-top-1'></div>);
      items.push(<div className={styles.timeItem} key='empty-top-2'></div>);
      for (let i = 0; i < 60; i++) {
        items.push(
          <div
            key={i}
            className={`${styles.timeItem} ${
              minutes === i ? styles.selected : ''
            }`}
          >
            {i.toString().padStart(2, '0')}
          </div>
        );
      }
      items.push(<div className={styles.timeItem} key='empty-bottom-1'></div>);
      items.push(<div className={styles.timeItem} key='empty-bottom-2'></div>);
    } else {
      items.push(<div className={styles.timeItem} key='empty-top-1'></div>);
      items.push(<div className={styles.timeItem} key='empty-top-2'></div>);
      items.push(
        <div
          key='AM'
          className={`${styles.timeItem} ${
            period === 'AM' ? styles.selected : ''
          }`}
        >
          AM
        </div>
      );
      items.push(
        <div
          key='PM'
          className={`${styles.timeItem} ${
            period === 'PM' ? styles.selected : ''
          }`}
        >
          PM
        </div>
      );
      items.push(<div className={styles.timeItem} key='empty-bottom-1'></div>);
      items.push(<div className={styles.timeItem} key='empty-bottom-2'></div>);
    }
    return items;
  };

  return (
    <div className={styles.timePicker}>
      <div className={styles.column}>
        <div
          className={styles.timeSection}
          onScroll={() => handleScroll('period')}
          onMouseDown={(e) => handleMouseDown(e, 'period')}
          ref={periodRef}
        >
          <div className={styles.scrollItems}>{renderItems('period')}</div>
        </div>
      </div>
      <div className={styles.column}>
        <div
          className={styles.timeSection}
          onScroll={() => handleScroll('minute')}
          onMouseDown={(e) => handleMouseDown(e, 'minute')}
          ref={minutesRef}
        >
          <div className={styles.scrollItems}>{renderItems('minute')}</div>
        </div>
      </div>
      <div className={styles.column}>
        <div
          className={styles.timeSection}
          onScroll={() => handleScroll('hour')}
          onMouseDown={(e) => handleMouseDown(e, 'hour')}
          ref={hoursRef}
        >
          <div className={styles.scrollItems}>{renderItems('hour')}</div>
        </div>
      </div>
    </div>
  );
};

export default TimePickerComponent;
