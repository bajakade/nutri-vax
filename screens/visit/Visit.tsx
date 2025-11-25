import { mockChildren } from '@/constants/data';
import { SACHETS } from '@/constants/distribution';
import { ChildCard } from '@/screens/visit/components/ChildCard';
import { DistributionDialog } from '@/screens/visit/components/DistributionDialog';
import { SearchBar } from '@/screens/visit/components/SearchBar';
import { ChildRecord, filterChildrenByQuery } from '@/screens/visit/helpers';
import React, { FC, useMemo, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

const AttendanceScreen: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChild, setSelectedChild] = useState<ChildRecord | null>(null);
  const [showDistribute, setShowDistribute] = useState(false);
  const [muacUpdate, setMuacUpdate] = useState('');
  const [sachets, setSachets] = useState(String(SACHETS.STANDARD));
  const [emptySachets, setEmptySachets] = useState('');
  const [vaccineUpdated, setVaccineUpdated] = useState(false);

  const filteredChildren = useMemo(() => {
    return filterChildrenByQuery(mockChildren, searchQuery);
  }, [searchQuery]);

  const handleDistribute = () => {
    Alert.alert('Success', 'Distribution recorded successfully!');
    setShowDistribute(false);
    setSelectedChild(null);
    setMuacUpdate('');
    setSachets(String(SACHETS.STANDARD));
    setEmptySachets('');
    setVaccineUpdated(false);
  };

  return (
    <ScrollView className="flex-1 px-4 pt-6 bg-background">
      <Text className="mb-1 text-2xl font-bold text-foreground">Attendance & Distribution</Text>
      <Text className="mb-6 text-muted-foreground">Record daily SQ-LNS distribution</Text>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Children List */}
      <View className="pb-10 space-y-5">
        {filteredChildren.map((child) => (
          <ChildCard
            key={child.id}
            child={child}
            onDistribute={(candidate) => {
              setSelectedChild(candidate);
              setMuacUpdate(candidate.muac.toString());
              setShowDistribute(true);
            }}
          />
        ))}
      </View>
      <DistributionDialog
        open={showDistribute}
        onOpenChange={setShowDistribute}
        child={selectedChild}
        muacUpdate={muacUpdate}
        onMuacChange={setMuacUpdate}
        sachets={sachets}
        onSachetsChange={setSachets}
        emptySachets={emptySachets}
        onEmptySachetsChange={setEmptySachets}
        vaccineUpdated={vaccineUpdated}
        onToggleVaccine={() => setVaccineUpdated((prev) => !prev)}
        onSubmit={handleDistribute}
      />
    </ScrollView>
  );
};
export default AttendanceScreen;
