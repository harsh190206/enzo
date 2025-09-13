import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { InputField } from '@/components/InputField';
import { UnitPicker } from '@/components/UnitPicker';
import { InsulationTypePicker } from '@/components/InsulationTypePicker';
import { useFreezerStorageContext } from '@/hooks/FreezerStorageProvider';

export default function FreezerRoomDetailsTab() {
  const { roomData, saveRoomData, miscData, saveMiscData } = useFreezerStorageContext();

  const handleValueChange = (field: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    if (field === 'ambientTemp' || field === 'roomTemp') {
      saveMiscData({
        ...miscData,
        [field]: numericValue,
      });
    } else {
      saveRoomData({
        ...roomData,
        [field]: numericValue,
      });
    }
  };

  const handleUnitChange = (field: string, unit: string) => {
    if (field === 'tempUnit') {
      saveMiscData({
        ...miscData,
        [field]: unit as 'C' | 'F',
      });
    } else {
      saveRoomData({
        ...roomData,
        [field]: unit,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Freezer Room Dimensions</Text>
            <Text style={styles.subtitle}>Enter the dimensions of your freezer room</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Room Dimensions</Text>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Length"
                  value={roomData.length.toString()}
                  onChangeText={(value) => handleValueChange('length', value)}
                  keyboardType="decimal-pad"
                  placeholder="0"
                />
              </View>
              <View style={styles.unitContainer}>
                <UnitPicker
                  selectedUnit={roomData.lengthUnit}
                  onUnitChange={(unit) => handleUnitChange('lengthUnit', unit)}
                  units={['m', 'ft']}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Width"
                  value={roomData.width.toString()}
                  onChangeText={(value) => handleValueChange('width', value)}
                  keyboardType="decimal-pad"
                  placeholder="0"
                />
              </View>
              <View style={styles.unitContainer}>
                <Text style={styles.unitText}>{roomData.lengthUnit}</Text>
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Height"
                  value={roomData.height.toString()}
                  onChangeText={(value) => handleValueChange('height', value)}
                  keyboardType="decimal-pad"
                  placeholder="0"
                />
              </View>
              <View style={styles.unitContainer}>
                <Text style={styles.unitText}>{roomData.lengthUnit}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Temperature Settings</Text>
            <Text style={styles.sectionSubtitle}>Operating temperature conditions</Text>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Ambient Temperature"
                  value={miscData.ambientTemp.toString()}
                  onChangeText={(value) => handleValueChange('ambientTemp', value)}
                  keyboardType="decimal-pad"
                  placeholder="45"
                />
              </View>
              <View style={styles.unitContainer}>
                <UnitPicker
                  selectedUnit={miscData.tempUnit}
                  onUnitChange={(unit) => handleUnitChange('tempUnit', unit)}
                  units={['C', 'F']}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Freezer Room Temperature"
                  value={miscData.roomTemp.toString()}
                  onChangeText={(value) => handleValueChange('roomTemp', value)}
                  keyboardType="decimal-pad"
                  placeholder="-25"
                />
              </View>
              <View style={styles.unitContainer}>
                <Text style={styles.unitText}>°{miscData.tempUnit}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Insulation Parameters</Text>
            <Text style={styles.sectionSubtitle}>Thermal insulation specifications</Text>

            <Text style={styles.fieldLabel}>Insulation Type</Text>
            <InsulationTypePicker
              selected={roomData.insulationType}
              onSelect={(type) => handleValueChange('insulationType', type)}
            />

            <InputField
              label="Wall Insulation Thickness"
              value={roomData.wallInsulationThickness.toString()}
              onChangeText={(value) => handleValueChange('wallInsulationThickness', value)}
              keyboardType="decimal-pad"
              placeholder="150"
              unit="mm"
            />

            <InputField
              label="Ceiling Insulation Thickness"
              value={roomData.ceilingInsulationThickness.toString()}
              onChangeText={(value) => handleValueChange('ceilingInsulationThickness', value)}
              keyboardType="decimal-pad"
              placeholder="150"
              unit="mm"
            />

            <InputField
              label="Floor Insulation Thickness"
              value={roomData.floorInsulationThickness.toString()}
              onChangeText={(value) => handleValueChange('floorInsulationThickness', value)}
              keyboardType="decimal-pad"
              placeholder="150"
              unit="mm"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thermal Properties</Text>
            <Text style={styles.sectionSubtitle}>U-factors for heat transmission</Text>

            <InputField
              label="Wall U-Factor"
              value={roomData.wallUFactor.toString()}
              onChangeText={(value) => handleValueChange('wallUFactor', value)}
              keyboardType="decimal-pad"
              placeholder="0.295"
              unit="W/m²·K"
            />

            <InputField
              label="Ceiling U-Factor"
              value={roomData.ceilingUFactor.toString()}
              onChangeText={(value) => handleValueChange('ceilingUFactor', value)}
              keyboardType="decimal-pad"
              placeholder="0.295"
              unit="W/m²·K"
            />

            <InputField
              label="Floor U-Factor"
              value={roomData.floorUFactor.toString()}
              onChangeText={(value) => handleValueChange('floorUFactor', value)}
              keyboardType="decimal-pad"
              placeholder="0.295"
              unit="W/m²·K"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Operating Hours</Text>
            <Text style={styles.sectionSubtitle}>Hours of load for each surface</Text>

            <InputField
              label="Wall Hours"
              value={roomData.wallHours.toString()}
              onChangeText={(value) => handleValueChange('wallHours', value)}
              keyboardType="decimal-pad"
              placeholder="24"
              unit="hrs"
            />

            <InputField
              label="Ceiling Hours"
              value={roomData.ceilingHours.toString()}
              onChangeText={(value) => handleValueChange('ceilingHours', value)}
              keyboardType="decimal-pad"
              placeholder="24"
              unit="hrs"
            />

            <InputField
              label="Floor Hours"
              value={roomData.floorHours.toString()}
              onChangeText={(value) => handleValueChange('floorHours', value)}
              keyboardType="decimal-pad"
              placeholder="24"
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
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
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
