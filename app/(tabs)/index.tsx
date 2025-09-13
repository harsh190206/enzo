import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { InputField } from '@/components/InputField';
import { InsulationTypePicker } from '@/components/InsulationTypePicker';
import { useStorageContext } from '@/hooks/StorageProvider';

export default function RoomDetailsTab() {
  const { roomData, saveRoomData, miscData, saveMiscData } = useStorageContext();

  const updateRoomData = (field: string, value: string | number) => {
    const newData = { ...roomData, [field]: value };
    console.log('🏠 Updating room data:', field, '=', value);
    saveRoomData(newData);
    // Force immediate re-render by changing a different state
    setTimeout(() => {
      console.log('✅ Room data saved');
    }, 0);
  };

  const handleDimensionChange = (field: 'length' | 'width' | 'height', value: string) => {
    const numValue = parseFloat(value) || 0;
    updateRoomData(field, numValue);
  };

  const handleUFactorChange = (field: 'wallUFactor' | 'ceilingUFactor' | 'floorUFactor', value: string) => {
    const numValue = parseFloat(value) || 0;
    updateRoomData(field, numValue);
  };

  const handleHoursChange = (field: 'wallHours' | 'ceilingHours' | 'floorHours', value: string) => {
    const numValue = parseFloat(value) || 0;
    updateRoomData(field, numValue);
  };

  const handleInsulationChange = (field: 'wallInsulationThickness' | 'ceilingInsulationThickness' | 'floorInsulationThickness', value: string) => {
    const numValue = parseFloat(value) || 0;
    updateRoomData(field, numValue);
  };

  const updateMiscData = (field: string, value: string | number) => {
    const newData = { ...miscData, [field]: value };
    saveMiscData(newData);
  };

  const handleTemperatureChange = (field: 'ambientTemp' | 'roomTemp', value: string) => {
    const numValue = parseFloat(value) || 0;
    updateMiscData(field, numValue);
  };

  // Calculate internal volume
  const internalVolume = roomData.length * roomData.width * roomData.height;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Enzo Cool Calc</Text>
          <Text style={styles.subtitle}>Room Details & Transmission Load</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Room Dimensions</Text>

          <InputField
            label="Length"
            value={roomData.length.toString()}
            onChangeText={(value) => handleDimensionChange('length', value)}
            unitOptions={['m', 'ft']}
            selectedUnit={roomData.lengthUnit}
            onUnitChange={(unit) => updateRoomData('lengthUnit', unit as 'm' | 'ft')}
          />

          <InputField
            label="Width"
            value={roomData.width.toString()}
            onChangeText={(value) => handleDimensionChange('width', value)}
            unitOptions={['m', 'ft']}
            selectedUnit={roomData.lengthUnit}
            onUnitChange={(unit) => updateRoomData('lengthUnit', unit as 'm' | 'ft')}
          />

          <InputField
            label="Height"
            value={roomData.height.toString()}
            onChangeText={(value) => handleDimensionChange('height', value)}
            unitOptions={['m', 'ft']}
            selectedUnit={roomData.lengthUnit}
            onUnitChange={(unit) => updateRoomData('lengthUnit', unit as 'm' | 'ft')}
          />

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Internal Volume</Text>
            <Text style={styles.infoValue}>
              {internalVolume.toFixed(2)} {roomData.lengthUnit}³
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temperature Settings</Text>

          <InputField
            label="Ambient Temperature"
            value={miscData.ambientTemp.toString()}
            onChangeText={(value) => handleTemperatureChange('ambientTemp', value)}
            unitOptions={['C', 'F']}
            selectedUnit={miscData.tempUnit}
            onUnitChange={(unit) => updateMiscData('tempUnit', unit as 'C' | 'F')}
          />

          <InputField
            label="Room Temperature"
            value={miscData.roomTemp.toString()}
            onChangeText={(value) => handleTemperatureChange('roomTemp', value)}
            unitOptions={['C', 'F']}
            selectedUnit={miscData.tempUnit}
            onUnitChange={(unit) => updateMiscData('tempUnit', unit as 'C' | 'F')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insulation Parameters</Text>

          <Text style={styles.subsectionTitle}>Insulation Type</Text>
          <InsulationTypePicker
            selected={roomData.insulationType}
            onSelect={(type) => updateRoomData('insulationType', type)}
          />

          <Text style={styles.subsectionTitle}>Insulation Thickness (mm)</Text>
          <InputField
            label="Wall Insulation Thickness"
            value={roomData.wallInsulationThickness.toString()}
            onChangeText={(value) => handleInsulationChange('wallInsulationThickness', value)}
            unit="mm"
          />

          <InputField
            label="Ceiling Insulation Thickness"
            value={roomData.ceilingInsulationThickness.toString()}
            onChangeText={(value) => handleInsulationChange('ceilingInsulationThickness', value)}
            unit="mm"
          />

          <InputField
            label="Floor Insulation Thickness"
            value={roomData.floorInsulationThickness.toString()}
            onChangeText={(value) => handleInsulationChange('floorInsulationThickness', value)}
            unit="mm"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insulation Parameters</Text>

          <InputField
            label="Wall Insulation Thickness"
            value={roomData.wallInsulationThickness.toString()}
            onChangeText={(value) => handleInsulationChange('wallInsulationThickness', value)}
            unit="mm"
          />

          <InputField
            label="Ceiling Insulation Thickness"
            value={roomData.ceilingInsulationThickness.toString()}
            onChangeText={(value) => handleInsulationChange('ceilingInsulationThickness', value)}
            unit="mm"
          />

          <InputField
            label="Floor Insulation Thickness"
            value={roomData.floorInsulationThickness.toString()}
            onChangeText={(value) => handleInsulationChange('floorInsulationThickness', value)}
            unit="mm"
          />

          <InputField
            label="Internal Floor Thickness"
            value={roomData.internalFloorThickness.toString()}
            onChangeText={(value) => handleInsulationChange('internalFloorThickness', value)}
            unit="mm"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transmission Load Parameters</Text>

          <Text style={styles.subsectionTitle}>U-Factors (W/m²·K)</Text>
          <InputField
            label="Wall U-Factor"
            value={roomData.wallUFactor.toString()}
            onChangeText={(value) => handleUFactorChange('wallUFactor', value)}
            unit="W/m²·K"
          />

          <InputField
            label="Ceiling U-Factor"
            value={roomData.ceilingUFactor.toString()}
            onChangeText={(value) => handleUFactorChange('ceilingUFactor', value)}
            unit="W/m²·K"
          />

          <InputField
            label="Floor U-Factor"
            value={roomData.floorUFactor.toString()}
            onChangeText={(value) => handleUFactorChange('floorUFactor', value)}
            unit="W/m²·K"
          />

          <Text style={styles.subsectionTitle}>Hours of Load</Text>
          <InputField
            label="Wall Hours"
            value={roomData.wallHours.toString()}
            onChangeText={(value) => handleHoursChange('wallHours', value)}
            unit="hrs"
          />

          <InputField
            label="Ceiling Hours"
            value={roomData.ceilingHours.toString()}
            onChangeText={(value) => handleHoursChange('ceilingHours', value)}
            unit="hrs"
          />

          <InputField
            label="Floor Hours"
            value={roomData.floorHours.toString()}
            onChangeText={(value) => handleHoursChange('floorHours', value)}
            unit="hrs"
          />
        </View>

        {/* Info note removed for cleaner UI */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#1e40af',
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});