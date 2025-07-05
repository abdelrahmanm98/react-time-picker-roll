import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, px, rgba } from 'framer-motion';
import styles from './TimePicker.module.css';

interface TimePickerProps {
  initialTime: { hours: number; minutes: number; period: string };
  onChange: (time: { hours: number; minutes: number; period: string }) => void;
  natural?: boolean;
  variant?: 'default' | 'professional' | 'glass';
  asInput?: boolean;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const PERIODS = ['AM', 'PM'];
const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;
const PADDING_ITEMS = Math.floor(VISIBLE_ITEMS / 2);

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const TimePickerComponent: React.FC<TimePickerProps> = ({
  initialTime,
  onChange,
  natural,
  variant,
  asInput,
}) => {
  const [hours, setHours] = useState(initialTime?.hours || 6);
  const [minutes, setMinutes] = useState(initialTime?.minutes || 0);
  const [period, setPeriod] = useState(initialTime?.period || 'AM');
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const hoursY = useMotionValue(-((hours - 1) * ITEM_HEIGHT));
  const minutesY = useMotionValue(-(minutes * ITEM_HEIGHT));
  const periodY = useMotionValue(-(PERIODS.indexOf(period) * ITEM_HEIGHT));

  const hoursColRef: any = useRef<HTMLDivElement>(null);
  const minutesColRef: any = useRef<HTMLDivElement>(null);
  const periodColRef: any = useRef<HTMLDivElement>(null);

  const isGlass = !natural;

  useEffect(() => {
    animate(hoursY, -((hours - 1) * ITEM_HEIGHT), {
      type: 'spring',
      bounce: 0.3,
    });
  }, [hours]);
  useEffect(() => {
    animate(minutesY, -(minutes * ITEM_HEIGHT), {
      type: 'spring',
      bounce: 0.3,
    });
  }, [minutes]);
  useEffect(() => {
    animate(periodY, -(PERIODS.indexOf(period) * ITEM_HEIGHT), {
      type: 'spring',
      bounce: 0.3,
    });
  }, [period]);

  const snapTo = (val: number, arr: any[]) => {
    const idx = clamp(Math.round(-val / ITEM_HEIGHT), 0, arr.length - 1);
    return -idx * ITEM_HEIGHT;
  };

  const handleDragEnd = (type: 'hour' | 'minute' | 'period', y: number) => {
    if (type === 'hour') {
      const snapped = snapTo(y, HOURS);
      animate(hoursY, snapped, { type: 'spring', bounce: 0.3 });
      const idx = Math.abs(Math.round(snapped / ITEM_HEIGHT));
      setHours(HOURS[idx]);
      onChange({ hours: HOURS[idx], minutes, period });
    } else if (type === 'minute') {
      const snapped = snapTo(y, MINUTES);
      animate(minutesY, snapped, { type: 'spring', bounce: 0.3 });
      const idx = Math.abs(Math.round(snapped / ITEM_HEIGHT));
      setMinutes(MINUTES[idx]);
      onChange({ hours, minutes: MINUTES[idx], period });
    } else if (type === 'period') {
      const snapped = snapTo(y, PERIODS);
      animate(periodY, snapped, { type: 'spring', bounce: 0.3 });
      const idx = Math.abs(Math.round(snapped / ITEM_HEIGHT));
      setPeriod(PERIODS[idx]);
      onChange({ hours, minutes, period: PERIODS[idx] });
    }
  };

  const handleWheel = (type: 'hour' | 'minute' | 'period', e: any) => {
    e.preventDefault();
    if (type === 'hour') {
      let idx = HOURS.indexOf(hours);
      idx = clamp(idx + (e.deltaY > 0 ? 1 : -1), 0, HOURS.length - 1);
      setHours(HOURS[idx]);
      onChange({ hours: HOURS[idx], minutes, period });
    } else if (type === 'minute') {
      let idx = MINUTES.indexOf(minutes);
      idx = clamp(idx + (e.deltaY > 0 ? 1 : -1), 0, MINUTES.length - 1);
      setMinutes(MINUTES[idx]);
      onChange({ hours, minutes: MINUTES[idx], period });
    } else if (type === 'period') {
      let idx = PERIODS.indexOf(period);
      idx = clamp(idx + (e.deltaY > 0 ? 1 : -1), 0, PERIODS.length - 1);
      setPeriod(PERIODS[idx]);
      onChange({ hours, minutes, period: PERIODS[idx] });
    }
  };

  useEffect(() => {
    const hoursCol = hoursColRef.current;
    if (hoursCol) {
      const handler = (e: any) => handleWheel('hour', e);
      hoursCol.addEventListener('wheel', handler, { passive: false });
      return () => hoursCol.removeEventListener('wheel', handler);
    }
  }, [hoursColRef.current, hours, minutes, period]);
  useEffect(() => {
    const minutesCol = minutesColRef.current;
    if (minutesCol) {
      const handler = (e: any) => handleWheel('minute', e);
      minutesCol.addEventListener('wheel', handler, { passive: false });
      return () => minutesCol.removeEventListener('wheel', handler);
    }
  }, [minutesColRef.current, hours, minutes, period]);
  useEffect(() => {
    const periodCol = periodColRef.current;
    if (periodCol) {
      const handler = (e: any) => handleWheel('period', e);
      periodCol.addEventListener('wheel', handler, { passive: false });
      return () => periodCol.removeEventListener('wheel', handler);
    }
  }, [periodColRef.current, hours, minutes, period]);

  useEffect(() => {
    if (!asInput || !showPicker) return;
    function handleClick(e: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [asInput, showPicker]);

  const formatTime = (t: { hours: number; minutes: number; period: string }) =>
    `${t.hours.toString().padStart(2, '0')}:${t.minutes
      .toString()
      .padStart(2, '0')} ${t.period}`;

  if (asInput) {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <input
          ref={inputRef}
          type='text'
          value={formatTime({ hours, minutes, period })}
          readOnly
          onClick={() => setShowPicker(true)}
          className='rtp-time-picker-input'
          style={{
            width: 160,
            padding: '10px 14px',
            border: '1px solid #cbd5e1',
            borderRadius: 6,
            fontSize: 16,
            background: '#fff',
            color: '#222e3a',
            cursor: 'pointer',
            outline: showPicker ? '2px solid #667eea' : 'none',
            transition: 'outline 0.2s',
          }}
        />
        {showPicker && (
          <>
            {/* Overlay */}
            <div
              className='rtp-time-picker-modal-overlay'
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(30, 34, 45, 0.25)',
                zIndex: 1000,
                transition: 'opacity 0.2s',
                opacity: showPicker ? 1 : 0,
              }}
              onClick={() => setShowPicker(false)}
            />
            {/* Modal */}
            <div
              className='rtp-time-picker-modal'
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform:
                  'translate(-50%, -50%) scale(' +
                  (showPicker ? 1 : 0.95) +
                  ')',
                background: 'none',
                zIndex: 1001,
                transition: 'transform 0.2s',
                minWidth: 320,
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              tabIndex={-1}
            >
              <TimePickerComponent
                initialTime={{ hours, minutes, period }}
                onChange={(t) => {
                  setHours(t.hours);
                  setMinutes(t.minutes);
                  setPeriod(t.period);
                  onChange(t);
                }}
                natural={natural}
                variant={variant}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  const renderColumn = (
    arr: any[],
    value: number | string,
    y: any,
    type: 'hour' | 'minute' | 'period',
    ref: React.RefObject<HTMLDivElement>,
    glass: boolean,
    variant?: 'default' | 'professional' | 'glass'
  ) => (
    <div
      ref={ref}
      className={
        'timePickerColumn rtp-time-picker-column' +
        (variant === 'professional' ? ' professional' : '')
      }
      style={{
        width: 60,
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...(glass
          ? variant === 'professional'
            ? {
                background:
                  'linear-gradient(135deg, #667eea 0%, #957cafba 100%)',
                borderRadius: 16,
                boxShadow: '0 4px 24px 0 rgba(76, 0, 255, 0.10)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid rgba(255,255,255,0.18)',
              }
            : variant === 'glass'
            ? {
                width: '60px',
                height: '200px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 10,
                boxShadow: 'rgba(0, 0, 0, 0.04) 0px 2px 8px',
              }
            : {
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }
          : {}),
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: ITEM_HEIGHT * PADDING_ITEMS,
          left: 0,
          width: '100%',
          height: ITEM_HEIGHT,
          borderTop: '2px solid #fff8',
          borderBottom: '2px solid #fff8',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <motion.div
        style={{ y }}
        drag='y'
        dragConstraints={{ top: -(arr.length - 1) * ITEM_HEIGHT, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => handleDragEnd(type, y.get())}
        whileTap={{ cursor: 'grabbing' }}
      >
        {Array.from({ length: PADDING_ITEMS }).map((_, i) => (
          <div key={'pad-top-' + i} style={{ height: ITEM_HEIGHT }} />
        ))}
        {arr.map((item, idx) => (
          <div
            key={item}
            className={
              styles.timeItem +
              ' rtp-time-item ' +
              (value === item ? styles.selected + ' selected' : '')
            }
            style={{
              height: ITEM_HEIGHT,
              textAlign: 'center',
              fontWeight: value === item ? 700 : 400,
            }}
          >
            {typeof item === 'number' ? item.toString().padStart(2, '0') : item}
          </div>
        ))}
        {Array.from({ length: PADDING_ITEMS }).map((_, i) => (
          <div key={'pad-bot-' + i} style={{ height: ITEM_HEIGHT }} />
        ))}
      </motion.div>
    </div>
  );

  return (
    <div
      className={styles.timePicker + ' rtp-time-picker'}
      style={
        natural
          ? { display: 'flex', gap: 16 }
          : variant === 'professional'
          ? {
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 8px 32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2ba 100%)',
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 24,
              borderRadius: 24,
            }
          : variant === 'glass'
          ? {
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 8px 32px',
              background: 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 24,
              borderRadius: 24,
            }
          : {
              display: 'flex',
              gap: 16,
              background: '#f3f4f6',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 24,
              borderRadius: 24,
            }
      }
    >
      {renderColumn(
        HOURS,
        hours,
        hoursY,
        'hour',
        hoursColRef,
        !natural,
        variant
      )}
      {renderColumn(
        MINUTES,
        minutes,
        minutesY,
        'minute',
        minutesColRef,
        !natural,
        variant
      )}
      {renderColumn(
        PERIODS,
        period,
        periodY,
        'period',
        periodColRef,
        !natural,
        variant
      )}
    </div>
  );
};

export default TimePickerComponent;
