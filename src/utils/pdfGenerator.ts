
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Assessment, AssessmentResult, Control, getControlById } from './cmmcData';
import { getControlWeight, getMaxSPRSScore } from './sprsWeights';
import { calculateSPRSScore, getComplianceStats } from './assessmentUtils';

// Generate a PDF report for the assessment
export const generatePDFReport = (assessment: Assessment): void => {
  const doc = new jsPDF();
  const reportDate = new Date().toLocaleDateString();
  const sprsScore = calculateSPRSScore(assessment.results);
  const stats = getComplianceStats(assessment.results);
  
  // Add logo and header
  doc.setFontSize(20);
  doc.setTextColor(0, 51, 102);
  doc.text('CMMC Assessment Report', 105, 20, { align: 'center' });
  
  // Add organization info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Organization: ${assessment.organizationName}`, 14, 35);
  doc.text(`Assessment Date: ${reportDate}`, 14, 42);
  doc.text(`CMMC Level: ${assessment.level}`, 14, 49);
  doc.text(`Total Controls: ${assessment.results.length}`, 14, 56);

  // Add SPRS score section
  doc.setFillColor(240, 240, 240);
  doc.rect(14, 65, 182, 25, 'F');
  doc.setFontSize(14);
  doc.setTextColor(0, 51, 102);
  doc.text('SPRS Score Summary', 105, 75, { align: 'center' });
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Overall Score: ${sprsScore}`, 20, 83);
  
  // Calculate grade
  let grade = '';
  if (sprsScore >= 90) grade = 'A';
  else if (sprsScore >= 80) grade = 'B';
  else if (sprsScore >= 70) grade = 'C';
  else if (sprsScore >= 60) grade = 'D';
  else grade = 'F';
  
  doc.text(`Grade: ${grade}`, 120, 83);
  
  // Add compliance statistics
  doc.setFontSize(14);
  doc.setTextColor(0, 51, 102);
  doc.text('Compliance Status', 105, 100, { align: 'center' });
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  const complianceData = [
    ['Status', 'Count', 'Percentage'],
    ['Compliant', stats.compliant.toString(), `${Math.round((stats.compliant / stats.applicableControls) * 100)}%`],
    ['Partially Compliant', stats.partiallyCompliant.toString(), `${Math.round((stats.partiallyCompliant / stats.applicableControls) * 100)}%`],
    ['Non-Compliant', stats.nonCompliant.toString(), `${Math.round((stats.nonCompliant / stats.applicableControls) * 100)}%`],
    ['Not Applicable', stats.notApplicable.toString(), `${Math.round((stats.notApplicable / stats.totalControls) * 100)}%`]
  ];
  
  autoTable(doc, {
    startY: 105,
    head: [complianceData[0]],
    body: complianceData.slice(1),
    theme: 'grid',
    headStyles: { 
      fillColor: [0, 51, 102],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
  
  // Group controls by domain
  const controlsByDomain: Record<string, AssessmentResult[]> = {};
  assessment.results.forEach(result => {
    const control = getControlById(result.controlId);
    if (control) {
      if (!controlsByDomain[control.domain]) {
        controlsByDomain[control.domain] = [];
      }
      controlsByDomain[control.domain].push(result);
    }
  });
  
  // Add control details
  doc.setFontSize(14);
  doc.setTextColor(0, 51, 102);
  doc.addPage();
  doc.text('Control Details', 105, 20, { align: 'center' });
  
  let yPosition = 30;
  
  // Add control tables by domain
  Object.entries(controlsByDomain).forEach(([domain, results]) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(12);
    doc.setTextColor(0, 51, 102);
    doc.text(domain, 14, yPosition);
    yPosition += 5;
    
    const tableData = results.map(result => {
      const control = getControlById(result.controlId);
      const weight = getControlWeight(result.controlId);
      return [
        result.controlId,
        control ? control.title : 'Unknown Control',
        result.status,
        weight.toString(),
        result.notes || ''
      ];
    });
    
    autoTable(doc, {
      startY: yPosition,
      head: [['ID', 'Title', 'Status', 'Weight', 'Notes']],
      body: tableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [0, 51, 102],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 8,
        cellPadding: 1
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 70 },
        2: { cellWidth: 25 },
        3: { cellWidth: 15 },
        4: { cellWidth: 60 }
      }
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 15;
  });
  
  // Save the PDF
  doc.save(`CMMC_Assessment_${assessment.organizationName.replace(/\s+/g, '_')}_${reportDate.replace(/\//g, '-')}.pdf`);
};
