// screens/AttendanceScreen.tsx or components/Attendance.tsx
import { Badge } from '@/components/ui/badge';
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
import { MUAC_THRESHOLDS } from '@/constants/assessment';
import { mockChildren } from '@/constants/data';
import { SACHETS, TOTAL_VISITS } from '@/constants/distribution';
import { hasSubString } from '@/helpers/string';
import { AlertTriangle, Award, CheckCircle, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AttendanceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [showDistribute, setShowDistribute] = useState(false);
  const [muacUpdate, setMuacUpdate] = useState('');
  const [sachets, setSachets] = useState(String(SACHETS.STANDARD));
  const [emptySachets, setEmptySachets] = useState('');
  const [vaccineUpdated, setVaccineUpdated] = useState(false);

  const getMUACColor = (muac: number) => {
    if (muac >= MUAC_THRESHOLDS.NORMAL) {
      return 'bg-success';
    }

    if (muac >= MUAC_THRESHOLDS.MODERATE) {
      return 'bg-warning';
    }

    return 'bg-destructive';
  };

  const filteredChildren = mockChildren.filter((child) => {
    return hasSubString(child.name, searchQuery) || hasSubString(child.serial, searchQuery);
  });

  const handleDistribute = () => {
    Alert.alert('Success', 'Distribution recorded successfully!');
    setShowDistribute(false);
    setSelectedChild(null);
    setMuacUpdate('');
    setSachets('28');
    setEmptySachets('');
    setVaccineUpdated(false);
  };

  return (
    <ScrollView className="flex-1 px-4 pt-6 bg-background">
      <Text className="mb-1 text-2xl font-bold text-foreground">Attendance & Distribution</Text>
      <Text className="mb-6 text-muted-foreground">Record daily SQ-LNS distribution</Text>

      {/* Search */}
      <View className="relative mb-6">
        {/* Icon */}
        <View className="absolute z-10 -translate-y-1/2 left-3 top-1/2">
          <Search size={20} color="foreground" />
        </View>

        {/* Input */}
        <Input
          placeholder="Search by Serial # / Name"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="pl-12"
        />
      </View>

      {/* Children List */}
      <View className="pb-10 space-y-5">
        {filteredChildren.map((child) => (
          <View
            key={child.id}
            className="p-5 my-2 border shadow-sm bg-card rounded-2xl border-border"
          >
            <View className="flex-row gap-4">
              {/* Photo */}
              <View className="items-center justify-center w-12 h-12 rounded-full bg-success/10">
                <Text className="text-xl">{child.photo}</Text>
              </View>

              {/* Info */}
              <View className="flex-1">
                <View className="flex-row items-start justify-between mb-2">
                  <View>
                    <Text className="font-semibold text-foreground">{child.name}</Text>
                    <Text className="text-sm text-muted-foreground">{child.serial}</Text>
                  </View>
                  <View className={`w-7 h-7 rounded-full ${getMUACColor(child.muac)}`} />
                </View>

                <View className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <Text className="text-muted-foreground">
                    Age: <Text className="text-foreground">{child.age} years</Text>
                  </Text>
                  <Text className="text-muted-foreground">
                    MUAC: <Text className="text-foreground">{child.muac}mm</Text>
                  </Text>
                  <Text className="text-muted-foreground">
                    Visits: <Text className="text-foreground">{child.visits}/12</Text>
                  </Text>
                  <Text className="text-muted-foreground">
                    Last: <Text className="text-foreground">{child.lastVisit}</Text>
                  </Text>
                </View>

                {/* Ration Stamps */}
                <View className="flex-row flex-wrap gap-2 mb-4">
                  {Array.from({ length: TOTAL_VISITS }).map((_, i) => (
                    <View
                      key={i}
                      className={`w-9 h-9 rounded-lg border items-center justify-center ${
                        i < child.visits
                          ? 'bg-success/10 border-success text-success'
                          : 'bg-muted border-border text-muted-foreground'
                      }`}
                    >
                      <Text className="text-xs font-medium">{i + 1}</Text>
                    </View>
                  ))}
                </View>

                {/* Badges */}
                <View className="flex-row flex-wrap w-full gap-2 mb-4">
                  {child.vaccineStatus === 'up-to-date' && (
                    <Badge variant="secondary" icon={<CheckCircle size={12} />}>
                      Vaccine Up-to-date
                    </Badge>
                  )}
                  {child.vaccineStatus === 'updated-today' && (
                    <Badge variant="default" icon={<CheckCircle size={12} />}>
                      Updated Today
                    </Badge>
                  )}
                  {child.visits >= TOTAL_VISITS - 1 && (
                    <Badge variant="default" icon={<Award size={12} />}>
                      Near Graduation
                    </Badge>
                  )}
                </View>

                {/* Action Buttons */}
                <View className="flex-row flex-wrap w-full gap-3">
                  <Button
                    size="sm"
                    onPress={() => {
                      setSelectedChild(child);
                      setMuacUpdate(child.muac.toString());
                      setShowDistribute(true);
                    }}
                  >
                    Distribute
                  </Button>
                  {child.visits >= TOTAL_VISITS - 1 && (
                    <Button size="sm" variant="outline">
                      Graduate
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Refer SAM/MAM
                  </Button>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      <Dialog open={showDistribute} onOpenChange={setShowDistribute}>
        {/* This View is the actual card */}
        <View>
          {/* Close button MUST be first child and absolute */}
          <DialogClose onPress={() => setShowDistribute(false)} />

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Distribution</DialogTitle>
            </DialogHeader>

            {selectedChild && (
              <ScrollView className="max-h-[70vh]">
                <View className="space-y-5">
                  {/* Child Info */}
                  <View className="p-4 bg-success/10 rounded-xl">
                    <View className="flex-row items-center gap-3 mb-3">
                      <View className="text-4xl">{selectedChild.photo}</View>
                      <View>
                        <Text className="text-lg font-semibold">{selectedChild.name}</Text>
                        <Text className="text-sm text-muted-foreground">
                          {selectedChild.serial}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-sm">
                      Visit:{' '}
                      <Text className="font-bold text-success">
                        {selectedChild.visits + 1} of {TOTAL_VISITS}
                      </Text>
                    </Text>
                  </View>

                  {/* MUAC Update */}
                  <View className="mt-2">
                    <Text className="mb-2 text-sm font-medium">MUAC Update (mm)</Text>
                    <View className="flex-row items-center gap-3">
                      <Input
                        keyboardType="numeric"
                        value={muacUpdate}
                        onChangeText={setMuacUpdate}
                        placeholder="e.g. 118"
                      />
                      {muacUpdate && (
                        <View
                          className={`w-10 h-10 rounded-full ${getMUACColor(parseInt(muacUpdate) || 0)}`}
                        />
                      )}
                    </View>
                  </View>

                  {/* Sachets */}
                  <View>
                    <Text className="mb-2 text-sm font-medium">Sachets to Issue</Text>
                    <Input keyboardType="numeric" value={sachets} onChangeText={setSachets} />
                    <Text className="mt-1 text-xs text-muted-foreground">
                      Standard: {SACHETS.STANDARD} sachets | Access issues: {SACHETS.ACCESS_ISSUES}{' '}
                      sachets
                    </Text>
                  </View>

                  {/* Empty Sachets */}
                  <View>
                    <Text className="mb-2 text-sm font-medium">Empty Sachets Returned</Text>
                    <Input
                      keyboardType="numeric"
                      value={emptySachets}
                      onChangeText={setEmptySachets}
                      placeholder="Count returned"
                    />
                  </View>

                  {/* Vaccine Checkbox */}
                  <TouchableOpacity
                    onPress={() => setVaccineUpdated(!vaccineUpdated)}
                    className="flex-row items-center gap-3 mt-4"
                  >
                    <View
                      className={`w-6 h-6 rounded border-2 ${vaccineUpdated ? 'bg-success border-success' : 'border-gray-400'}`}
                    >
                      {vaccineUpdated && (
                        <CheckCircle size={16} color="white" className="self-center" />
                      )}
                    </View>
                    <Text>Vaccine updated today</Text>
                  </TouchableOpacity>

                  {/* Counseling Reminder */}
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
              <Button variant="outline" onPress={() => setShowDistribute(false)}>
                Cancel
              </Button>
              <Button onPress={handleDistribute}>Confirm & Stamp</Button>
            </DialogFooter>
          </DialogContent>
        </View>
      </Dialog>
    </ScrollView>
  );
}
