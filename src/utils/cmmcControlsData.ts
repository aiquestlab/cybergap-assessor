
// Define the structure for assessment criteria
export interface AssessmentCriterion {
  id: string;
  text: string;
  status: 'compliant' | 'non-compliant' | 'partially-compliant' | 'not-applicable' | 'TBD';
  notes: string;
}

// Define the extended control structure
export interface ExtendedControl {
  nistId: string;
  cmmcId: string;
  domain: string;
  name: string;
  deduction: number;
  guidance: string;
  assessmentCriteria: AssessmentCriterion[];
  level?: 1 | 2; // Optional, can be derived from cmmcId
}

// Function to convert legacy Control format to ExtendedControl
export const convertToExtendedControl = (control: import('./cmmcData').Control): ExtendedControl => {
  // Extract the NIST ID from mappings or use a default pattern
  const nistId = control.id.includes('.') ? control.id.split('.').pop() || control.id : control.id;
  
  return {
    nistId: nistId,
    cmmcId: control.id,
    domain: control.domain,
    name: control.title,
    deduction: -1, // Default deduction, should be updated with actual value
    guidance: control.description || 'None',
    level: control.level,
    assessmentCriteria: [] // Default empty criteria
  };
};

// Sample data loader function - call this to load your full dataset
export const importCMMCControlsData = () => {
  // This is where you would paste your full array of control data
  // For now, returning a sample control
  return [
    {
      nistId: '3.1.1', 
      cmmcId: 'AC.L1-3.1.1', 
      domain: 'AC', 
      name: 'Limit system access to authorized users, processes acting on behalf of authorized users, and devices (including other systems).', 
      deduction: -5, 
      guidance: 'None',
      assessmentCriteria: [
        { id: '3.1.1[a]', text: 'authorized users are identified.', status: 'TBD', notes: '' },
        { id: '3.1.1[b]', text: 'processes acting on behalf of authorized users are identified.', status: 'TBD', notes: '' },
        { id: '3.1.1[c]', text: 'devices (and other systems) authorized to connect to the system are identified.', status: 'TBD', notes: '' },
        { id: '3.1.1[d]', text: 'system access is limited to authorized users.', status: 'TBD', notes: '' },
        { id: '3.1.1[e]', text: 'system access is limited to processes acting on behalf of authorized users.', status: 'TBD', notes: '' },
        { id: '3.1.1[f]', text: 'system access is limited to authorized devices (including other systems).', status: 'TBD', notes: '' }
      ]
    }
  ] as ExtendedControl[];
};

// Convert from extended format to simplified format for compatibility
export const convertToSimpleControl = (extControl: ExtendedControl): import('./cmmcData').Control => {
  // Determine level from CMMC ID
  const level = extControl.level || (extControl.cmmcId.includes('L1') ? 1 : 2);
  
  return {
    id: extControl.cmmcId,
    domain: extControl.domain,
    title: extControl.name,
    description: extControl.guidance,
    level: level as 1 | 2
  };
};

// Function to import and convert data to the format used by the application
export const importAndConvertCMMCData = () => {
  const extendedControls = importCMMCControlsData();
  return extendedControls.map(convertToSimpleControl);
};
