import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

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
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View className="flex flex-col justify-end bg-black/40 h-full w-full">
        <View className="px-4 pt-4 pb-6 rounded-t-[16px] bg-card">
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
              <Text className="font-semibold text-muted-foreground">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} className="py-2 px-4">
              <Text className="font-semibold text-primary">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
