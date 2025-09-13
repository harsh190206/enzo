import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { InputField } from '@/components/InputField';
import { useFreezerStorageContext } from '@/hooks/FreezerStorageProvider';

export default function FreezerMiscellaneousTab() {
  const { miscData, saveMiscData } = useFreezerStorageContext();

  const handleValueChange = (field: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    saveMiscData({
      ...miscData,
      [field]: numericValue,
    });
  };

  const handleUnitChange = (field: string, unit: string) => {
    saveMiscData({
      ...miscData,
      [field]: unit,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Miscellaneous Loads</Text>
            <Text style={styles.subtitle}>Environmental and operational parameters</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Air Change Load</Text>

            <InputField
              label="Air Change Rate"
              value={miscData.airChangeRate.toString()}
              onChangeText={(value) => handleValueChange('airChangeRate', value)}
              keyboardType="decimal-pad"
              placeholder="0.4"
              unit="L/S"
            />

            <InputField
              label="Enthalpy Difference"
              value={miscData.enthalpyDiff.toString()}
              onChangeText={(value) => handleValueChange('enthalpyDiff', value)}
              keyboardType="decimal-pad"
              placeholder="0.1203"
              unit="kJ/L"
            />

            <InputField
              label="Hours of Load"
              value={miscData.hoursOfLoad.toString()}
              onChangeText={(value) => handleValueChange('hoursOfLoad', value)}
              keyboardType="decimal-pad"
              placeholder="16"
              unit="hrs"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Equipment Load</Text>

            <InputField
              label="Equipment Power"
              value={miscData.equipmentPower.toString()}
              onChangeText={(value) => handleValueChange('equipmentPower', value)}
              keyboardType="decimal-pad"
              placeholder="407"
              unit="W"
            />

            <InputField
              label="Equipment Usage Hours"
              value={miscData.equipmentUsageHours.toString()}
              onChangeText={(value) => handleValueChange('equipmentUsageHours', value)}
              keyboardType="decimal-pad"
              placeholder="16"
              unit="hrs"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lighting Load</Text>

            <InputField
              label="Light Power"
              value={miscData.lightPower.toString()}
              onChangeText={(value) => handleValueChange('lightPower', value)}
              keyboardType="decimal-pad"
              placeholder="140"
              unit="W"
            />

            <InputField
              label="Light Usage Hours"
              value={miscData.lightUsageHours.toString()}
              onChangeText={(value) => handleValueChange('lightUsageHours', value)}
              keyboardType="decimal-pad"
              placeholder="16"
              unit="hrs"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Heater Loads</Text>

            <InputField
              label="Peripheral Heaters"
              value={miscData.peripheralHeaters.toString()}
              onChangeText={(value) => handleValueChange('peripheralHeaters', value)}
              keyboardType="decimal-pad"
              placeholder="0"
              unit="W"
            />

            <InputField
              label="Door Heaters"
              value={miscData.doorHeaters.toString()}
              onChangeText={(value) => handleValueChange('doorHeaters', value)}
              keyboardType="decimal-pad"
              placeholder="243"
              unit="W"
            />

            <InputField
              label="Tray Heaters"
              value={miscData.trayHeaters.toString()}
              onChangeText={(value) => handleValueChange('trayHeaters', value)}
              keyboardType="decimal-pad"
              placeholder="0"
              unit="W"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Occupancy Load</Text>

            <InputField
              label="Number of People"
              value={miscData.occupancyCount.toString()}
              onChangeText={(value) => handleValueChange('occupancyCount', value)}
              keyboardType="decimal-pad"
              placeholder="0"
              unit="people"
            />

            <InputField
              label="Heat Equivalent per Person"
              value={miscData.occupancyHeatEquiv.toString()}
              onChangeText={(value) => handleValueChange('occupancyHeatEquiv', value)}
              keyboardType="decimal-pad"
              placeholder="0"
              unit="W"
            />

            <InputField
              label="Occupancy Usage Hours"
              value={miscData.occupancyUsageHours.toString()}
              onChangeText={(value) => handleValueChange('occupancyUsageHours', value)}
              keyboardType="decimal-pad"
              placeholder="0"
              unit="hrs"
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by Enzo</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginRight: 12,
  },
  unitContainer: {
    minWidth: 80,
  },
  unitText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 12,
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
});
