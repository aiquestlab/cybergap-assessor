
import { controlIdMapping } from './controlMappings';
import { controlWeights } from './controlWeights';

// Get the weight for a specific CMMC control ID
export const getControlWeight = (cmmcControlId: string): number => {
  // Convert CMMC ID to NIST SP 800-171 format
  const nistId = Object.entries(controlIdMapping).find(([_, cmmc]) => cmmc === cmmcControlId)?.[0];
  
  if (!nistId) {
    console.warn(`Control ID not found: ${cmmcControlId}`);
    return 1; // Default weight if not found
  }
  
  const weight = controlWeights.find(w => w.controlId === nistId)?.weight;
  return weight || 1; // Default weight if not found
};

// Get the maximum possible SPRS score
export const getMaxSPRSScore = (): number => {
  return 110; // Max score is 110
};

// Get the minimum possible SPRS score
export const getMinSPRSScore = (): number => {
  return -203; // Min score is -203
};
