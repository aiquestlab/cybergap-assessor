import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentResult } from '@/utils/cmmcData';
import { getComplianceStats, calculateSPRSScore, generateRecommendations, getSPRSScoreBreakdown } from '@/utils/assessmentUtils';
import ProgressBar from './ProgressBar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FileDown, FileText } from 'lucide-react';
import ComplianceDonutChart from './ComplianceDonutChart';

interface ResultsSummaryProps {
  results: AssessmentResult[];
  level: 1 | 2;
  organizationName: string;
  onExport?: () => void;
  onExportPdf?: () => void;
  onStatusSelect?: (status: AssessmentResult['status']) => void;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  results,
  level,
  organizationName,
  onExport,
  onExportPdf,
  onStatusSelect,
}) => {
  const stats = getComplianceStats(results);
  const sprsScore = calculateSPRSScore(results);
  const sprsBreakdown = getSPRSScoreBreakdown(results);
  const recommendations = generateRecommendations(results);

  // Determine SPRS score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-cyber-green';
    if (score >= 50) return 'text-cyber-yellow';
    if (score >= 0) return 'text-cyber-yellow/80';
    return 'text-cyber-red';
  };
  
  // Calculate grade based on SPRS score
  const getGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    if (score >= 0) return 'F';
    return 'F-';
  };
  
  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto">
      {/* NEW: Compliance Donut Chart section */}
      <Card className="mb-2 glass-card px-0 py-2">
        <CardHeader className="pb-0">
          <CardTitle>Compliance Breakdown</CardTitle>
          <CardDescription>A visual summary of your compliance status</CardDescription>
        </CardHeader>
        <CardContent>
          <ComplianceDonutChart
            compliant={stats.compliant}
            partiallyCompliant={stats.partiallyCompliant}
            nonCompliant={stats.nonCompliant}
            notApplicable={stats.notApplicable}
            onStatusSelect={onStatusSelect}
          />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* SPRS Score Card */}
        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>SPRS Score</CardTitle>
            <CardDescription>Supplier Performance Risk System</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className={cn(
                'text-6xl font-bold mb-2',
                getScoreColor(sprsScore)
              )}>
                {sprsScore}
              </div>
              <div className={cn(
                'text-lg font-semibold',
                getScoreColor(sprsScore)
              )}>
                Grade: {getGrade(sprsScore)}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                CMMC Level {level} Assessment
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Range: -203 to 110
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Compliance Summary Card */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle>Compliance Summary</CardTitle>
            <CardDescription>{organizationName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 py-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Compliant</span>
                  <span className="text-sm text-gray-500">{stats.compliant} of {stats.applicableControls}</span>
                </div>
                <ProgressBar 
                  value={stats.compliant} 
                  max={stats.applicableControls} 
                  showLabel={false} 
                  color="success" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Partially Compliant</span>
                  <span className="text-sm text-gray-500">{stats.partiallyCompliant} of {stats.applicableControls}</span>
                </div>
                <ProgressBar 
                  value={stats.partiallyCompliant} 
                  max={stats.applicableControls} 
                  showLabel={false} 
                  color="warning" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Non-Compliant</span>
                  <span className="text-sm text-gray-500">{stats.nonCompliant} of {stats.applicableControls}</span>
                </div>
                <ProgressBar 
                  value={stats.nonCompliant} 
                  max={stats.applicableControls} 
                  showLabel={false} 
                  color="danger" 
                />
              </div>
              
              <div className="pt-2">
                <div className="text-xs text-gray-500">
                  Total controls: {stats.totalControls} ({stats.notApplicable} marked as N/A)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* NEW: SPRS Score Breakdown Card */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle>SPRS Score Breakdown</CardTitle>
            <CardDescription>Top contributing factors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 py-2">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium">Max Score</span>
                <span className="font-bold text-lg">{sprsBreakdown.maxScore}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium">Total Deductions</span>
                <span className="font-bold text-lg text-cyber-red">-{sprsBreakdown.totalDeductions}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t">
                <span className="text-sm font-bold">Final Score</span>
                <span className={cn('font-bold text-xl', getScoreColor(sprsScore))}>{sprsBreakdown.finalScore}</span>
              </div>

              <div className="pt-3">
                <h4 className="text-sm font-semibold mb-2">Top 5 Deductions:</h4>
                <ul className="space-y-2 text-xs">
                  {sprsBreakdown.topDeductions.length > 0 ? (
                    sprsBreakdown.topDeductions.map(item => (
                      <li key={item.controlId} className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{item.controlId}</span>
                          <span className="truncate" title={item.title}>{item.title}</span>
                        </div>
                        <span className="font-semibold text-cyber-red ml-2">-{item.deduction}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No deductions. Perfect score!</li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recommendations Card */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>Based on your assessment results</CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="min-w-4 h-4 rounded-full bg-cyber-blue mt-1.5" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Export Buttons */}
      <div className="flex justify-center mt-8 gap-4">
        <Button 
          onClick={onExport} 
          size="lg"
          variant="outline"
          className="shadow-md btn-hover-effect"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Export Text Report
        </Button>
        
        <Button 
          onClick={onExportPdf} 
          size="lg"
          className="bg-cyber-blue hover:bg-cyber-blue/90 shadow-lg btn-hover-effect"
        >
          <FileText className="mr-2 h-4 w-4" />
          Export PDF Report
        </Button>
      </div>
    </div>
  );
};

export default ResultsSummary;
