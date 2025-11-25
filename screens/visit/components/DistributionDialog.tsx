import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { AlertTriangle, CheckCircle } from 'lucide-react-native';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SACHETS, TOTAL_VISITS } from '@/constants/distribution';

import { ChildRecord, getMUACColorClass } from '../helpers';

type DistributionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  child: ChildRecord | null;
  muacUpdate: string;
  onMuacChange: (value: string) => void;
  sachets: string;
  onSachetsChange: (value: string) => void;
  emptySachets: string;
  onEmptySachetsChange: (value: string) => void;
  vaccineUpdated: boolean;
  onToggleVaccine: () => void;
  onSubmit: () => void;
};

export const DistributionDialog = ({
  open,
  onOpenChange,
  child,
  muacUpdate,
  onMuacChange,
  sachets,
  onSachetsChange,
  emptySachets,
  onEmptySachetsChange,
  vaccineUpdated,
  onToggleVaccine,
  onSubmit,
}: DistributionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <View>
        <DialogClose onPress={() => onOpenChange(false)} />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Distribution</DialogTitle>
          </DialogHeader>

          {child && (
            <ScrollView className="max-h-[70vh]">
              <View className="space-y-5">
                <View className="p-4 bg-success/10 rounded-xl">
                  <View className="flex-row items-center gap-3 mb-3">
                    <View className="text-4xl">{child.photo}</View>
                    <View>
                      <Text className="text-lg font-semibold">{child.name}</Text>
                      <Text className="text-sm text-muted-foreground">{child.serial}</Text>
                    </View>
                  </View>
                  <Text className="text-sm">
                    Visit:{' '}
                    <Text className="font-bold text-success">
                      {child.visits + 1} of {TOTAL_VISITS}
                    </Text>
                  </Text>
                </View>

                <View className="mt-2">
                  <Text className="mb-2 text-sm font-medium">MUAC Update (mm)</Text>
                  <View className="flex-row items-center gap-3">
                    <Input
                      keyboardType="numeric"
                      value={muacUpdate}
                      onChangeText={onMuacChange}
                      placeholder="e.g. 118"
                    />
                    {muacUpdate && (
                      <View
                        className={`w-10 h-10 rounded-full ${getMUACColorClass(parseInt(muacUpdate, 10) || 0)}`}
                      />
                    )}
                  </View>
                </View>

                <View>
                  <Text className="mb-2 text-sm font-medium">Sachets to Issue</Text>
                  <Input keyboardType="numeric" value={sachets} onChangeText={onSachetsChange} />
                  <Text className="mt-1 text-xs text-muted-foreground">
                    Standard: {SACHETS.STANDARD} sachets | Access issues: {SACHETS.ACCESS_ISSUES}{' '}
                    sachets
                  </Text>
                </View>

                <View>
                  <Text className="mb-2 text-sm font-medium">Empty Sachets Returned</Text>
                  <Input
                    keyboardType="numeric"
                    value={emptySachets}
                    onChangeText={onEmptySachetsChange}
                    placeholder="Count returned"
                  />
                </View>

                <TouchableOpacity
                  onPress={onToggleVaccine}
                  className="flex-row items-center gap-3 mt-4"
                >
                  <View
                    className={`w-6 h-6 rounded border-2 ${
                      vaccineUpdated ? 'bg-success border-success' : 'border-gray-400'
                    }`}
                  >
                    {vaccineUpdated && (
                      <CheckCircle size={16} color="white" className="self-center" />
                    )}
                  </View>
                  <Text>Vaccine updated today</Text>
                </TouchableOpacity>

                <View className="p-4 mt-4 border border-yellow-300 rounded-lg bg-yellow-50">
                  <View className="flex-row gap-3">
                    <AlertTriangle size={18} color="#d97706" />
                    <View className="flex-1">
                      <Text className="font-medium text-yellow-800">Counseling Points:</Text>
                      <Text className="mt-1 text-xs text-yellow-700">
                        • 1 sachet per day (20g){'\n'}• Mix with porridge{'\n'}• Report adverse
                        reactions
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          <DialogFooter>
            <Button variant="outline" onPress={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onPress={onSubmit}>Confirm & Stamp</Button>
          </DialogFooter>
        </DialogContent>
      </View>
    </Dialog>
  );
};
