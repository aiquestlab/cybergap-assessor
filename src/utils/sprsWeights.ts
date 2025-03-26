
// SPRS score weights for each CMMC control
export interface ControlWeight {
  controlId: string;
  weight: number;
}

// Map NIST SP 800-171 IDs to CMMC control IDs
// CMMC IDs follow pattern like AC.L1-3.1.1, but weights are listed as 3.1.1
export const controlIdMapping: Record<string, string> = {
  // Access Control
  "3.1.1": "AC.1.001",
  "3.1.2": "AC.1.002",
  "3.1.3": "AC.2.016",
  "3.1.4": "AC.2.017",
  "3.1.5": "AC.2.007",
  "3.1.6": "AC.2.008",
  "3.1.7": "AC.2.018",
  "3.1.8": "AC.2.009",
  "3.1.9": "AC.2.005",
  "3.1.10": "AC.2.010",
  "3.1.11": "AC.2.011",
  "3.1.12": "AC.2.012",
  "3.1.13": "AC.2.013",
  "3.1.14": "AC.2.014",
  "3.1.15": "AC.2.015",
  "3.1.16": "AC.2.023",
  "3.1.17": "AC.2.024",
  "3.1.18": "AC.2.024",
  "3.1.19": "AC.2.024",
  "3.1.20": "AC.1.003",
  "3.1.21": "AC.2.006",
  "3.1.22": "AC.1.004",
  
  // Awareness & Training
  "3.2.1": "AT.2.056",
  "3.2.2": "AT.2.057",
  "3.2.3": "AT.2.058",
  
  // Audit & Accountability
  "3.3.1": "AU.2.042",
  "3.3.2": "AU.2.041",
  "3.3.3": "AU.2.044",
  "3.3.4": "AU.2.045",
  "3.3.5": "AU.2.046",
  "3.3.6": "AU.2.047",
  "3.3.7": "AU.2.043",
  "3.3.8": "AU.2.048",
  "3.3.9": "AU.2.049",
  
  // Configuration Management
  "3.4.1": "CM.2.061",
  "3.4.2": "CM.2.064",
  "3.4.3": "CM.2.065",
  "3.4.4": "CM.2.066",
  "3.4.5": "CM.2.062",
  "3.4.6": "CM.2.062",
  "3.4.7": "CM.2.062",
  "3.4.8": "CM.2.063",
  "3.4.9": "CM.2.063",
  
  // Identification & Authentication
  "3.5.1": "IA.1.076",
  "3.5.2": "IA.1.077",
  "3.5.3": "AC.2.023",
  "3.5.4": "IA.2.083",
  "3.5.5": "IA.2.084",
  "3.5.6": "IA.2.085",
  "3.5.7": "IA.2.078",
  "3.5.8": "IA.2.079",
  "3.5.9": "IA.2.080",
  "3.5.10": "IA.2.081",
  "3.5.11": "IA.2.082",
  
  // Incident Response
  "3.6.1": "IR.2.092",
  "3.6.2": "IR.2.094",
  "3.6.3": "IR.2.096",
  
  // Maintenance
  "3.7.1": "MA.2.099",
  "3.7.2": "MA.2.100",
  "3.7.3": "MA.2.101",
  "3.7.4": "MA.2.104",
  "3.7.5": "MA.2.103",
  "3.7.6": "MA.2.102",
  
  // Media Protection
  "3.8.1": "MP.2.119",
  "3.8.2": "MP.2.120",
  "3.8.3": "MP.1.118",
  "3.8.4": "MP.2.121",
  "3.8.5": "MP.2.122",
  "3.8.6": "MP.2.123",
  "3.8.7": "MP.2.125",
  "3.8.8": "MP.2.124",
  "3.8.9": "MP.2.126",
  
  // Personnel Security
  "3.9.1": "PS.2.127",
  "3.9.2": "PS.2.128",
  
  // Physical Protection
  "3.10.1": "PE.1.131",
  "3.10.2": "PE.2.135",
  "3.10.3": "PE.1.132",
  "3.10.4": "PE.1.133",
  "3.10.5": "PE.1.134",
  "3.10.6": "PE.2.136",
  
  // Risk Assessment
  "3.11.1": "RA.2.141",
  "3.11.2": "RA.2.142",
  "3.11.3": "RA.2.143",
  
  // Security Assessment
  "3.12.1": "CA.2.158",
  "3.12.2": "CA.2.159",
  "3.12.3": "CA.2.158",
  "3.12.4": "CA.2.157",
  
  // System & Communications Protection
  "3.13.1": "SC.1.175",
  "3.13.2": "SC.2.177",
  "3.13.3": "SC.2.178",
  "3.13.4": "SC.2.179",
  "3.13.5": "SC.1.176",
  "3.13.6": "SC.2.180",
  "3.13.7": "SC.2.181",
  "3.13.8": "SC.2.183",
  "3.13.9": "SC.2.184",
  "3.13.10": "SC.2.185",
  "3.13.11": "SC.2.186",
  "3.13.12": "SC.2.182",
  "3.13.13": "SC.2.187",
  "3.13.14": "SC.2.188",
  "3.13.15": "SC.2.189",
  "3.13.16": "SC.2.178",
  
  // System & Information Integrity
  "3.14.1": "SI.1.210",
  "3.14.2": "SI.1.211",
  "3.14.3": "SI.2.214",
  "3.14.4": "SI.1.212",
  "3.14.5": "SI.1.213",
  "3.14.6": "SI.2.216",
  "3.14.7": "SI.2.217"
};

