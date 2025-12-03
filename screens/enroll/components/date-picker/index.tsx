import { MAX_AGE_MONTHS, MIN_AGE_MONTHS } from '@/constants/assessment';
import { cn } from '@/lib/utils';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useMemo, useState } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import {
    DobPickerState,
    clampDate,
    formatDateForDisplay,
    formatDateToISO,
    startOfDay,
    subtractMonths,
} from '../../helpers';

import { FieldError } from 'react-hook-form';
import { DobPickerModal } from './dob-picker-modal';

interface Props {
  label: string;
  value: string;
  errors?: FieldError;
  onChange: (value: string) => void;
  onBlur: () => void;
}
export function DatePicker({ label, value, errors, onChange, onBlur }: Props) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const maxSelectableDob = useMemo(
    () => startOfDay(subtractMonths(today, MIN_AGE_MONTHS)),
    [today],
  );
  const minSelectableDob = useMemo(
    () => startOfDay(subtractMonths(today, MAX_AGE_MONTHS)),
    [today],
  );

  const [dobPickerState, setDobPickerState] = useState<DobPickerState>({
    visible: false,
    date: maxSelectableDob,
  });

  const handleRequestDobPicker = ({
    value,
    onChange,
    onBlur,
  }: {
    value: string;
    onChange: (val: string) => void;
    onBlur: () => void;
  }) => {
    const parsed = value ? new Date(value) : null;
    const initialDate = clampDate(parsed ?? maxSelectableDob, minSelectableDob, maxSelectableDob);

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        mode: 'date',
        value: initialDate,
        minimumDate: minSelectableDob,
        maximumDate: maxSelectableDob,
        onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
          if (event.type === 'set' && selectedDate) {
            const boundedDate = clampDate(selectedDate, minSelectableDob, maxSelectableDob);
            onChange(formatDateToISO(boundedDate));
            onBlur();
          }
        },
      });
    } else {
      setDobPickerState({
        visible: true,
        date: initialDate,
        onChange: (val) => onChange(val),
        onBlur,
      });
    }
  };

  const handleDobDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setDobPickerState((prev) => ({
        ...prev,
        date: clampDate(date, minSelectableDob, maxSelectableDob),
      }));
    }
  };

  const closeDobPicker = () => {
    setDobPickerState((prev) => ({
      ...prev,
      visible: false,
      onChange: undefined,
      onBlur: undefined,
    }));
  };

  const confirmDobPicker = () => {
    const selectedISO = formatDateToISO(dobPickerState.date);
    dobPickerState.onChange?.(selectedISO);
    dobPickerState.onBlur?.();
    closeDobPicker();
  };

  return (
    <>
      <Pressable
        onPress={() =>
          handleRequestDobPicker({
            value,
            onChange,
            onBlur,
          })
        }
        className={cn(
          'h-12 rounded-xl border px-3 justify-center mb-2 bg-card',
          errors ? 'border-destructive' : 'border-border',
        )}
      >
        <Text className={cn('text-sm', value ? 'text-foreground' : 'text-muted-foreground')}>
          {value ? formatDateForDisplay(value) : label}
        </Text>
      </Pressable>
      {Platform.OS === 'ios' && (
        <DobPickerModal
          visible={dobPickerState.visible}
          date={dobPickerState.date}
          minDate={minSelectableDob}
          maxDate={maxSelectableDob}
          onClose={closeDobPicker}
          onConfirm={confirmDobPicker}
          onChange={handleDobDateChange}
        />
      )}
    </>
  );
}
