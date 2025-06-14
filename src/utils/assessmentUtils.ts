import { AssessmentResult, Assessment, getControlById } from './cmmcData';
import { getControlWeight, getMaxSPRSScore } from './sprs';
import { ExtendedControl, AssessmentCriterion } from './cmmcControlsData';

// Calculate the SPRS score based on assessment results
export const calculateSPRSScore = (results: AssessmentResult[]): number => {
  if (results.length === 0) return getMaxSPRSScore();
  
  // Start with the maximum score (110)
  const maxScore = getMaxSPRSScore();
  
  // Calculate deductions for non-compliant and partially-compliant controls
  let deductions = 0;
  
  results.forEach(result => {
    // Skip not-applicable controls
    if (result.status === 'not-applicable') return;
    
    // Get the weight for this control
    const weight = getControlWeight(result.controlId);
    
    // Apply deductions based on compliance status
    if (result.status === 'non-compliant') {
      deductions += weight;
    } else if (result.status === 'partially-compliant') {
      deductions += weight / 2; // Half deduction for partially-compliant
    }
    // No deduction for compliant controls
  });
  
  // Calculate final score
  const finalScore = maxScore - deductions;
  
  // Round to nearest integer
  return Math.round(finalScore);
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
  
  const applicableControls = totalControls - notApplicable;
  const compliancePercentage = applicableControls > 0 
    ? Math.round((compliant / applicableControls) * 100) 
    : 0;
  
  return {
    totalControls,
    compliant,
    nonCompliant,
    partiallyCompliant,
    notApplicable,
    applicableControls,
    compliancePercentage
  };
};

// NEW: type for SPRS breakdown
export interface SPRSDeduction {
  controlId: string;
  title: string;
  status: 'non-compliant' | 'partially-compliant';
  deduction: number;
}

export interface SPRSBreakdown {
  maxScore: number;
  totalDeductions: number;
  finalScore: number;
  topDeductions: SPRSDeduction[];
}

// NEW: function to get SPRS score breakdown
export const getSPRSScoreBreakdown = (results: AssessmentResult[]): SPRSBreakdown => {
  const maxScore = getMaxSPRSScore();
  let totalDeductionsValue = 0;

  const allDeductions: SPRSDeduction[] = [];

  results.forEach(result => {
    if (result.status === 'not-applicable' || result.status === 'compliant') return;

    const weight = getControlWeight(result.controlId);
    const control = getControlById(result.controlId);
    let deduction = 0;

    if (result.status === 'non-compliant') {
      deduction = weight;
    } else if (result.status === 'partially-compliant') {
      // This is consistent with the existing calculateSPRSScore function
      deduction = weight / 2;
    }
    
    totalDeductionsValue += deduction;

    if (deduction > 0) {
      allDeductions.push({
        controlId: result.controlId,
        title: control?.title || 'Unknown Control',
        status: result.status,
        deduction: deduction,
      });
    }
  });

  const finalScore = maxScore - totalDeductionsValue;

  const topDeductions = allDeductions
    .sort((a, b) => b.deduction - a.deduction)
    .slice(0, 5);

  return {
    maxScore,
    totalDeductions: Math.round(totalDeductionsValue),
    finalScore: Math.round(finalScore),
    topDeductions,
  };
};

// Generate recommendations based on non-compliant controls
export const generateRecommendations = (results: AssessmentResult[]): string[] => {
  const recommendations: string[] = [];
  
  // Get non-compliant controls sorted by weight (highest first)
  const nonCompliantControls = results
    .filter(r => r.status === 'non-compliant')
    .map(r => ({
      id: r.controlId,
      weight: getControlWeight(r.controlId),
      control: getControlById(r.controlId)
    }))
    .sort((a, b) => b.weight - a.weight);
  
  // Generate domain-specific recommendations
  const accessControlIds = nonCompliantControls
    .filter(c => c.control?.domain === 'Access Control')
    .map(c => c.id);
  
  if (accessControlIds.length > 0) {
    recommendations.push("Implement robust access control mechanisms including role-based access controls (RBAC) and least privilege principles");
  }
  
  const identificationIds = nonCompliantControls
    .filter(c => c.control?.domain === 'Identification and Authentication')
    .map(c => c.id);
  
  if (identificationIds.length > 0) {
    recommendations.push("Strengthen identification and authentication controls, including multi-factor authentication implementation");
  }
  
  const systemProtectionIds = nonCompliantControls
    .filter(c => c.control?.domain === 'System and Communications Protection')
    .map(c => c.id);
  
  if (systemProtectionIds.length > 0) {
    recommendations.push("Enhance system and communications protection through network segmentation and encryption of sensitive data");
  }
  
  const systemIntegrityIds = nonCompliantControls
    .filter(c => c.control?.domain === 'System and Information Integrity')
    .map(c => c.id);
  
  if (systemIntegrityIds.length > 0) {
    recommendations.push("Improve system integrity controls including malware protection, system monitoring, and timely patching");
  }
  
  // Generate specific recommendations for high-weight controls
  const highWeightControls = nonCompliantControls.filter(c => c.weight >= 5);
  
  highWeightControls.forEach(c => {
    if (c.control) {
      recommendations.push(`Address high-priority control ${c.id}: ${c.control.title}`);
    }
  });
  
  // Add generic recommendations if few specific ones were generated
  if (recommendations.length < 3 && nonCompliantControls.length > 0) {
    recommendations.push("Develop and implement a comprehensive security policy");
    recommendations.push("Conduct regular security awareness training for all employees");
    recommendations.push("Perform regular vulnerability assessments and penetration testing");
  }
  
  // Return unique recommendations, limited to top 6
  return [...new Set(recommendations)].slice(0, 6);
};

// Add function to get extended control data if available
export const getExtendedControlData = (controlId: string): ExtendedControl | null => {
  try {
    // This is where you would fetch from your extended controls data source
    // For now, return null as we don't have the full data loaded yet
    return null;
  } catch (error) {
    console.error('Error fetching extended control data:', error);
    return null;
  }
};