// Control weights based on provided data
export const controlWeights: ControlWeight[] = [
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
  { controlId: "3.1.22", weight: 5 },
  { controlId: "3.2.1", weight: 1 },
  { controlId: "3.2.2", weight: 1 },
  { controlId: "3.2.3", weight: 1 },
  { controlId: "3.3.1", weight: 3 },
  { controlId: "3.3.2", weight: 3 },
  { controlId: "3.3.3", weight: 1 },
  { controlId: "3.3.4", weight: 3 },
  { controlId: "3.3.5", weight: 3 },
  { controlId: "3.3.6", weight: 1 },
  { controlId: "3.3.7", weight: 3 },
  { controlId: "3.3.8", weight: 1 },
  { controlId: "3.3.9", weight: 1 },
  { controlId: "3.4.1", weight: 3 },
  { controlId: "3.4.2", weight: 3 },
  { controlId: "3.4.3", weight: 3 },
  { controlId: "3.4.4", weight: 3 },
  { controlId: "3.4.5", weight: 3 },
  { controlId: "3.4.6", weight: 3 },
  { controlId: "3.4.7", weight: 3 },
  { controlId: "3.4.8", weight: 3 },
  { controlId: "3.4.9", weight: 3 },
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
  { controlId: "3.5.11", weight: 1 },
  { controlId: "3.6.1", weight: 3 },
  { controlId: "3.6.2", weight: 3 },
  { controlId: "3.6.3", weight: 3 },
  { controlId: "3.7.1", weight: 1 },
  { controlId: "3.7.2", weight: 3 },
  { controlId: "3.7.3", weight: 1 },
  { controlId: "3.7.4", weight: 1 },
  { controlId: "3.7.5", weight: 3 },
  { controlId: "3.7.6", weight: 3 },
  { controlId: "3.8.1", weight: 3 },
  { controlId: "3.8.2", weight: 3 },
  { controlId: "3.8.3", weight: 5 },
  { controlId: "3.8.4", weight: 1 },
  { controlId: "3.8.5", weight: 1 },
  { controlId: "3.8.6", weight: 3 },
  { controlId: "3.8.7", weight: 1 },
  { controlId: "3.8.8", weight: 1 },
  { controlId: "3.8.9", weight: 3 },
  { controlId: "3.9.1", weight: 1 },
  { controlId: "3.9.2", weight: 3 },
  { controlId: "3.10.1", weight: 3 },
  { controlId: "3.10.2", weight: 3 },
  { controlId: "3.10.3", weight: 1 },
  { controlId: "3.10.4", weight: 1 },
  { controlId: "3.10.5", weight: 1 },
  { controlId: "3.10.6", weight: 1 },
  { controlId: "3.11.1", weight: 3 },
  { controlId: "3.11.2", weight: 5 },
  { controlId: "3.11.3", weight: 5 },
  { controlId: "3.12.1", weight: 3 },
  { controlId: "3.12.2", weight: 3 },
  { controlId: "3.12.3", weight: 3 },
  { controlId: "3.12.4", weight: 5 },
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
  { controlId: "3.13.16", weight: 3 },
  { controlId: "3.14.1", weight: 3 },
  { controlId: "3.14.2", weight: 3 },
  { controlId: "3.14.3", weight: 3 },
  { controlId: "3.14.4", weight: 3 },
  { controlId: "3.14.5", weight: 3 },
  { controlId: "3.14.6", weight: 5 },
  { controlId: "3.14.7", weight: 5 }
];

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
  return 110; // Max score starts at 110
};
