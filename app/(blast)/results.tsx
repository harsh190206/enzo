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
import { useBlastStorageContext } from '@/hooks/BlastStorageProvider';
import { generateAndSharePDF, PDFData } from '@/utils/pdfGenerator';

export default function BlastResultsTab() {
    const { calculateResults } = useBlastStorageContext();
    const results = calculateResults();

    const handleSharePDF = async () => {
        const pdfData: PDFData = {
            title: 'Blast Freezer Heat Load Summary',
            subtitle: 'Key calculation results for blast freezer refrigeration system',
            sections: [
                {
                    title: 'Final Results',
                    items: [
                        { label: 'Refrigeration Capacity', value: results.refrigerationCapacity.toFixed(1), unit: 'TR', isHighlighted: true },
                        { label: 'Total Load', value: results.totalLoadKw.toFixed(1), unit: 'kW', isHighlighted: true },
                        { label: 'Total Load', value: results.totalLoadKJ.toFixed(0), unit: 'kJ/Batch', isHighlighted: true },
                        { label: 'Safety Factor', value: results.capacityIncludingSafety.toFixed(0), unit: '%' },
                    ]
                },
                {
                    title: 'Transmission Loads',
                    items: [
                        { label: 'Total Transmission', value: results.totalTransmissionLoad.toFixed(0), unit: 'kJ' },
                        { label: 'Wall Load', value: results.wallLoad.toFixed(0), unit: 'kJ' },
                        { label: 'Ceiling Load', value: results.ceilingLoad.toFixed(0), unit: 'kJ' },
                    ]
                },
                {
                    title: 'Product Loads',
                    items: [
                        { label: 'Total Product Load', value: results.totalProductLoad.toFixed(0), unit: 'kJ' },
                        { label: 'Before Freezing', value: results.beforeFreezingLoad.toFixed(0), unit: 'kJ' },
                        { label: 'Latent Heat Load', value: results.latentHeatLoad.toFixed(0), unit: 'kJ' },
                    ]
                },
                {
                    title: 'Other Loads',
                    items: [
                        { label: 'Air Change Load', value: results.airChangeLoad.toFixed(1), unit: 'kJ' },
                        { label: 'Total Miscellaneous', value: results.totalMiscLoad.toFixed(1), unit: 'kWh' },
                        { label: 'Equipment Load', value: results.equipmentLoad.toFixed(1), unit: 'kWh' },
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
                        <Text style={styles.title}>Final Results</Text>
                        <Text style={styles.subtitle}>Blast freezer heat load calculation results</Text>

                        {/* PDF Export Button */}
                        <TouchableOpacity style={styles.pdfButton} onPress={handleSharePDF}>
                            <Ionicons name="document-text-outline" size={20} color="#ffffff" />
                            <Text style={styles.pdfButtonText}>Share as PDF</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Final Results - Highlighted */}
                    <SectionCard title="Final Results">
                        <ResultCard
                            title="Refrigeration Capacity (with Safety)"
                            value={results.refrigerationCapacity}
                            unit="TR"
                            isHighlighted={true}
                        />
                        <ResultCard
                            title="Total Load"
                            value={results.totalLoadKw}
                            unit="kW"
                            isHighlighted={true}
                        />
                        <ResultCard
                            title="Total Load"
                            value={results.totalLoadKJ}
                            unit="kJ/Batch"
                            isHighlighted={true}
                        />
                        <ResultCard
                            title="Base Load (without safety)"
                            value={results.totalLoadTR}
                            unit="TR"
                        />
                        <ResultCard
                            title="Safety Factor Applied"
                            value={results.capacityIncludingSafety}
                            unit="%"
                        />
                    </SectionCard>

                    {/* Transmission Loads */}
                    <SectionCard title="Transmission Loads">
                        <ResultCard title="Wall Load" value={results.wallLoad} unit="kJ" />
                        <ResultCard title="Ceiling Load" value={results.ceilingLoad} unit="kJ" />
                        <ResultCard title="Floor Load" value={results.floorLoad} unit="kJ" />
                        <ResultCard
                            title="Total Transmission Load"
                            value={results.totalTransmissionLoad}
                            unit="kJ"
                        />
                    </SectionCard>

                    {/* Product Loads */}
                    <SectionCard title="Product Loads">
                        <ResultCard
                            title="Before Freezing Load"
                            value={results.beforeFreezingLoad}
                            unit="kJ"
                        />
                        <ResultCard
                            title="Latent Heat Load"
                            value={results.latentHeatLoad}
                            unit="kJ"
                        />
                        <ResultCard
                            title="After Freezing Load"
                            value={results.afterFreezingLoad}
                            unit="kJ"
                        />
                        <ResultCard
                            title="Total Product Load"
                            value={results.totalProductLoad}
                            unit="kJ"
                        />
                    </SectionCard>

                    {/* Air Change Load */}
                    <SectionCard title="Air Change Load">
                        <ResultCard
                            title="Air Change Load"
                            value={results.airChangeLoad}
                            unit="kJ"
                        />
                    </SectionCard>

                    {/* Miscellaneous Loads */}
                    <SectionCard title="Miscellaneous Loads">
                        <ResultCard title="Equipment Load" value={results.equipmentLoad} unit="kJ" />
                        <ResultCard title="Occupancy Load" value={results.occupancyLoad} unit="kJ" />
                        <ResultCard title="Light Load" value={results.lightLoad} unit="kJ" />
                        <ResultCard title="Peripheral Heater Load" value={results.peripheralHeaterLoad} unit="kJ" />
                        <ResultCard title="Door Heater Load" value={results.doorHeaterLoad} unit="kJ" />
                        <ResultCard title="Tray Heater Load" value={results.trayHeaterLoad} unit="kJ" />
                        <ResultCard title="Drain Heater Load" value={results.drainHeaterLoad} unit="kJ" />
                        <ResultCard
                            title="Total Miscellaneous Load"
                            value={results.totalMiscLoad}
                            unit="kJ"
                        />
                    </SectionCard>

                    {/* Heat Distribution */}
                    <SectionCard title="Heat Distribution">
                        <ResultCard title="Sensible Heat" value={results.sensibleHeatKJ24Hr} unit="kJ/24Hr" />
                        <ResultCard title="Latent Heat" value={results.latentHeatKJ24Hr} unit="kJ/24Hr" />
                        <ResultCard title="SHR (Sensible Heat Ratio)" value={results.shr} unit="" />
                        <ResultCard title="Air Quantity Required" value={results.airQtyRequiredCfm} unit="CFM" />
                    </SectionCard>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Powered by Enzo</Text>
                        <Text style={styles.footerSubtext}>
                            Professional blast freezer heat load calculations following exact Excel formulas
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
