import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { IOption } from '@/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@/hooks';

interface MenuItemProps {
  label: string;
  value: string;
  icon?: any;
  handlePress: (id: string) => void;
}
interface MenuProps {
  visible: boolean;
  onClose: () => void;
  options: IOption[];
  handleSelect: (id: any) => void;
}

const MenuItem = ({ label, value, icon, handlePress }: MenuItemProps) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      className="flex-row items-center gap-3 p-4"
      onPress={() => handlePress(value)}
    >
      <MaterialIcons name={icon} size={24} color={colors.foreground} />
      <Text className="text-base font-medium text-foreground dark:text-secondary">{label}</Text>
    </TouchableOpacity>
  );
};

const Menu = ({ visible, onClose, handleSelect, options }: MenuProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity className="flex-1 bg-black/50" activeOpacity={1} onPress={onClose}>
        <View
          className="absolute right-4 top-[60px] min-w-[180px] rounded-lg border border-border bg-card dark:bg-foreground shadow-lg shadow-black/20"
          onStartShouldSetResponder={() => true}
        >
          {options.map(({ icon, label, value }) => (
            <View key={label}>
              <MenuItem
                icon={icon}
                label={label}
                value={value as string}
                handlePress={handleSelect}
              />
              <View className="h-px bg-border" />
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Menu;
