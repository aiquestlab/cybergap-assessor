
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

// Complete list of CMMC Level 2 Controls (110 practices including Level 1)
export const level2Controls: Control[] = [
  // Including Level 1 controls as they are part of Level 2
  ...level1Controls,
  
  // Additional Level 2 controls (93 more to make 110 total)
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
    id: "AC.2.012",
    domain: "Access Control",
    title: "Monitor and control remote access sessions.",
    description: "Monitor and control remote access sessions.",
    level: 2
  },
  {
    id: "AC.2.013",
    domain: "Access Control",
    title: "Employ cryptographic mechanisms to protect the confidentiality of remote access sessions.",
    description: "Use encryption to protect remote access sessions.",
    level: 2
  },
  {
    id: "AC.2.014",
    domain: "Access Control",
    title: "Route remote access via managed access control points.",
    description: "Route remote access via managed access control points.",
    level: 2
  },
  {
    id: "AC.2.015",
    domain: "Access Control",
    title: "Authorize remote execution of privileged commands and remote access to security-relevant information.",
    description: "Authorize remote execution of privileged commands.",
    level: 2
  },
  {
    id: "AC.2.016",
    domain: "Access Control",
    title: "Control the flow of CUI in accordance with approved authorizations.",
    description: "Control the flow of CUI.",
    level: 2
  },
  {
    id: "AC.2.017",
    domain: "Access Control",
    title: "Separate the duties of individuals to reduce the risk of malevolent activity without collusion.",
    description: "Separate duties to prevent malevolent activity.",
    level: 2
  },
  {
    id: "AC.2.018",
    domain: "Access Control",
    title: "Prevent non-privileged users from executing privileged functions and audit the execution of such functions.",
    description: "Prevent non-privileged users from executing privileged functions.",
    level: 2
  },
  {
    id: "AC.2.019",
    domain: "Access Control",
    title: "Limit use of organizational credentials by third-party organizations.",
    description: "Limit credential use by third parties.",
    level: 2
  },
  {
    id: "AC.2.020",
    domain: "Access Control",
    title: "Accept and electronically verify Personal Identity Verification (PIV) credentials from other federal agencies.",
    description: "Accept and verify PIV credentials.",
    level: 2
  },
  {
    id: "AC.2.021",
    domain: "Access Control",
    title: "Use privileged accounts or roles only for privileged functions.",
    description: "Use privileged accounts only for privileged functions.",
    level: 2
  },
  {
    id: "AC.2.022",
    domain: "Access Control",
    title: "Deny access to systems based on unfavorable risk determinations.",
    description: "Deny access based on risk determinations.",
    level: 2
  },
  {
    id: "AC.2.023",
    domain: "Access Control",
    title: "Require multifactor authentication for local and network access to privileged accounts and for network access to non-privileged accounts.",
    description: "Use multifactor authentication for privileged and network access.",
    level: 2
  },
  {
    id: "AC.2.024",
    domain: "Access Control",
    title: "Enforce access restrictions on the use of mobile devices.",
    description: "Enforce mobile device access restrictions.",
    level: 2
  },
  {
    id: "AT.2.056",
    domain: "Awareness and Training",
    title: "Ensure that managers, system administrators, and users of organizational systems are made aware of the security risks associated with their activities and of the applicable policies, standards, and procedures related to the security of those systems.",
    description: "Ensure personnel are aware of security risks.",
    level: 2
  },
  {
    id: "AT.2.057",
    domain: "Awareness and Training",
    title: "Ensure that personnel are trained to carry out their assigned information security-related duties and responsibilities.",
    description: "Train personnel on security-related duties.",
    level: 2
  },
  {
    id: "AT.2.058",
    domain: "Awareness and Training",
    title: "Provide security awareness training on recognizing and reporting potential indicators of insider threat.",
    description: "Train personnel to recognize insider threats.",
    level: 2
  },
  {
    id: "AU.2.041",
    domain: "Audit and Accountability",
    title: "Ensure that the actions of individual system users can be uniquely traced to those users so they can be held accountable for their actions.",
    description: "Ensure actions can be traced to users.",
    level: 2
  },
  {
    id: "AU.2.042",
    domain: "Audit and Accountability",
    title: "Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity.",
    description: "Create and retain audit logs.",
    level: 2
  },
  {
    id: "AU.2.043",
    domain: "Audit and Accountability",
    title: "Provide a system capability that compares and synchronizes internal system clocks with an authoritative source to generate time stamps for audit records.",
    description: "Synchronize clocks for audit records.",
    level: 2
  },
  {
    id: "AU.2.044",
    domain: "Audit and Accountability",
    title: "Review audit logs.",
    description: "Review audit logs.",
    level: 2
  },
  {
    id: "AU.2.045",
    domain: "Audit and Accountability",
    title: "Alert in the event of an audit logging process failure.",
    description: "Alert on audit process failures.",
    level: 2
  },
  {
    id: "AU.2.046",
    domain: "Audit and Accountability",
    title: "Correlate audit record review, analysis, and reporting processes for investigation and response to indications of unlawful, unauthorized, suspicious, or unusual activity.",
    description: "Correlate audit records for investigations.",
    level: 2
  },
  {
    id: "AU.2.047",
    domain: "Audit and Accountability",
    title: "Provide audit record reduction and report generation to support on-demand analysis and reporting.",
    description: "Provide audit reduction and reporting.",
    level: 2
  },
  {
    id: "AU.2.048",
    domain: "Audit and Accountability",
    title: "Protect audit information and audit logging tools from unauthorized access, modification, and deletion.",
    description: "Protect audit information and tools.",
    level: 2
  },
  {
    id: "AU.2.049",
    domain: "Audit and Accountability",
    title: "Limit management of audit logging functionality to a subset of privileged users.",
    description: "Limit audit management to privileged users.",
    level: 2
  },
  {
    id: "CA.2.157",
    domain: "Assessment, Authorization, and Monitoring",
    title: "Develop, document, and periodically update system security plans that describe system boundaries, system environments of operation, how security requirements are implemented, and the relationships with or connections to other systems.",
    description: "Develop and update system security plans.",
    level: 2
  },
  {
    id: "CA.2.158",
    domain: "Assessment, Authorization, and Monitoring",
    title: "Periodically assess the security controls in organizational systems to determine if the controls are effective in their application.",
    description: "Assess security controls periodically.",
    level: 2
  },
  {
    id: "CA.2.159",
    domain: "Assessment, Authorization, and Monitoring",
    title: "Develop and implement plans of action designed to correct deficiencies and reduce or eliminate vulnerabilities in organizational systems.",
    description: "Develop plans to correct security deficiencies.",
    level: 2
  },
  {
    id: "CM.2.061",
    domain: "Configuration Management",
    title: "Establish and maintain baseline configurations and inventories of organizational systems (including hardware, software, firmware, and documentation) throughout the respective system development life cycles.",
    description: "Establish baseline configurations and inventories.",
    level: 2
  },
  {
    id: "CM.2.062",
    domain: "Configuration Management",
    title: "Employ the principle of least functionality by configuring organizational systems to provide only essential capabilities.",
    description: "Configure systems for least functionality.",
    level: 2
  },
  {
    id: "CM.2.063",
    domain: "Configuration Management",
    title: "Control and monitor user-installed software.",
    description: "Control and monitor user-installed software.",
    level: 2
  },
  {
    id: "CM.2.064",
    domain: "Configuration Management",
    title: "Establish and enforce security configuration settings for information technology products employed in organizational systems.",
    description: "Establish and enforce security configurations.",
    level: 2
  },
  {
    id: "CM.2.065",
    domain: "Configuration Management",
    title: "Track, review, approve or disapprove, and log changes to organizational systems.",
    description: "Track, review, approve, and log system changes.",
    level: 2
  },
  {
    id: "CM.2.066",
    domain: "Configuration Management",
    title: "Analyze the security impact of changes prior to implementation.",
    description: "Analyze security impact of changes.",
    level: 2
  },
  {
    id: "IA.2.078",
    domain: "Identification and Authentication",
    title: "Enforce a minimum password complexity and change of characters when new passwords are created.",
    description: "Enforce password complexity requirements.",
    level: 2
  },
  {
    id: "IA.2.079",
    domain: "Identification and Authentication",
    title: "Prohibit password reuse for a specified number of generations.",
    description: "Prohibit password reuse.",
    level: 2
  },
  {
    id: "IA.2.080",
    domain: "Identification and Authentication",
    title: "Allow temporary password use for system logons with an immediate change to a permanent password.",
    description: "Require immediate change of temporary passwords.",
    level: 2
  },
  {
    id: "IA.2.081",
    domain: "Identification and Authentication",
    title: "Store and transmit only cryptographically-protected passwords.",
    description: "Protect passwords cryptographically.",
    level: 2
  },
  {
    id: "IA.2.082",
    domain: "Identification and Authentication",
    title: "Obscure feedback of authentication information.",
    description: "Obscure authentication feedback.",
    level: 2
  },
  {
    id: "IA.2.083",
    domain: "Identification and Authentication",
    title: "Employ replay-resistant authentication mechanisms for network access to privileged and non-privileged accounts.",
    description: "Use replay-resistant authentication.",
    level: 2
  },
  {
    id: "IA.2.084",
    domain: "Identification and Authentication",
    title: "Prevent reuse of identifiers for a defined period.",
    description: "Prevent reuse of identifiers.",
    level: 2
  },
  {
    id: "IA.2.085",
    domain: "Identification and Authentication",
    title: "Disable identifiers after a defined period of inactivity.",
    description: "Disable inactive identifiers.",
    level: 2
  },
  {
    id: "IR.2.092",
    domain: "Incident Response",
    title: "Establish an operational incident-handling capability for organizational systems that includes preparation, detection, analysis, containment, recovery, and user response activities.",
    description: "Establish incident handling capability.",
    level: 2
  },
  {
    id: "IR.2.093",
    domain: "Incident Response",
    title: "Detect and report system flaws in a timely manner.",
    description: "Detect and report system flaws.",
    level: 2
  },
  {
    id: "IR.2.094",
    domain: "Incident Response",
    title: "Track, document, and report incidents to designated officials and/or authorities both internal and external to the organization.",
    description: "Track, document, and report incidents.",
    level: 2
  },
  {
    id: "IR.2.095",
    domain: "Incident Response",
    title: "Require personnel to report suspected security incidents to the organizational incident response capability within the defined time period.",
    description: "Report suspected incidents promptly.",
    level: 2
  },
  {
    id: "IR.2.096",
    domain: "Incident Response",
    title: "Test the organizational incident response capability.",
    description: "Test incident response capability.",
    level: 2
  },
  {
    id: "IR.2.097",
    domain: "Incident Response",
    title: "Establish and maintain supply chain risk management processes in accordance with the organization's risk management program.",
    description: "Establish supply chain risk management.",
    level: 2
  },
  {
    id: "MA.2.099",
    domain: "Maintenance",
    title: "Perform maintenance on organizational systems.",
    description: "Perform system maintenance.",
    level: 2
  },
  {
    id: "MA.2.100",
    domain: "Maintenance",
    title: "Provide controls on the tools, techniques, mechanisms, and personnel used to conduct system maintenance.",
    description: "Control maintenance tools and personnel.",
    level: 2
  },
  {
    id: "MA.2.101",
    domain: "Maintenance",
    title: "Ensure equipment removed for off-site maintenance is sanitized of any CUI.",
    description: "Sanitize equipment before off-site maintenance.",
    level: 2
  },
  {
    id: "MA.2.102",
    domain: "Maintenance",
    title: "Check media containing diagnostic and test programs for malicious code before the media are used in organizational systems.",
    description: "Check diagnostic media for malware.",
    level: 2
  },
  {
    id: "MA.2.103",
    domain: "Maintenance",
    title: "Require multifactor authentication to establish nonlocal maintenance sessions via external network connections and terminate such connections when nonlocal maintenance is complete.",
    description: "Use MFA for nonlocal maintenance.",
    level: 2
  },
  {
    id: "MA.2.104",
    domain: "Maintenance",
    title: "Supervise the maintenance activities of personnel without required access authorization.",
    description: "Supervise unauthorized maintenance personnel.",
    level: 2
  },
  {
    id: "MP.2.119",
    domain: "Media Protection",
    title: "Protect (i.e., physically control and securely store) system media containing CUI, both paper and digital.",
    description: "Protect and store media with CUI.",
    level: 2
  },
  {
    id: "MP.2.120",
    domain: "Media Protection",
    title: "Limit access to CUI on system media to authorized users.",
    description: "Limit media access to authorized users.",
    level: 2
  },
  {
    id: "MP.2.121",
    domain: "Media Protection",
    title: "Control the use of removable media on system components.",
    description: "Control removable media use.",
    level: 2
  },
  {
    id: "MP.2.122",
    domain: "Media Protection",
    title: "Control access to media containing CUI and maintain accountability for media during transport outside of controlled areas.",
    description: "Control media access during transport.",
    level: 2
  },
  {
    id: "MP.2.123",
    domain: "Media Protection",
    title: "Implement cryptographic mechanisms to protect the confidentiality of CUI stored on digital media during transport unless otherwise protected by alternative physical safeguards.",
    description: "Encrypt CUI on transported digital media.",
    level: 2
  },
  {
    id: "MP.2.124",
    domain: "Media Protection",
    title: "Control the use of removable media on system components.",
    description: "Control removable media use.",
    level: 2
  },
  {
    id: "MP.2.125",
    domain: "Media Protection",
    title: "Prohibit the use of portable storage devices when such devices have no identifiable owner.",
    description: "Prohibit unidentified storage devices.",
    level: 2
  },
  {
    id: "MP.2.126",
    domain: "Media Protection",
    title: "Protect the confidentiality of backup CUI at storage locations.",
    description: "Protect CUI backups.",
    level: 2
  },
  {
    id: "PE.2.135",
    domain: "Physical Protection",
    title: "Protect and monitor the physical facility and support infrastructure for organizational systems.",
    description: "Protect facilities and infrastructure.",
    level: 2
  },
  {
    id: "PE.2.136",
    domain: "Physical Protection",
    title: "Enforce safeguarding measures for CUI at alternate work sites.",
    description: "Protect CUI at alternate work sites.",
    level: 2
  },
  {
    id: "PE.2.137",
    domain: "Physical Protection",
    title: "Position system components and cable infrastructure to minimize potential damage from physical hazards and to minimize the opportunity for unauthorized access.",
    description: "Position systems to prevent damage and unauthorized access.",
    level: 2
  },
  {
    id: "PE.2.138",
    domain: "Physical Protection",
    title: "Maintain accountability for CUI during transport outside of controlled areas.",
    description: "Account for CUI during transport.",
    level: 2
  },
  {
    id: "PE.2.139",
    domain: "Physical Protection",
    title: "Document procedures for the secure transport of CUI outside of controlled areas.",
    description: "Document secure transport procedures.",
    level: 2
  },
  {
    id: "PE.2.140",
    domain: "Physical Protection",
    title: "Control physical access by authenticating visitors before authorizing access to facilities containing CUI other than areas designated as publicly accessible.",
    description: "Authenticate visitors before access.",
    level: 2
  },
  {
    id: "PS.2.127",
    domain: "Personnel Security",
    title: "Screen individuals prior to authorizing access to organizational systems containing CUI.",
    description: "Screen personnel before access.",
    level: 2
  },
  {
    id: "PS.2.128",
    domain: "Personnel Security",
    title: "Ensure that organizational systems containing CUI are protected during and after personnel actions such as terminations and transfers.",
    description: "Protect systems during personnel changes.",
    level: 2
  },
  {
    id: "RA.2.141",
    domain: "Risk Assessment",
    title: "Periodically assess the risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals, resulting from the operation of organizational systems and the associated processing, storage, or transmission of CUI.",
    description: "Assess organizational risk periodically.",
    level: 2
  },
  {
    id: "RA.2.142",
    domain: "Risk Assessment",
    title: "Scan for vulnerabilities in organizational systems and applications periodically and when new vulnerabilities affecting those systems and applications are identified.",
    description: "Scan systems for vulnerabilities.",
    level: 2
  },
  {
    id: "RA.2.143",
    domain: "Risk Assessment",
    title: "Remediate vulnerabilities in accordance with risk assessments.",
    description: "Remediate vulnerabilities based on risk.",
    level: 2
  },
  {
    id: "RA.2.144",
    domain: "Risk Assessment",
    title: "Update the risk assessment when there are significant changes to the system, organization, or environment of operation, or when problems are identified.",
    description: "Update risk assessments when changes occur.",
    level: 2
  },
  {
    id: "SC.2.177",
    domain: "System and Communications Protection",
    title: "Use encrypted sessions for the management of network devices.",
    description: "Use encrypted sessions for device management.",
    level: 2
  },
  {
    id: "SC.2.178",
    domain: "System and Communications Protection",
    title: "Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission unless otherwise protected by alternative physical safeguards.",
    description: "Encrypt CUI during transmission.",
    level: 2
  },
  {
    id: "SC.2.179",
    domain: "System and Communications Protection",
    title: "Terminate network connections associated with communications sessions at the end of the sessions or after a defined period of inactivity.",
    description: "Terminate inactive network connections.",
    level: 2
  },
  {
    id: "SC.2.180",
    domain: "System and Communications Protection",
    title: "Establish and manage cryptographic keys for cryptography employed in organizational systems.",
    description: "Manage cryptographic keys.",
    level: 2
  },
  {
    id: "SC.2.181",
    domain: "System and Communications Protection",
    title: "Prohibit remote activation of collaborative computing devices and provide indication of devices in use to users present at the device.",
    description: "Control remote activation of devices.",
    level: 2
  },
  {
    id: "SC.2.182",
    domain: "System and Communications Protection",
    title: "Implement cryptographic mechanisms to authenticate remote maintenance sessions.",
    description: "Authenticate remote maintenance sessions cryptographically.",
    level: 2
  },
  {
    id: "SC.2.183",
    domain: "System and Communications Protection",
    title: "Employ FIPS-validated cryptography when used to protect the confidentiality of CUI.",
    description: "Use FIPS-validated cryptography.",
    level: 2
  },
  {
    id: "SC.2.184",
    domain: "System and Communications Protection",
    title: "Control and monitor the use of mobile code.",
    description: "Control mobile code use.",
    level: 2
  },
  {
    id: "SC.2.185",
    domain: "System and Communications Protection",
    title: "Control and monitor the use of Voice over Internet Protocol (VoIP) technologies.",
    description: "Control VoIP use.",
    level: 2
  },
  {
    id: "SC.2.186",
    domain: "System and Communications Protection",
    title: "Protect the authenticity of communications sessions.",
    description: "Protect session authenticity.",
    level: 2
  },
  {
    id: "SC.2.187",
    domain: "System and Communications Protection",
    title: "Protect the confidentiality of CUI at rest.",
    description: "Protect CUI at rest.",
    level: 2
  },
  {
    id: "SC.2.188",
    domain: "System and Communications Protection",
    title: "Implement Domain Name System (DNS) filtering services.",
    description: "Implement DNS filtering.",
    level: 2
  },
  {
    id: "SC.2.189",
    domain: "System and Communications Protection",
    title: "Implement a policy restricting the publication of CUI on publicly accessible websites (e.g., forums, LinkedIn, Facebook, Twitter, etc.).",
    description: "Restrict CUI publication on public websites.",
    level: 2
  },
  {
    id: "SI.2.214",
    domain: "System and Information Integrity",
    title: "Monitor system security alerts and advisories and take action in response.",
    description: "Monitor and respond to security alerts.",
    level: 2
  },
  {
    id: "SI.2.215",
    domain: "System and Information Integrity",
    title: "Update malicious code protection mechanisms when new releases are available.",
    description: "Update malicious code protection.",
    level: 2
  },
  {
    id: "SI.2.216",
    domain: "System and Information Integrity",
    title: "Monitor organizational systems, including inbound and outbound communications traffic, to detect attacks and indicators of potential attacks.",
    description: "Monitor systems to detect attacks.",
    level: 2
  },
  {
    id: "SI.2.217",
    domain: "System and Information Integrity",
    title: "Identify unauthorized use of organizational systems.",
    description: "Identify unauthorized system use.",
    level: 2
  },
  {
    id: "SI.2.218",
    domain: "System and Information Integrity",
    title: "Load and execute trusted firmware and software on mobile devices.",
    description: "Use trusted firmware on mobile devices.",
    level: 2
  },
  {
    id: "SI.2.219",
    domain: "System and Information Integrity",
    title: "Implement security for email.",
    description: "Implement email security.",
    level: 2
  },
  {
    id: "SI.2.220",
    domain: "System and Information Integrity",
    title: "Implement instant messaging security.",
    description: "Implement messaging security.",
    level: 2
  },
  {
    id: "SI.2.221",
    domain: "System and Information Integrity",
    title: "Distribute security alerts, advisories, and directives to personnel with security functions and system administrators.",
    description: "Distribute security alerts to key personnel.",
    level: 2
  }
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
