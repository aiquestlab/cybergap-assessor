
import React, { useState } from 'react';
import { Control, AssessmentResult } from '@/utils/cmmcData';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ControlAssessmentProps {
  control: Control;
  result: AssessmentResult;
  onUpdate: (result: AssessmentResult) => void;
  index: number;
  total: number;
}

const ControlAssessment: React.FC<ControlAssessmentProps> = ({
  control,
  result,
  onUpdate,
  index,
  total
}) => {
  const [expanded, setExpanded] = useState(false);
  const [localResult, setLocalResult] = useState<AssessmentResult>(result);
  
  const handleStatusChange = (status: AssessmentResult['status']) => {
    const updatedResult = { ...localResult, status };
    setLocalResult(updatedResult);
    onUpdate(updatedResult);
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedResult = { ...localResult, notes: e.target.value };
    setLocalResult(updatedResult);
  };
  
  const handleEvidenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedResult = { ...localResult, evidence: e.target.value };
    setLocalResult(updatedResult);
  };
  
  const handleSave = () => {
    onUpdate(localResult);
    setExpanded(false);
  };
  
  const getStatusColor = (status: AssessmentResult['status']) => {
    switch (status) {
      case 'compliant':
        return 'bg-cyber-green/10 text-cyber-green border-cyber-green/30';
      case 'non-compliant':
        return 'bg-cyber-red/10 text-cyber-red border-cyber-red/30';
      case 'partially-compliant':
        return 'bg-cyber-yellow/10 text-cyber-yellow border-cyber-yellow/30';
      case 'not-applicable':
        return 'bg-gray-200 text-gray-600 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };
  
  return (
    <Card className={cn(
      'mb-6 transition-all duration-300',
      expanded ? 'shadow-lg' : 'shadow-sm hover:shadow-md',
      localResult.status !== 'non-compliant' ? 'border-l-4' : '',
      localResult.status === 'compliant' ? 'border-l-cyber-green' : '',
      localResult.status === 'partially-compliant' ? 'border-l-cyber-yellow' : '',
      localResult.status === 'not-applicable' ? 'border-l-gray-400' : ''
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs bg-cyber-blue/10 text-cyber-blue rounded-full px-2 py-0.5">
                {control.id}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                {control.domain}
              </span>
              <span className="text-xs text-gray-500">
                {index} of {total}
              </span>
            </div>
            <CardTitle className="text-lg font-semibold">{control.title}</CardTitle>
          </div>
          
          <div className={cn(
            'px-3 py-1 rounded-full text-xs font-medium',
            getStatusColor(localResult.status)
          )}>
            {localResult.status === 'compliant' && 'Compliant'}
            {localResult.status === 'non-compliant' && 'Non-Compliant'}
            {localResult.status === 'partially-compliant' && 'Partially Compliant'}
            {localResult.status === 'not-applicable' && 'Not Applicable'}
          </div>
        </div>
        <CardDescription className="mt-2">
          {control.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!expanded ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setExpanded(true)}
            className="mt-2"
          >
            Assess Control
          </Button>
        ) : (
          <div className="animate-fade-in space-y-6 mt-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Compliance Status</h4>
              <RadioGroup 
                value={localResult.status} 
                onValueChange={(value) => handleStatusChange(value as AssessmentResult['status'])}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compliant" id="compliant" />
                  <Label htmlFor="compliant" className="flex items-center">
                    <Check size={16} className="mr-1 text-cyber-green" />
                    <span>Compliant</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partially-compliant" id="partially-compliant" />
                  <Label htmlFor="partially-compliant">Partially Compliant</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-compliant" id="non-compliant" />
                  <Label htmlFor="non-compliant" className="flex items-center">
                    <X size={16} className="mr-1 text-cyber-red" />
                    <span>Non-Compliant</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-applicable" id="not-applicable" />
                  <Label htmlFor="not-applicable">Not Applicable</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="evidence" className="font-medium text-sm">
                Evidence (Optional)
              </Label>
              <Textarea
                id="evidence"
                placeholder="Describe the evidence that supports your assessment..."
                value={localResult.evidence || ''}
                onChange={handleEvidenceChange}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes" className="font-medium text-sm">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes or context..."
                value={localResult.notes || ''}
                onChange={handleNotesChange}
                className="min-h-[80px]"
              />
            </div>
          </div>
        )}
      </CardContent>
      
      {expanded && (
        <CardFooter className="flex justify-end gap-2 pt-2 pb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setExpanded(false)}
          >
            Cancel
          </Button>
          <Button 
            size="sm" 
            onClick={handleSave}
            className="bg-cyber-blue hover:bg-cyber-blue/90"
          >
            Save Assessment
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ControlAssessment;
