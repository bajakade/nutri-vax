import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { CheckCircle, Award, Search } from "lucide-react-native";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockChildren = [
  { id: "001", name: "Fatima Ibrahim", serial: "NV-001234", photo: "👧", age: 18, muac: 120, visits: 8, lastVisit: "2025-11-09", vaccineStatus: "up-to-date" },
  { id: "002", name: "Muhammad Sani", serial: "NV-001235", photo: "👦", age: 11, muac: 118, visits: 5, lastVisit: "2025-11-08", vaccineStatus: "up-to-date" },
  { id: "003", name: "Aisha Musa", serial: "NV-001236", photo: "👧", age: 22, muac: 122, visits: 11, lastVisit: "2025-11-10", vaccineStatus: "updated-today" },
];

export default function Attendance() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [showDistribute, setShowDistribute] = useState(false);
  const [muacUpdate, setMuacUpdate] = useState("");
  const [sachets, setSachets] = useState("28");
  const [vaccineUpdated, setVaccineUpdated] = useState(false);

  const getMUACColor = (muac: number) => {
    if (muac >= 125) return "bg-green-500";
    if (muac >= 115) return "bg-yellow-500";
    return "bg-red-500";
  };

  const filteredChildren = mockChildren.filter(
    (child) =>
      child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.serial.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDistribute = () => {
    setShowDistribute(false);
    setSelectedChild(null);
    setMuacUpdate("");
    setSachets("28");
    setVaccineUpdated(false);
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900 p-4">
      {/* Header */}
      <Text className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
        Attendance & Distribution
      </Text>
      <Text className="text-gray-500 dark:text-gray-300 mb-4">
        Record daily SQ-LNS distribution
      </Text>

      {/* Search */}
      <View className="relative mb-4">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <TextInput
          placeholder="Search by Serial # / Name"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="pl-10 border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
        />
      </View>

      {/* Children List */}
      {filteredChildren.map((child) => (
        <TouchableOpacity
          key={child.id}
          onPress={() => {
            setSelectedChild(child);
            setShowDistribute(true);
            setMuacUpdate(child.muac.toString());
          }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow"
        >
          <View className="flex-row items-center gap-3">
            <Text className="text-3xl">{child.photo}</Text>
            <View className="flex-1">
              <Text className="text-lg font-medium text-gray-900 dark:text-white">{child.name}</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-300">{child.serial}</Text>
            </View>
            <View className={`w-6 h-6 rounded-full ${getMUACColor(child.muac)}`} />
          </View>

          <View className="flex-row flex-wrap mt-2 gap-2">
            <Text className="text-sm text-gray-500">Age: {child.age}m</Text>
            <Text className="text-sm text-gray-500">MUAC: {child.muac}mm</Text>
            <Text className="text-sm text-gray-500">Visits: {child.visits}/12</Text>
            <Text className="text-sm text-gray-500">Last: {child.lastVisit}</Text>
          </View>

          <View className="flex-row mt-2 flex-wrap gap-2">
            {child.vaccineStatus === "up-to-date" && (
              <Badge variant="secondary" className="flex-row items-center gap-1 bg-green-100 text-green-700">
                <CheckCircle className="w-4 h-4" />
                Vaccine Up-to-date
              </Badge>
            )}
            {child.vaccineStatus === "updated-today" && (
              <Badge variant="secondary" className="flex-row items-center gap-1 bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4" />
                Updated Today
              </Badge>
            )}
            {child.visits >= 11 && (
              <Badge variant="secondary" className="flex-row items-center gap-1 bg-purple-100 text-purple-700">
                <Award className="w-4 h-4" />
                Near Graduation
              </Badge>
            )}
          </View>
        </TouchableOpacity>
      ))}

      {/* Distribution Modal */}
      <Modal visible={showDistribute} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white dark:bg-gray-800 p-4 rounded-t-xl">
            {selectedChild && (
              <>
                <View className="flex-row items-center gap-3 mb-2">
                  <Text className="text-3xl">{selectedChild.photo}</Text>
                  <View>
                    <Text className="font-medium text-gray-900 dark:text-white">{selectedChild.name}</Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-300">{selectedChild.serial}</Text>
                  </View>
                </View>

                {/* MUAC Update */}
                <Text className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                  MUAC Update (mm)
                </Text>
                <TextInput
                  value={muacUpdate}
                  onChangeText={setMuacUpdate}
                  keyboardType="numeric"
                  placeholder="Enter MUAC"
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded mb-2 text-gray-900 dark:text-white"
                />

                {/* Sachets */}
                <Text className="font-medium text-gray-700 dark:text-gray-300 mb-1">Sachets to Issue</Text>
                <TextInput
                  value={sachets}
                  onChangeText={setSachets}
                  keyboardType="numeric"
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded mb-2 text-gray-900 dark:text-white"
                />

                {/* Vaccine */}
                <View className="flex-row items-center mb-2">
                  <TouchableOpacity
                    onPress={() => setVaccineUpdated(!vaccineUpdated)}
                    className="mr-2"
                  >
                    <View className={`w-5 h-5 border rounded ${vaccineUpdated ? "bg-green-600" : "bg-white dark:bg-gray-700"}`} />
                  </TouchableOpacity>
                  <Text className="text-gray-700 dark:text-gray-300">Vaccine updated today</Text>
                </View>

                <View className="flex-row justify-end gap-2 mt-4">
                  <Button onPress={() => setShowDistribute(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button onPress={handleDistribute} variant="default">
                    Confirm & Stamp
                  </Button>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
