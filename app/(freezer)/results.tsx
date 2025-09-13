import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFreezerStorageContext } from '@/hooks/FreezerStorageProvider';
import { useGlobalUpdate } from '@/hooks/useGlobalUpdate';
import { calculateFreezerHeatLoad } from '@/utils/calculations';
import { generateAndSharePDF, PDFData } from '@/utils/pdfGenerator';

export default function FreezerResultsTab() {
  const { roomData, productData, miscData } = useFreezerStorageContext();

  // Subscribe to global updates for real-time calculation
  useGlobalUpdate();

  const results = calculateFreezerHeatLoad(roomData, productData, miscData);

  const handleSharePDF = async () => {
    const pdfData: PDFData = {
      title: 'Freezer Room Heat Load Summary',
      subtitle: 'Key calculation results for freezer room refrigeration system',
      sections: [
        {
          title: 'Main Results',
          items: [
            { label: 'Total Load (without safety factor)', value: results.loadInKw.toFixed(1), unit: 'kW', isHighlighted: true },
            { label: 'Total Load (with 5% safety factor)', value: (results.loadInKw * 1.05).toFixed(1), unit: 'kW', isHighlighted: true },
            { label: 'Refrigeration Capacity (TR)', value: results.totalLoadTR.toFixed(2), unit: 'TR' },
            { label: 'Refrigeration Capacity (with 5% safety factor)', value: results.capacityTR.toFixed(2), unit: 'TR' },
          ]
        },
        {
          title: 'Transmission Loads',
          items: [
            { label: 'Total Transmission', value: results.totalTransmissionLoad.toFixed(1), unit: 'kW' },
            { label: 'Wall Load', value: results.wallLoad.toFixed(1), unit: 'kW' },
            { label: 'Ceiling Load', value: results.ceilingLoad.toFixed(1), unit: 'kW' },
            { label: 'Floor Load', value: results.floorLoad.toFixed(1), unit: 'kW' },
          ]
        },
        {
          title: 'Product Loads (Freezing Process)',
          items: [
            { label: 'Before Freezing Load', value: results.beforeFreezingLoad.toFixed(1), unit: 'kW' },
            { label: 'Latent Heat Load', value: results.latentHeatLoad.toFixed(1), unit: 'kW' },
            { label: 'After Freezing Load', value: results.afterFreezingLoad.toFixed(1), unit: 'kW' },
            { label: 'Total Product Load', value: results.totalProductLoad.toFixed(1), unit: 'kW' },
          ]
        },
        {
          title: 'Other Loads',
          items: [
            { label: 'Respiration Load', value: results.respirationLoad.toFixed(1), unit: 'kW' },
            { label: 'Air Change Load', value: results.airChangeLoad.toFixed(1), unit: 'kW' },
            { label: 'Equipment Load', value: results.equipmentLoad.toFixed(1), unit: 'kW' },
            { label: 'Lighting Load', value: results.lightLoad.toFixed(1), unit: 'kW' },
            { label: 'Heater Load', value: results.heaterLoad.toFixed(1), unit: 'kW' },
            { label: 'Total Misc Load', value: results.totalMiscLoad.toFixed(1), unit: 'kW' },
          ]
        }
      ]
    };

    await generateAndSharePDF(pdfData);
  };

  const ResultCard = ({ title, value, unit, isHighlighted = false }: {
    title: string;
    value: number;
    unit: string;
    isHighlighted?: boolean;
  }) => (
    <View style={[styles.resultCard, isHighlighted && styles.highlightedCard]}>
      <Text style={[styles.resultLabel, isHighlighted && styles.highlightedLabel]}>{title}</Text>
      <Text style={[styles.resultValue, isHighlighted && styles.highlightedValue]}>
        {value.toFixed(1)} <Text style={styles.resultUnit}>{unit}</Text>
      </Text>
    </View>
  );

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Freezer Results</Text>
            <Text style={styles.subtitle}>Heat load calculations with main results in kW</Text>

            {/* PDF Export Button */}
            <TouchableOpacity style={styles.pdfButton} onPress={handleSharePDF}>
              <Ionicons name="document-text-outline" size={20} color="#ffffff" />
              <Text style={styles.pdfButtonText}>Share as PDF</Text>
            </TouchableOpacity>
          </View>

          {/* Final Results - Highlighted in kW */}
          <SectionCard title="Main Results">
            <ResultCard
              title="Total Load (without safety factor)"
              value={results.loadInKw}
              unit="kW"
              isHighlighted={true}
            />
            <ResultCard
              title="Total Load (with 5% safety factor)"
              value={results.loadInKw * 1.05}
              unit="kW"
              isHighlighted={true}
            />
            <ResultCard
              title="Refrigeration Capacity (TR)"
              value={results.totalLoadTR}
              unit="TR"
            />
            <ResultCard
              title="Refrigeration Capacity (with 5% safety factor)"
              value={results.capacityTR}
              unit="TR"
            />
          </SectionCard>

          {/* Transmission Loads */}
          <SectionCard title="Transmission Loads">
            <ResultCard title="Wall Load" value={results.wallLoad} unit="kW" />
            <ResultCard title="Ceiling Load" value={results.ceilingLoad} unit="kW" />
            <ResultCard title="Floor Load" value={results.floorLoad} unit="kW" />
            <ResultCard
              title="Total Transmission Load"
              value={results.totalTransmissionLoad}
              unit="kW"
            />
          </SectionCard>

          {/* Product Loads - Freezer Specific */}
          <SectionCard title="Product Loads (Freezing Process)">
            <ResultCard
              title="Before Freezing Load"
              value={results.beforeFreezingLoad}
              unit="kW"
            />
            <ResultCard
              title="Latent Heat Load (Freezing)"
              value={results.latentHeatLoad}
              unit="kW"
            />
            <ResultCard
              title="After Freezing Load"
              value={results.afterFreezingLoad}
              unit="kW"
            />
            <ResultCard
              title="Total Product Load"
              value={results.totalProductLoad}
              unit="kW"
            />
          </SectionCard>

          {/* Other Loads */}
          <SectionCard title="Other Loads">
            <ResultCard title="Respiration Load" value={results.respirationLoad} unit="kW" />
            <ResultCard title="Air Change Load" value={results.airChangeLoad} unit="kW" />
            <ResultCard title="Equipment Load" value={results.equipmentLoad} unit="kW" />
            <ResultCard title="Lighting Load" value={results.lightLoad} unit="kW" />
            <ResultCard title="Heater Load" value={results.heaterLoad} unit="kW" />
            <ResultCard title="Occupancy Load" value={results.occupancyLoad} unit="kW" />
            <ResultCard
              title="Total Miscellaneous Load"
              value={results.totalMiscLoad}
              unit="kW"
            />
          </SectionCard>

          {/* Heat Distribution */}
          <SectionCard title="Heat Distribution">
            <ResultCard title="Sensible Heat" value={results.sensibleHeat / 1000} unit="kW" />
            <ResultCard title="Latent Heat" value={results.latentHeat / 1000} unit="kW" />
            <ResultCard title="Air Quantity Required" value={results.airQtyRequired} unit="CFM" />
          </SectionCard>

          {/* Temperature Differences */}
          <SectionCard title="Temperature Differences">
            <ResultCard title="Wall/Ceiling/Floor ΔT" value={results.wallTempDiff} unit="°C" />
            <ResultCard title="Product ΔT" value={results.productTempDiff} unit="°C" />
          </SectionCard>

          {/* System Parameters */}
          <SectionCard title="System Parameters">
            <ResultCard title="Daily Loading" value={results.dailyLoading || 0} unit="kg/day" />
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Insulation Type</Text>
              <Text style={styles.resultValue}>{roomData.insulationType || 'PUF'}</Text>
            </View>
            <ResultCard
              title="Wall Insulation Thickness"
              value={roomData.wallInsulationThickness || 0}
              unit="mm"
            />
          </SectionCard>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by Enzo</Text>
            <Text style={styles.footerSubtext}>
              Professional freezer heat load calculations following ASHRAE standards
            </Text>
          </View>
        </View>
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
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  pdfButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  pdfButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 12,
  },
  resultCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  highlightedCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderBottomWidth: 0,
  },
  resultLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  highlightedLabel: {
    fontWeight: '600',
    color: '#1e40af',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  highlightedValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563eb',
  },
  resultUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: '#2563eb',
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#1e40af',
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
