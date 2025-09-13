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
import { FreezerProductPicker } from '@/components/FreezerProductPicker';
import { useFreezerStorageContext } from '@/hooks/FreezerStorageProvider';
import { freezerProducts } from '@/data/freezerProducts';

export default function FreezerProductTab() {
  const { productData, saveProductData, miscData, saveMiscData } = useFreezerStorageContext();

  const handleValueChange = (field: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    if (field === 'productIncoming' || field === 'productOutgoing' || field === 'dailyLoading') {
      saveMiscData({
        ...miscData,
        [field]: numericValue,
      });
    } else {
      saveProductData({
        ...productData,
        [field]: numericValue,
        overridePreset: field !== 'massBeforeFreezing' && field !== 'respirationMass',
      });
    }
  };

  const handleUnitChange = (field: string, unit: string) => {
    saveProductData({
      ...productData,
      [field]: unit,
    });
  };

  const handleProductSelect = (productName: string) => {
    const selectedProduct = freezerProducts.find(p => p.name === productName);
    if (selectedProduct) {
      saveProductData({
        ...productData,
        productName,
        cpAboveFreezing: selectedProduct.cpAboveFreezing,
        cpBelowFreezing: selectedProduct.cpBelowFreezing,
        latentHeatOfFusion: selectedProduct.latentHeatOfFusion,
        freezingPoint: selectedProduct.freezingPoint,
        watts: selectedProduct.respirationWatts,
        overridePreset: false,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Product Information</Text>
            <Text style={styles.subtitle}>Enter details about the product to be frozen</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Selection</Text>
            <FreezerProductPicker
              selected={productData.productName || 'Custom'}
              onSelect={handleProductSelect}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Temperature Settings</Text>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Product Entering Temperature"
                  value={miscData.productIncoming.toString()}
                  onChangeText={(value) => handleValueChange('productIncoming', value)}
                  keyboardType="decimal-pad"
                  placeholder="25"
                />
              </View>
              <View style={styles.unitContainer}>
                <Text style={styles.unitText}>°{miscData.tempUnit}</Text>
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Product Final Temperature"
                  value={miscData.productOutgoing.toString()}
                  onChangeText={(value) => handleValueChange('productOutgoing', value)}
                  keyboardType="decimal-pad"
                  placeholder="-15"
                />
              </View>
              <View style={styles.unitContainer}>
                <Text style={styles.unitText}>°{miscData.tempUnit}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Weight & Loading</Text>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Daily Loading"
                  value={miscData.dailyLoading?.toString() || ''}
                  onChangeText={(value) => handleValueChange('dailyLoading', value)}
                  keyboardType="decimal-pad"
                  placeholder="3000"
                />
              </View>
              <View style={styles.unitContainer}>
                <Text style={styles.unitText}>kg/Day</Text>
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Weight Before Freezing"
                  value={productData.massBeforeFreezing.toString()}
                  onChangeText={(value) => handleValueChange('massBeforeFreezing', value)}
                  keyboardType="decimal-pad"
                  placeholder="3000"
                />
              </View>
              <View style={styles.unitContainer}>
                <UnitPicker
                  selectedUnit={productData.massUnit}
                  onUnitChange={(unit) => handleUnitChange('massUnit', unit)}
                  units={['kg', 'lbs']}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Weight for Respiration"
                  value={productData.respirationMass.toString()}
                  onChangeText={(value) => handleValueChange('respirationMass', value)}
                  keyboardType="decimal-pad"
                  placeholder="3000"
                />
              </View>
              <View style={styles.unitContainer}>
                <Text style={styles.unitText}>{productData.massUnit}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thermal Properties</Text>

            <InputField
              label="Cp Above Freezing"
              value={productData.cpAboveFreezing.toString()}
              onChangeText={(value) => handleValueChange('cpAboveFreezing', value)}
              keyboardType="decimal-pad"
              placeholder="3.74"
              unit="kJ/kg·K"
              editable={productData.overridePreset || productData.productName === 'Custom'}
            />

            <InputField
              label="Cp Below Freezing"
              value={productData.cpBelowFreezing.toString()}
              onChangeText={(value) => handleValueChange('cpBelowFreezing', value)}
              keyboardType="decimal-pad"
              placeholder="1.96"
              unit="kJ/kg·K"
              editable={productData.overridePreset || productData.productName === 'Custom'}
            />

            <InputField
              label="Latent Heat of Fusion"
              value={productData.latentHeatOfFusion.toString()}
              onChangeText={(value) => handleValueChange('latentHeatOfFusion', value)}
              keyboardType="decimal-pad"
              placeholder="233"
              unit="kJ/kg"
              editable={productData.overridePreset || productData.productName === 'Custom'}
            />

            <InputField
              label="Freezing Point"
              value={productData.freezingPoint.toString()}
              onChangeText={(value) => handleValueChange('freezingPoint', value)}
              keyboardType="decimal-pad"
              placeholder="-0.8"
              unit="°C"
              editable={productData.overridePreset || productData.productName === 'Custom'}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Process Parameters</Text>

            <InputField
              label="Pull Down Hours (per phase)"
              value={productData.pullDownHours.toString()}
              onChangeText={(value) => handleValueChange('pullDownHours', value)}
              keyboardType="decimal-pad"
              placeholder="10"
              unit="hrs"
            />

            <InputField
              label="Respiration Heat"
              value={productData.watts.toString()}
              onChangeText={(value) => handleValueChange('watts', value)}
              keyboardType="decimal-pad"
              placeholder="0"
              unit="W/tonne"
              editable={productData.overridePreset || productData.productName === 'Custom'}
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
