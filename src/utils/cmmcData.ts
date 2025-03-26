
export interface Control {
  id: string;
  domain: string;
  title: string;
  description: string;
  level: 1 | 2;
}

export interface AssessmentResult {
  controlId: string;
  status: 'compliant' | 'non-compliant' | 'partially-compliant' | 'not-applicable';
  evidence?: string;
  notes?: string;
}

export interface Assessment {
  level: 1 | 2;
  organizationName: string;
  assessmentDate: string;
  results: AssessmentResult[];
}

// CMMC Level 1 Controls (17 practices)
export const level1Controls: Control[] = [
  {
    id: "AC.1.001",
    domain: "Access Control",
    title: "Limit information system access to authorized users, processes acting on behalf of authorized users, and devices (including other information systems).",
    description: "Only allow access for authorized users, processes acting on behalf of authorized users or devices (including other systems).",
    level: 1
  },
  {
    id: "AC.1.002",
    domain: "Access Control",
    title: "Limit information system access to the types of transactions and functions that authorized users are permitted to execute.",
    description: "Limit access to the types of transactions and functions that authorized users are permitted to execute.",
    level: 1
  },
  {
    id: "AC.1.003",
    domain: "Access Control",
    title: "Verify and control/limit connections to and use of external information systems.",
    description: "Verify and control/limit connections to and use of external systems.",
    level: 1
  },
  {
    id: "AC.1.004",
    domain: "Access Control",
    title: "Control information posted or processed on publicly accessible information systems.",
    description: "Control information posted or processed on publicly accessible systems.",
    level: 1
  },
  {
    id: "IA.1.076",
    domain: "Identification and Authentication",
    title: "Identify information system users, processes acting on behalf of users, or devices.",
    description: "Identify system users, processes acting on behalf of users, and devices.",
    level: 1
  },
  {
    id: "IA.1.077",
    domain: "Identification and Authentication",
    title: "Authenticate (or verify) the identities of those users, processes, or devices, as a prerequisite to allowing access to organizational information systems.",
    description: "Authenticate (or verify) the identities of users, processes, or devices before allowing access to systems.",
    level: 1
  },
  {
    id: "MP.1.118",
    domain: "Media Protection",
    title: "Sanitize or destroy information system media containing Federal Contract Information before disposal or release for reuse.",
    description: "Sanitize or destroy system media containing FCI before disposal or release for reuse.",
    level: 1
  },
  {
    id: "PE.1.131",
    domain: "Physical Protection",
    title: "Limit physical access to organizational information systems, equipment, and the respective operating environments to authorized individuals.",
    description: "Limit physical access to systems, equipment, and operating environments to authorized individuals.",
    level: 1
  },
  {
    id: "PE.1.132",
    domain: "Physical Protection",
    title: "Escort visitors and monitor visitor activity.",
    description: "Escort visitors and monitor visitor activity.",
    level: 1
  },
  {
    id: "PE.1.133",
    domain: "Physical Protection",
    title: "Maintain audit logs of physical access.",
    description: "Maintain audit logs of physical access.",
    level: 1
  },
  {
    id: "PE.1.134",
    domain: "Physical Protection",
    title: "Control and manage physical access devices.",
    description: "Control and manage physical access devices.",
    level: 1
  },
  {
    id: "SC.1.175",
    domain: "System and Communications Protection",
    title: "Monitor, control, and protect organizational communications (i.e., information transmitted or received by organizational information systems) at the external boundaries and key internal boundaries of the information systems.",
    description: "Monitor, control, and protect communications at system boundaries and key internal boundaries.",
    level: 1
  },
  {
    id: "SC.1.176",
    domain: "System and Communications Protection",
    title: "Implement subnetworks for publicly accessible system components that are physically or logically separated from internal networks.",
    description: "Implement subnetworks for publicly accessible system components that are physically or logically separated from internal networks.",
    level: 1
  },
  {
    id: "SI.1.210",
    domain: "System and Information Integrity",
    title: "Identify, report, and correct information and information system flaws in a timely manner.",
    description: "Identify, report, and correct system flaws in a timely manner.",
    level: 1
  },
  {
    id: "SI.1.211",
    domain: "System and Information Integrity",
    title: "Provide protection from malicious code at appropriate locations within organizational information systems.",
    description: "Provide protection from malicious code.",
    level: 1
  },
  {
    id: "SI.1.212",
    domain: "System and Information Integrity",
    title: "Update malicious code protection mechanisms when new releases are available.",
    description: "Update malicious code protection mechanisms when new releases are available.",
    level: 1
  },
  {
    id: "SI.1.213",
    domain: "System and Information Integrity",
    title: "Perform periodic scans of the information system and real-time scans of files from external sources as files are downloaded, opened, or executed.",
    description: "Perform periodic scans of systems and real-time scans of files from external sources.",
    level: 1
  }
];

