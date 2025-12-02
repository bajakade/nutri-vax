import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';

type DobPickerModalProps = {
  visible: boolean;
  date: Date;
  minDate: Date;
  maxDate: Date;
  onClose: () => void;
  onConfirm: () => void;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
};

export function DobPickerModal({
  visible,
  date,
  minDate,
  maxDate,
  onClose,
  onConfirm,
  onChange,
}: DobPickerModalProps) {
  const card = useThemeColor({}, 'card');
  const mutedForeground = useThemeColor({}, 'mutedForeground');
  const primary = useThemeColor({}, 'primary');

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View className="flex flex-col justify-end bg-black/40 h-full w-full">
        <View className="px-4 pt-4 pb-6 rounded-t-[16px]" style={{ backgroundColor: card }}>
          <Text className="text-center text-base font-semibold mb-2 text-foreground dark:text-muted">
            Select Date of Birth
          </Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            minimumDate={minDate}
            maximumDate={maxDate}
            onChange={onChange}
            className="self-center"
          />
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity onPress={onClose} className="py-2 px-4">
              <Text style={{ color: mutedForeground, fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} className="py-2 px-4">
              <Text style={{ color: primary, fontWeight: '600' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
