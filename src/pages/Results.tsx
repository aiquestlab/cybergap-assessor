
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultsSummary from '@/components/ResultsSummary';
import { Assessment } from '@/utils/cmmcData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getControlsByLevel, getControlById } from '@/utils/cmmcData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { getControlWeight } from '@/utils/sprsWeights';
import { generatePDFReport } from '@/utils/pdfGenerator';
import { FileDown, FileText } from 'lucide-react';

const Results = () => {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [activeTab, setActiveTab] = useState('summary');
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedAssessment = sessionStorage.getItem('assessment');
    
    if (!storedAssessment) {
      navigate('/');
      toast.error('No assessment data found. Please complete an assessment first.');
      return;
    }
    
    try {
      const parsedAssessment = JSON.parse(storedAssessment) as Assessment;
      setAssessment(parsedAssessment);
    } catch (error) {
      console.error('Error parsing assessment:', error);
      navigate('/');
      toast.error('Error loading assessment data.');
    }
  }, [navigate]);
  
  const handleStartNew = () => {
    navigate('/');
  };
  
  const handleExport = () => {
    if (!assessment) return;
    
    const reportDate = new Date().toLocaleDateString();
    const reportContent = `
CMMC ASSESSMENT REPORT
=====================

Organization: ${assessment.organizationName}
Assessment Date: ${reportDate}
CMMC Level: ${assessment.level}
Total Controls: ${assessment.results.length}

SPRS SCORE SUMMARY
-----------------
Overall Score: ${Math.round((assessment.results.filter(r => r.status === 'compliant').length / 
                 assessment.results.filter(r => r.status !== 'not-applicable').length) * 100)}%

COMPLIANCE STATUS
----------------
Compliant: ${assessment.results.filter(r => r.status === 'compliant').length}
Partially Compliant: ${assessment.results.filter(r => r.status === 'partially-compliant').length}
Non-Compliant: ${assessment.results.filter(r => r.status === 'non-compliant').length}
Not Applicable: ${assessment.results.filter(r => r.status === 'not-applicable').length}

CONTROL DETAILS
--------------
${assessment.results.map(result => {
  const control = getControlById(result.controlId);
  const weight = getControlWeight(result.controlId);
  return `
${result.controlId} - ${control?.title}
Weight: ${weight}
Status: ${result.status}
${result.notes ? `Notes: ${result.notes}` : ''}
${result.evidence ? `Evidence: ${result.evidence}` : ''}
`;
}).join('\n')}
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CMMC_Assessment_${assessment.organizationName.replace(/\s+/g, '_')}_${reportDate.replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Text report downloaded successfully');
  };
  
  const handleExportPdf = () => {
    if (!assessment) return;
    
    try {
      generatePDFReport(assessment);
      toast.success('PDF report generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error generating PDF report');
    }
  };
  
  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 rounded-full bg-cyber-blue/40 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }
  
  const controls = getControlsByLevel(assessment.level);
  const domainGroups = controls.reduce((acc, control) => {
    if (!acc[control.domain]) {
      acc[control.domain] = [];
    }
    acc[control.domain].push(control);
    return acc;
  }, {} as Record<string, typeof controls>);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-cyber-green/10 text-cyber-green border-cyber-green/30';
      case 'non-compliant': return 'bg-cyber-red/10 text-cyber-red border-cyber-red/30';
      case 'partially-compliant': return 'bg-cyber-yellow/10 text-cyber-yellow border-cyber-yellow/30';
      case 'not-applicable': return 'bg-gray-200 text-gray-600 border-gray-300';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant': return <Badge variant="outline" className="bg-cyber-green/10 text-cyber-green border-cyber-green/30">Compliant</Badge>;
      case 'non-compliant': return <Badge variant="outline" className="bg-cyber-red/10 text-cyber-red border-cyber-red/30">Non-Compliant</Badge>;
      case 'partially-compliant': return <Badge variant="outline" className="bg-cyber-yellow/10 text-cyber-yellow border-cyber-yellow/30">Partially</Badge>;
      case 'not-applicable': return <Badge variant="outline" className="bg-gray-200 text-gray-600 border-gray-300">N/A</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="bg-white shadow-sm border-b">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1">Assessment Results</h1>
              <p className="text-gray-600">
                {assessment.organizationName} • CMMC Level {assessment.level} • {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <Button variant="outline" onClick={handleStartNew}>
                Start New Assessment
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center mb-4">
            <TabsList className="px-1">
              <TabsTrigger value="summary" className="px-6">Summary</TabsTrigger>
              <TabsTrigger value="details" className="px-6">Control Details</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="summary" className="animate-fade-in">
            <ResultsSummary
              results={assessment.results}
              level={assessment.level}
              organizationName={assessment.organizationName}
              onExport={handleExport}
              onExportPdf={handleExportPdf}
            />
          </TabsContent>
          
          <TabsContent value="details" className="animate-fade-in space-y-6">
            {Object.entries(domainGroups).map(([domain, domainControls]) => (
              <Card key={domain} className="mb-6 overflow-hidden">
                <CardHeader className="pb-3 bg-gray-50">
                  <CardTitle className="text-lg font-medium">{domain}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {domainControls.map(control => {
                      const result = assessment.results.find(r => r.controlId === control.id);
                      
                      if (!result) return null;
                      
                      const weight = getControlWeight(control.id);
                      
                      return (
                        <div key={control.id} className="py-4 px-6 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div className="flex-1 mb-2 md:mb-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs bg-cyber-blue/10 text-cyber-blue rounded-full px-2 py-0.5">
                                  {control.id}
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                                  Weight: {weight}
                                </span>
                              </div>
                              <h4 className="font-medium">{control.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(result.status)}
                            </div>
                          </div>
                          {(result.notes || result.evidence) && (
                            <div className="mt-2 pt-2 border-t text-sm">
                              {result.notes && (
                                <div className="mt-1">
                                  <span className="font-medium">Notes:</span> {result.notes}
                                </div>
                              )}
                              {result.evidence && (
                                <div className="mt-1">
                                  <span className="font-medium">Evidence:</span> {result.evidence}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-center mt-8 gap-4">
              <Button 
                onClick={handleExport} 
                size="lg"
                variant="outline"
                className="shadow-md btn-hover-effect"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Export Text Report
              </Button>
              
              <Button 
                onClick={handleExportPdf} 
                size="lg"
                className="bg-cyber-blue hover:bg-cyber-blue/90 shadow-lg btn-hover-effect"
              >
                <FileText className="mr-2 h-4 w-4" />
                Export PDF Report
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </motion.div>
  );
};

export default Results;
