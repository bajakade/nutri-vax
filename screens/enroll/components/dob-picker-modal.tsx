import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

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
  const foreground = useThemeColor({}, 'foreground');
  const mutedForeground = useThemeColor({}, 'mutedForeground');
  const primary = useThemeColor({}, 'primary');

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <View
          style={{
            backgroundColor: card,
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 24,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 8,
              color: foreground,
            }}
          >
            Select Date of Birth
          </Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            minimumDate={minDate}
            maximumDate={maxDate}
            onChange={onChange}
            style={{ alignSelf: 'center' }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
            <TouchableOpacity
              onPress={onClose}
              style={{ paddingVertical: 10, paddingHorizontal: 16 }}
            >
              <Text style={{ color: mutedForeground, fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={{ paddingVertical: 10, paddingHorizontal: 16 }}
            >
              <Text style={{ color: primary, fontWeight: '600' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