// Simplified subset of CMMC Level 2 Controls - in a real app all 110 would be included
export const level2Controls: Control[] = [
  // Including Level 1 controls as they are part of Level 2
  ...level1Controls,
  
  // A subset of Level 2 controls (for brevity - in a real app, all 110 would be included)
  {
    id: "AC.2.005",
    domain: "Access Control",
    title: "Provide privacy and security notices consistent with applicable CUI rules.",
    description: "Provide privacy and security notices consistent with applicable CUI rules.",
    level: 2
  },
  {
    id: "AC.2.006",
    domain: "Access Control",
    title: "Limit use of portable storage devices on external systems.",
    description: "Limit use of portable storage devices on external systems.",
    level: 2
  },
  {
    id: "AC.2.007",
    domain: "Access Control",
    title: "Employ the principle of least privilege, including for specific security functions and privileged accounts.",
    description: "Use the principle of least privilege.",
    level: 2
  },
  {
    id: "AC.2.008",
    domain: "Access Control",
    title: "Use non-privileged accounts or roles when accessing nonsecurity functions.",
    description: "Use non-privileged accounts or roles when accessing nonsecurity functions.",
    level: 2
  },
  {
    id: "AC.2.009",
    domain: "Access Control",
    title: "Limit unsuccessful logon attempts.",
    description: "Limit unsuccessful logon attempts.",
    level: 2
  },
  {
    id: "AC.2.010",
    domain: "Access Control",
    title: "Use session lock with pattern-hiding displays to prevent access and viewing of data after a period of inactivity.",
    description: "Use session lock with pattern-hiding displays.",
    level: 2
  },
  {
    id: "AC.2.011",
    domain: "Access Control",
    title: "Terminate (automatically) a user session after a defined condition.",
    description: "Terminate user sessions after defined conditions.",
    level: 2
  },
  {
    id: "AC.2.013",
    domain: "Access Control",
    title: "Monitor and control remote access sessions.",
    description: "Monitor and control remote access sessions.",
    level: 2
  },
  {
    id: "AC.2.015",
    domain: "Access Control",
    title: "Route remote access via managed access control points.",
    description: "Route remote access via managed access control points.",
    level: 2
  },
  {
    id: "AC.2.016",
    domain: "Access Control",
    title: "Control the flow of CUI in accordance with approved authorizations.",
    description: "Control the flow of CUI.",
    level: 2
  },
  // Add more Level 2 controls here - in a real app, all 110 would be included
];

// Get controls based on level
export const getControlsByLevel = (level: 1 | 2): Control[] => {
  return level === 1 ? level1Controls : level2Controls;
};

// Get a specific control by ID
export const getControlById = (id: string): Control | undefined => {
  return [...level1Controls, ...level2Controls].find(control => control.id === id);
};

// Group controls by domain
export const groupControlsByDomain = (controls: Control[]): Record<string, Control[]> => {
  return controls.reduce((grouped, control) => {
    if (!grouped[control.domain]) {
      grouped[control.domain] = [];
    }
    grouped[control.domain].push(control);
    return grouped;
  }, {} as Record<string, Control[]>);
};
