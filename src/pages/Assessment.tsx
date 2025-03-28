
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ArrowUp, X, Check, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getControlsByLevel, 
  groupControlsByDomain, 
  Control, 
  Assessment as AssessmentType
} from '@/utils/cmmcData';
import { createAssessment, updateAssessmentResult } from '@/utils/assessmentUtils';
import ControlAssessment from '@/components/ControlAssessment';
import ProgressBar from '@/components/ProgressBar';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import CMMCDataImporter from '@/components/CMMCDataImporter';

const Assessment = () => {
  const { level } = useParams<{ level: string }>();
  const cmmcLevel = parseInt(level || '1') as 1 | 2;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('');
  const [organizationName, setOrganizationName] = useState<string>('');
  const [assessment, setAssessment] = useState<AssessmentType | null>(null);
  const [controls, setControls] = useState<Control[]>([]);
  const [domainGroups, setDomainGroups] = useState<Record<string, Control[]>>({});
  const [domains, setDomains] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (level !== '1' && level !== '2') {
      navigate('/');
      toast.error('Invalid CMMC level selected');
    }
  }, [level, navigate]);
  
  useEffect(() => {
    const levelControls = getControlsByLevel(cmmcLevel);
    setControls(levelControls);
    
    const grouped = groupControlsByDomain(levelControls);
    setDomainGroups(grouped);
    setDomains(Object.keys(grouped).sort());
    
    if (domains.length > 0 && !activeTab) {
      setActiveTab(domains[0]);
    }
    
    const controlIds = levelControls.map(control => control.id);
    const newAssessment = createAssessment(cmmcLevel, organizationName, controlIds);
    setAssessment(newAssessment);
  }, [cmmcLevel]);
  
  useEffect(() => {
    if (domains.length > 0 && !activeTab) {
      setActiveTab(domains[0]);
    }
  }, [domains, activeTab]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleOrganizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizationName(e.target.value);
    if (assessment) {
      setAssessment({ ...assessment, organizationName: e.target.value });
    }
  };
  
  const handleUpdateResult = (controlId: string, result: any) => {
    if (!assessment) return;
    
    const updatedAssessment = {
      ...assessment,
      results: assessment.results.map(r => 
        r.controlId === controlId ? { ...result } : r
      )
    };
    
    setAssessment(updatedAssessment);
  };
  
  const getCompletionPercentage = () => {
    if (!assessment) return 0;
    
    const totalControls = assessment.results.length;
    const assessedControls = assessment.results.filter(
      r => r.status !== 'non-compliant' || r.evidence || r.notes
    ).length;
    
    return Math.round((assessedControls / totalControls) * 100);
  };
  
  const handleSubmit = () => {
    if (!assessment) return;
    
    if (!organizationName.trim()) {
      toast.error('Please enter your organization name');
      return;
    }
    
    sessionStorage.setItem('assessment', JSON.stringify(assessment));
    navigate('/results');
    toast.success('Assessment completed successfully!');
  };
  
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleImportControls = (importedControls: Control[]) => {
    console.log('Imported controls:', importedControls);
    
    toast({
      description: `Imported ${importedControls.length} CMMC controls.`,
    });
  };
  
  if (!assessment || domains.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 rounded-full bg-cyber-blue/40 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50" ref={topRef}>
      <header className="sticky top-0 z-10 bg-white shadow-sm border-b">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <X size={16} className="mr-1" />
              Cancel
            </Button>
            <div>
              <h1 className="text-xl font-semibold">CMMC Level {cmmcLevel} Assessment</h1>
              <p className="text-sm text-gray-500">{controls.length} controls</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <FileText size={16} className="mr-2" />
                  Save Progress
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="text-sm">
                  <h3 className="font-medium mb-2">Assessment Progress</h3>
                  <p className="text-gray-600 mb-4">Your progress is automatically saved in your browser.</p>
                  <div className="mb-2">
                    <ProgressBar value={getCompletionPercentage()} max={100} />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button 
              size="sm" 
              onClick={handleSubmit}
              className="bg-cyber-blue hover:bg-cyber-blue/90"
            >
              <Check size={16} className="mr-2" />
              Complete Assessment
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <Card className="mb-8 glass-card animate-scale-in">
          <CardHeader className="pb-3">
            <CardTitle>Organization Information</CardTitle>
            <CardDescription>Enter your organization details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="organization-name" className="text-sm font-medium">
                Organization Name
              </label>
              <Input
                id="organization-name"
                placeholder="Enter your organization name"
                value={organizationName}
                onChange={handleOrganizationChange}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Controls Assessment</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="relative">
              <div className="overflow-x-auto pb-2">
                <TabsList className="inline-flex min-w-full p-1">
                  {domains.map(domain => (
                    <TabsTrigger
                      key={domain}
                      value={domain}
                      className={cn(
                        "py-2",
                        activeTab === domain ? "text-cyber-blue" : "text-gray-600"
                      )}
                    >
                      {domain}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            
            {domains.map(domain => (
              <TabsContent key={domain} value={domain} className="pt-4 animate-fade-in">
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{domain}</h3>
                    <span className="text-sm text-gray-500">
                      {domainGroups[domain].length} controls
                    </span>
                  </div>
                  <Separator className="mt-2" />
                </div>
                
                <div className="space-y-4">
                  {domainGroups[domain].map((control, index) => (
                    <ControlAssessment
                      key={control.id}
                      control={control}
                      result={assessment.results.find(r => r.controlId === control.id)!}
                      onUpdate={(result) => handleUpdateResult(control.id, result)}
                      index={index + 1}
                      total={domainGroups[domain].length}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <div className="mb-6">
        <CMMCDataImporter onImport={handleImportControls} />
      </div>
      
      {scrollY > 300 && (
        <Button
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-cyber-blue/90 hover:bg-cyber-blue shadow-lg"
          onClick={scrollToTop}
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </div>
  );
};

export default Assessment;
