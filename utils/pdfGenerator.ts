import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';

export interface PDFData {
  title: string;
  subtitle: string;
  sections: Array<{
    title: string;
    items: Array<{
      label: string;
      value: string;
      unit: string;
      isHighlighted?: boolean;
    }>;
  }>;
}

export const generateAndSharePDF = async (data: PDFData) => {
  try {
    const htmlContent = generateHTMLContent(data);
    
    // Generate PDF
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    // Share the PDF
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Share ${data.title}`,
        UTI: 'com.adobe.pdf',
      });
    } else {
      Alert.alert('Error', 'Sharing is not available on this device');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    Alert.alert('Error', 'Failed to generate PDF. Please try again.');
  }
};

const generateHTMLContent = (data: PDFData): string => {
  // Find the main result value (usually first highlighted item)
  const mainResult = data.sections
    .flatMap(section => section.items)
    .find(item => item.isHighlighted);
  
  const finalLoad = mainResult ? `${mainResult.value} ${mainResult.unit}` : 'N/A';
  const finalLoadLabel = mainResult ? mainResult.label : 'Final Load';
  
  // Create a comprehensive results table with all data
  const allResultsHTML = data.sections.map(section => `
    <tr class="section-header">
      <td colspan="4" class="section-title">${section.title}</td>
    </tr>
    ${section.items.map(item => `
      <tr class="result-row ${item.isHighlighted ? 'highlighted' : ''}">
        <td class="result-label">${item.label}</td>
        <td class="result-value">${item.value}</td>
        <td class="result-unit">${item.unit || ''}</td>
        <td class="result-status">${item.isHighlighted ? '●' : ''}</td>
      </tr>
    `).join('')}
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${data.title}</title>
      <style>
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        @page { 
          size: A4; 
          margin: 8mm; 
        }
        
        body {
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
          line-height: 1.2;
          color: #1a202c;
          background: #ffffff;
          font-size: 10px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          max-height: 277mm; /* A4 height minus margins */
        }
        
        /* Header Section - Reduced size */
        .header {
          text-align: center;
          margin-bottom: 4mm;
          padding: 4mm 3mm 3mm 3mm;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
          color: white;
          border-radius: 6px;
          box-shadow: 0 2px 10px rgba(30, 58, 138, 0.2);
        }
        
        .brand-title {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 2mm;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        
        .report-title {
          font-size: 12px;
          font-weight: 500;
          opacity: 0.9;
        }
        
        /* Final Load Section - Reduced size */
        .final-load-section {
          text-align: center;
          margin-bottom: 4mm;
          padding: 3mm;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          border-radius: 8px;
          box-shadow: 0 3px 15px rgba(37, 99, 235, 0.2);
        }
        
        .final-load-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          margin-bottom: 1mm;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        
        .final-load-value {
          font-size: 22px;
          font-weight: 900;
          color: white;
          text-shadow: 0 1px 5px rgba(0,0,0,0.3);
        }
        
        /* Main Results Table - Optimized for single page */
        .results-container {
          flex: 1;
          margin-bottom: 3mm;
          background: white;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 1px 6px rgba(0,0,0,0.08);
          max-height: calc(100vh - 140mm); /* Ensure it fits */
        }
        
        .results-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 9px;
        }
        
        .section-header {
          background: linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        .section-title {
          padding: 2mm 3mm;
          font-weight: 700;
          font-size: 10px;
          color: #1e293b;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          border-bottom: 1px solid #e2e8f0;
          text-align: left;
        }
        
        .result-row {
          transition: background-color 0.2s ease;
        }
        
        .result-row.highlighted {
          background: linear-gradient(90deg, #dbeafe 0%, #bfdbfe 100%);
          font-weight: 600;
        }
        
        .result-row td {
          padding: 1.5mm 3mm;
          border-bottom: 1px solid #f8fafc;
          vertical-align: middle;
        }
        
        .result-label {
          color: #374151;
          font-weight: 500;
          width: 50%;
        }
        
        .highlighted .result-label {
          color: #1e40af;
          font-weight: 600;
        }
        
        .result-value {
          color: #2563eb;
          font-weight: 700;
          font-size: 9px;
          text-align: right;
          width: 25%;
        }
        
        .highlighted .result-value {
          color: #1d4ed8;
          font-size: 10px;
        }
        
        .result-unit {
          color: #6b7280;
          font-weight: 500;
          text-align: left;
          width: 15%;
          padding-left: 1.5mm;
        }
        
        .highlighted .result-unit {
          color: #1e40af;
          font-weight: 600;
        }
        
        .result-status {
          color: #10b981;
          font-weight: 900;
          font-size: 12px;
          text-align: center;
          width: 10%;
        }
        
        /* Footer - Fixed at bottom */
        .footer {
          margin-top: auto;
          padding: 2mm 3mm;
          background: linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #e2e8f0;
          font-size: 8px;
          color: #64748b;
          height: 8mm; /* Fixed height */
          flex-shrink: 0; /* Prevent shrinking */
        }
        
        .footer-left {
          font-weight: 600;
          color: #3b82f6;
        }
        
        .footer-right {
          font-style: italic;
        }
        
        /* Print optimizations */
        @media print {
          body { 
            font-size: 9px; 
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            max-height: 277mm;
          }
          
          .brand-title { font-size: 16px; }
          .final-load-value { font-size: 20px; }
          .results-table { font-size: 8px; }
          .section-title { font-size: 9px; }
          .result-value { font-size: 8px; }
          .highlighted .result-value { font-size: 9px; }
          
          .results-container {
            break-inside: avoid;
            page-break-inside: avoid;
            max-height: calc(100vh - 120mm);
          }
          
          .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <!-- Header - UNCHANGED -->
      <div class="header">
        <div class="brand-title">Powered by Enzo CoolCalc</div>
        <div class="report-title">${data.title}</div>
      </div>
      
      <!-- Final Load Section - UNCHANGED -->
      <div class="final-load-section">
        <div class="final-load-label">${finalLoadLabel}</div>
        <div class="final-load-value">${finalLoad}</div>
      </div>
      
      <!-- Results Table - NEW CLEAN FORMAT -->
      <div class="results-container">
        <table class="results-table">
          <thead>
            <tr style="background: #1e293b; color: white;">
              <th style="padding: 3mm 4mm; text-align: left; font-weight: 700; font-size: 11px;">Parameter</th>
              <th style="padding: 3mm 4mm; text-align: right; font-weight: 700; font-size: 11px;">Value</th>
              <th style="padding: 3mm 4mm; text-align: left; font-weight: 700; font-size: 11px;">Unit</th>
              <th style="padding: 3mm 4mm; text-align: center; font-weight: 700; font-size: 11px;">Key</th>
            </tr>
          </thead>
          <tbody>
            ${allResultsHTML}
          </tbody>
        </table>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <div class="footer-left">Professional Refrigeration Calculator</div>
        <div class="footer-right">Generated on ${new Date().toLocaleDateString()}</div>
      </div>
    </body>
    </html>
  `;
};
