
// Define the ControlWeight interface
export interface ControlWeight {
  controlId: string;
  weight: number;
}

// Access Control weights
export const accessControlWeights: ControlWeight[] = [
  { controlId: "3.1.1", weight: 5 },
  { controlId: "3.1.2", weight: 3 },
  { controlId: "3.1.3", weight: 5 },
  { controlId: "3.1.4", weight: 3 },
  { controlId: "3.1.5", weight: 5 },
  { controlId: "3.1.6", weight: 3 },
  { controlId: "3.1.7", weight: 3 },
  { controlId: "3.1.8", weight: 3 },
  { controlId: "3.1.9", weight: 1 },
  { controlId: "3.1.10", weight: 1 },
  { controlId: "3.1.11", weight: 1 },
  { controlId: "3.1.12", weight: 3 },
  { controlId: "3.1.13", weight: 3 },
  { controlId: "3.1.14", weight: 3 },
  { controlId: "3.1.15", weight: 1 },
  { controlId: "3.1.16", weight: 3 },
  { controlId: "3.1.17", weight: 3 },
  { controlId: "3.1.18", weight: 3 },
  { controlId: "3.1.19", weight: 3 },
  { controlId: "3.1.20", weight: 3 },
  { controlId: "3.1.21", weight: 1 },
  { controlId: "3.1.22", weight: 5 }
];

// Awareness & Training weights
export const awarenessTrainingWeights: ControlWeight[] = [
  { controlId: "3.2.1", weight: 1 },
  { controlId: "3.2.2", weight: 1 },
  { controlId: "3.2.3", weight: 1 }
];

// Audit & Accountability weights
export const auditWeights: ControlWeight[] = [
  { controlId: "3.3.1", weight: 3 },
  { controlId: "3.3.2", weight: 3 },
  { controlId: "3.3.3", weight: 1 },
  { controlId: "3.3.4", weight: 3 },
  { controlId: "3.3.5", weight: 3 },
  { controlId: "3.3.6", weight: 1 },
  { controlId: "3.3.7", weight: 3 },
  { controlId: "3.3.8", weight: 1 },
  { controlId: "3.3.9", weight: 1 }
];

// Configuration Management weights
export const configWeights: ControlWeight[] = [
  { controlId: "3.4.1", weight: 3 },
  { controlId: "3.4.2", weight: 3 },
  { controlId: "3.4.3", weight: 3 },
  { controlId: "3.4.4", weight: 3 },
  { controlId: "3.4.5", weight: 3 },
  { controlId: "3.4.6", weight: 3 },
  { controlId: "3.4.7", weight: 3 },
  { controlId: "3.4.8", weight: 3 },
  { controlId: "3.4.9", weight: 3 }
];

// Identification & Authentication weights
export const idAuthWeights: ControlWeight[] = [
  { controlId: "3.5.1", weight: 3 },
  { controlId: "3.5.2", weight: 3 },
  { controlId: "3.5.3", weight: 5 },
  { controlId: "3.5.4", weight: 5 },
  { controlId: "3.5.5", weight: 1 },
  { controlId: "3.5.6", weight: 1 },
  { controlId: "3.5.7", weight: 3 },
  { controlId: "3.5.8", weight: 3 },
  { controlId: "3.5.9", weight: 1 },
  { controlId: "3.5.10", weight: 3 },
  { controlId: "3.5.11", weight: 1 }
];

// Incident Response weights
export const incidentResponseWeights: ControlWeight[] = [
  { controlId: "3.6.1", weight: 3 },
  { controlId: "3.6.2", weight: 3 },
  { controlId: "3.6.3", weight: 3 }
];

// Maintenance weights
export const maintenanceWeights: ControlWeight[] = [
  { controlId: "3.7.1", weight: 1 },
  { controlId: "3.7.2", weight: 3 },
  { controlId: "3.7.3", weight: 1 },
  { controlId: "3.7.4", weight: 1 },
  { controlId: "3.7.5", weight: 3 },
  { controlId: "3.7.6", weight: 3 }
];

// Media Protection weights
export const mediaProtectionWeights: ControlWeight[] = [
  { controlId: "3.8.1", weight: 3 },
  { controlId: "3.8.2", weight: 3 },
  { controlId: "3.8.3", weight: 5 },
  { controlId: "3.8.4", weight: 1 },
  { controlId: "3.8.5", weight: 1 },
  { controlId: "3.8.6", weight: 3 },
  { controlId: "3.8.7", weight: 1 },
  { controlId: "3.8.8", weight: 1 },
  { controlId: "3.8.9", weight: 3 }
];

// Personnel Security weights
export const personnelSecurityWeights: ControlWeight[] = [
  { controlId: "3.9.1", weight: 1 },
  { controlId: "3.9.2", weight: 3 }
];

// Physical Protection weights
export const physicalProtectionWeights: ControlWeight[] = [
  { controlId: "3.10.1", weight: 3 },
  { controlId: "3.10.2", weight: 3 },
  { controlId: "3.10.3", weight: 1 },
  { controlId: "3.10.4", weight: 1 },
  { controlId: "3.10.5", weight: 1 },
  { controlId: "3.10.6", weight: 1 }
];

// Risk Assessment weights
export const riskAssessmentWeights: ControlWeight[] = [
  { controlId: "3.11.1", weight: 3 },
  { controlId: "3.11.2", weight: 5 },
  { controlId: "3.11.3", weight: 5 }
];

// Security Assessment weights
export const securityAssessmentWeights: ControlWeight[] = [
  { controlId: "3.12.1", weight: 3 },
  { controlId: "3.12.2", weight: 3 },
  { controlId: "3.12.3", weight: 3 },
  { controlId: "3.12.4", weight: 5 }
];

// System & Communications Protection weights
export const systemProtectionWeights: ControlWeight[] = [
  { controlId: "3.13.1", weight: 5 },
  { controlId: "3.13.2", weight: 3 },
  { controlId: "3.13.3", weight: 1 },
  { controlId: "3.13.4", weight: 3 },
  { controlId: "3.13.5", weight: 3 },
  { controlId: "3.13.6", weight: 3 },
  { controlId: "3.13.7", weight: 1 },
  { controlId: "3.13.8", weight: 3 },
  { controlId: "3.13.9", weight: 1 },
  { controlId: "3.13.10", weight: 3 },
  { controlId: "3.13.11", weight: 3 },
  { controlId: "3.13.12", weight: 1 },
  { controlId: "3.13.13", weight: 1 },
  { controlId: "3.13.14", weight: 3 },
  { controlId: "3.13.15", weight: 1 },
  { controlId: "3.13.16", weight: 3 }
];

// System & Information Integrity weights
export const systemIntegrityWeights: ControlWeight[] = [
  { controlId: "3.14.1", weight: 3 },
  { controlId: "3.14.2", weight: 3 },
  { controlId: "3.14.3", weight: 3 },
  { controlId: "3.14.4", weight: 3 },
  { controlId: "3.14.5", weight: 3 },
  { controlId: "3.14.6", weight: 5 },
  { controlId: "3.14.7", weight: 5 }
];

// Export the combined weight list
export const controlWeights: ControlWeight[] = [
  ...accessControlWeights,
  ...awarenessTrainingWeights,
  ...auditWeights,
  ...configWeights,
  ...idAuthWeights,
  ...incidentResponseWeights,
  ...maintenanceWeights,
  ...mediaProtectionWeights,
  ...personnelSecurityWeights,
  ...physicalProtectionWeights,
  ...riskAssessmentWeights,
  ...securityAssessmentWeights,
  ...systemProtectionWeights,
  ...systemIntegrityWeights
];
