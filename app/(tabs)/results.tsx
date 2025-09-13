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
import { useStorageContext } from '@/hooks/StorageProvider';
import { useGlobalUpdate } from '@/hooks/useGlobalUpdate';
import { calculateHeatLoad } from '@/utils/calculations';
import { generateAndSharePDF, PDFData } from '@/utils/pdfGenerator';

export default function ColdRoomResultsTab() {
  const { roomData, productData, miscData } = useStorageContext();

  // Subscribe to global updates for real-time calculation
  useGlobalUpdate();

  const results = calculateHeatLoad(roomData, productData, miscData);

  const handleSharePDF = async () => {
    const pdfData: PDFData = {
      title: 'Cold Room Heat Load Summary',
      subtitle: 'Key calculation results for cold room refrigeration system',
      sections: [
        {
          title: 'Final Results (Excel Matching)',
          items: [
            { label: 'Load in kJ/24Hr', value: results.totalLoadKJ.toFixed(0), unit: 'kJ/24Hr', isHighlighted: true },
            { label: 'Load in kW', value: results.totalLoadKw.toFixed(2), unit: 'kW', isHighlighted: true },
            { label: 'Refrigeration Capacity', value: results.refrigerationCapacityTR.toFixed(2), unit: 'TR', isHighlighted: true },
            { label: 'Capacity Including Safety', value: results.capacityIncludingSafety.toFixed(2), unit: 'TR', isHighlighted: true },
          ]
        },
        {
          title: 'Transmission Loads (kJ/24Hr)',
          items: [
            { label: 'Wall Load', value: results.wallLoad.toFixed(0), unit: 'kJ/24Hr' },
            { label: 'Ceiling Load', value: results.ceilingLoad.toFixed(0), unit: 'kJ/24Hr' },
            { label: 'Floor Load', value: results.floorLoad.toFixed(0), unit: 'kJ/24Hr' },
            { label: 'Total Transmission', value: results.totalTransmissionLoad.toFixed(0), unit: 'kJ/24Hr' },
          ]
        },
        {
          title: 'Product & Other Loads (kJ/24Hr)',
          items: [
            { label: 'Product Load', value: results.productLoad.toFixed(0), unit: 'kJ/24Hr' },
            { label: 'Respiration Load', value: results.respirationLoad.toFixed(0), unit: 'kJ/24Hr' },
            { label: 'Air Change Load', value: results.airChangeLoad.toFixed(0), unit: 'kJ/24Hr' },
            { label: 'Equipment Load', value: results.equipmentLoad.toFixed(0), unit: 'kJ/24Hr' },
            { label: 'Occupancy Load', value: results.occupancyLoad.toFixed(0), unit: 'kJ/24Hr' },
            { label: 'Light Load', value: results.lightLoad.toFixed(0), unit: 'kJ/24Hr' },
            { label: 'Door Heater Load', value: results.doorHeaterLoad.toFixed(0), unit: 'kJ/24Hr' },
          ]
        },
        {
          title: 'Individual TR Values (Excel Matching)',
          items: [
            { label: 'Wall Load TR', value: results.wallLoadTR.toFixed(2), unit: 'TR' },
            { label: 'Ceiling Load TR', value: results.ceilingLoadTR.toFixed(2), unit: 'TR' },
            { label: 'Floor Load TR', value: results.floorLoadTR.toFixed(2), unit: 'TR' },
            { label: 'Product Load TR', value: results.productLoadTR.toFixed(2), unit: 'TR' },
            { label: 'Respiration Load TR', value: results.respirationLoadTR.toFixed(2), unit: 'TR' },
            { label: 'Air Change Load TR', value: results.airChangeLoadTR.toFixed(2), unit: 'TR' },
            { label: 'Equipment Load TR', value: results.equipmentLoadTR.toFixed(2), unit: 'TR' },
            { label: 'Occupancy Load TR', value: results.occupancyLoadTR.toFixed(2), unit: 'TR' },
            { label: 'Light Load TR', value: results.lightLoadTR.toFixed(2), unit: 'TR' },
            { label: 'Door Heater Load TR', value: results.doorHeaterLoadTR.toFixed(2), unit: 'TR' },
            { label: 'Total Load TR', value: results.totalLoadTR.toFixed(2), unit: 'TR', isHighlighted: true },
          ]
        },
        {
          title: 'Heat Distribution (Excel Matching)',
          items: [
            { label: 'Sensible Heat', value: results.sensibleHeat.toFixed(0), unit: 'kJ/24Hr' },
            { label: 'Latent Heat', value: results.latentHeat.toFixed(0), unit: 'kJ/24Hr' },
            { label: 'Sensible Heat Ratio', value: results.sensibleHeatRatio.toFixed(3), unit: '' },
            { label: 'Air Qty Required', value: results.airQtyRequired.toFixed(0), unit: 'cfm' },
          ]
        }
      ]
    };

    await generateAndSharePDF(pdfData);
  };

  const ResultCard = ({ title, value, unit, isHighlighted = false }: {
    title: string;
    value: number | undefined;
    unit: string;
    isHighlighted?: boolean;
  }) => (
    <View style={[styles.resultCard, isHighlighted && styles.highlightedCard]}>
      <Text style={[styles.resultLabel, isHighlighted && styles.highlightedLabel]}>{title}</Text>
      <Text style={[styles.resultValue, isHighlighted && styles.highlightedValue]}>
        {value !== undefined ? value.toFixed(1) : '0.0'} <Text style={styles.resultUnit}>{unit}</Text>
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
            <Text style={styles.title}>Final Results</Text>
            <Text style={styles.subtitle}>Cold room heat load calculation results</Text>

            {/* PDF Export Button */}
            <TouchableOpacity style={styles.pdfButton} onPress={handleSharePDF}>
              <Ionicons name="document-text-outline" size={20} color="#ffffff" />
              <Text style={styles.pdfButtonText}>Share as PDF</Text>
            </TouchableOpacity>
          </View>

          {/* Final Results - Highlighted */}
          <SectionCard title="Final Results (Excel Matching)">
            <ResultCard
              title="Load in kJ/24Hr"
              value={results.totalLoadKJ}
              unit="kJ/24Hr"
              isHighlighted={true}
            />
            <ResultCard
              title="Load in kW"
              value={results.totalLoadKw}
              unit="kW"
              isHighlighted={true}
            />
            <ResultCard
              title="Refrigeration Capacity"
              value={results.refrigerationCapacityTR}
              unit="TR"
              isHighlighted={true}
            />
            <ResultCard
              title="Capacity Including Safety"
              value={results.capacityIncludingSafety}
              unit="TR"
              isHighlighted={true}
            />
          </SectionCard>

          {/* Transmission Loads */}
          <SectionCard title="Transmission Loads (kJ/24Hr)">
            <ResultCard title="Wall Load" value={results.wallLoad} unit="kJ/24Hr" />
            <ResultCard title="Ceiling Load" value={results.ceilingLoad} unit="kJ/24Hr" />
            <ResultCard title="Floor Load" value={results.floorLoad} unit="kJ/24Hr" />
            <ResultCard
              title="Total Transmission Load"
              value={results.totalTransmissionLoad}
              unit="kJ/24Hr"
            />
          </SectionCard>

          {/* Product Loads */}
          <SectionCard title="Product Loads (kJ/24Hr)">
            <ResultCard title="Product Load" value={results.productLoad} unit="kJ/24Hr" />
            <ResultCard title="Respiration Load" value={results.respirationLoad} unit="kJ/24Hr" />
          </SectionCard>

          {/* Other Loads */}
          <SectionCard title="Other Loads (kJ/24Hr)">
            <ResultCard title="Air Change Load" value={results.airChangeLoad} unit="kJ/24Hr" />
            <ResultCard title="Equipment Load" value={results.equipmentLoad} unit="kJ/24Hr" />
            <ResultCard title="Lighting Load" value={results.lightLoad} unit="kJ/24Hr" />
            <ResultCard title="Door Heater Load" value={results.doorHeaterLoad} unit="kJ/24Hr" />
            <ResultCard title="Occupancy Load" value={results.occupancyLoad} unit="kJ/24Hr" />
            <ResultCard
              title="Total Miscellaneous Load"
              value={results.totalMiscLoad}
              unit="kJ/24Hr"
            />
          </SectionCard>

          {/* Heat Distribution */}
          <SectionCard title="Heat Distribution (Excel Matching)">
            <ResultCard title="Sensible Heat" value={results.sensibleHeat} unit="kJ/24Hr" />
            <ResultCard title="Latent Heat" value={results.latentHeat} unit="kJ/24Hr" />
            <ResultCard title="Sensible Heat Ratio" value={results.sensibleHeatRatio} unit="" />
            <ResultCard title="Air Quantity Required" value={results.airQtyRequired} unit="cfm" />
          </SectionCard>

          {/* Individual TR Values */}
          <SectionCard title="Individual TR Values (Excel Matching)">
            <ResultCard title="Wall Load TR" value={results.wallLoadTR} unit="TR" />
            <ResultCard title="Ceiling Load TR" value={results.ceilingLoadTR} unit="TR" />
            <ResultCard title="Floor Load TR" value={results.floorLoadTR} unit="TR" />
            <ResultCard title="Product Load TR" value={results.productLoadTR} unit="TR" />
            <ResultCard title="Respiration Load TR" value={results.respirationLoadTR} unit="TR" />
            <ResultCard title="Air Change Load TR" value={results.airChangeLoadTR} unit="TR" />
            <ResultCard title="Equipment Load TR" value={results.equipmentLoadTR} unit="TR" />
            <ResultCard title="Occupancy Load TR" value={results.occupancyLoadTR} unit="TR" />
            <ResultCard title="Light Load TR" value={results.lightLoadTR} unit="TR" />
            <ResultCard title="Door Heater Load TR" value={results.doorHeaterLoadTR} unit="TR" />
            <ResultCard 
              title="Total Load TR" 
              value={results.totalLoadTR} 
              unit="TR" 
              isHighlighted={true} 
            />
          </SectionCard>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by Enzo</Text>
            <Text style={styles.footerSubtext}>
              Professional cold room heat load calculations following ASHRAE standards
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
    color: '#1e293b',
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
    color: '#1e293b',
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
    backgroundColor: '#f0fdf4',
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
    color: '#1e293b',
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
    color: '#1e293b',
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