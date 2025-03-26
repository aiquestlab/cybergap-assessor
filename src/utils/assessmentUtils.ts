
import { AssessmentResult, Assessment } from './cmmcData';

// Calculate the SPRS score based on assessment results
export const calculateSPRSScore = (results: AssessmentResult[]): number => {
  if (results.length === 0) return 0;
  
  // Count compliant controls
  const compliantCount = results.filter(r => r.status === 'compliant').length;
  
  // Count partially-compliant controls (count as 0.5)
  const partiallyCompliantCount = results.filter(r => r.status === 'partially-compliant').length;
  
  // Count not-applicable controls (exclude from calculation)
  const notApplicableCount = results.filter(r => r.status === 'not-applicable').length;
  
  // Calculate total applicable controls
  const totalApplicableControls = results.length - notApplicableCount;
  
  if (totalApplicableControls === 0) return 0;
  
  // Calculate SPRS score (scaled to 110 for full CMMC level 2)
  const rawScore = (compliantCount + (partiallyCompliantCount * 0.5)) / totalApplicableControls;
  return Math.round(rawScore * 100);
};

// Create a new assessment
export const createAssessment = (
  level: 1 | 2,
  organizationName: string,
  controlIds: string[]
): Assessment => {
  return {
    level,
    organizationName,
    assessmentDate: new Date().toISOString(),
    results: controlIds.map(controlId => ({
      controlId,
      status: 'non-compliant' as const,
    })),
  };
};

// Update an assessment result
export const updateAssessmentResult = (
  assessment: Assessment,
  controlId: string,
  status: AssessmentResult['status'],
  evidence?: string,
  notes?: string
): Assessment => {
  const updatedResults = assessment.results.map(result => {
    if (result.controlId === controlId) {
      return {
        ...result,
        status,
        evidence,
        notes,
      };
    }
    return result;
  });

  return {
    ...assessment,
    results: updatedResults,
  };
};

// Get compliance statistics
export const getComplianceStats = (results: AssessmentResult[]) => {
  const totalControls = results.length;
  const compliant = results.filter(r => r.status === 'compliant').length;
  const nonCompliant = results.filter(r => r.status === 'non-compliant').length;
  const partiallyCompliant = results.filter(r => r.status === 'partially-compliant').length;
  const notApplicable = results.filter(r => r.status === 'not-applicable').length;
  
  return {
    totalControls,
    compliant,
    nonCompliant,
    partiallyCompliant,
    notApplicable,
    applicableControls: totalControls - notApplicable,
    compliancePercentage: Math.round((compliant / (totalControls - notApplicable)) * 100) || 0
  };
};

// Generate recommendations based on non-compliant controls
export const generateRecommendations = (results: AssessmentResult[]): string[] => {
  const recommendations: string[] = [];
  
  // Example recommendations based on control IDs
  const nonCompliantIds = results
    .filter(r => r.status === 'non-compliant')
    .map(r => r.controlId);
  
  if (nonCompliantIds.includes('AC.1.001') || nonCompliantIds.includes('AC.1.002')) {
    recommendations.push("Implement role-based access control (RBAC) system to limit access to authorized users");
  }
  
  if (nonCompliantIds.includes('IA.1.076') || nonCompliantIds.includes('IA.1.077')) {
    recommendations.push("Implement multi-factor authentication for all user access");
  }
  
  if (nonCompliantIds.includes('SC.1.175') || nonCompliantIds.includes('SC.1.176')) {
    recommendations.push("Deploy network monitoring tools and implement network segmentation");
  }
  
  if (nonCompliantIds.includes('SI.1.210') || nonCompliantIds.includes('SI.1.211')) {
    recommendations.push("Deploy enterprise-grade antivirus/anti-malware solution");
  }
  
  // Add generic recommendations if few specific ones were generated
  if (recommendations.length < 3 && nonCompliantIds.length > 0) {
    recommendations.push("Develop and implement a comprehensive security policy");
    recommendations.push("Conduct regular security awareness training for all employees");
    recommendations.push("Perform regular vulnerability assessments and penetration testing");
  }
  
  return recommendations;
};
