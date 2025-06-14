
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AssessmentHelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  {
    title: "1. Review each control",
    desc: "Tab through each CMMC domain and review the listed controls. Click 'Assess Control' to begin."
  },
  {
    title: "2. Set a status",
    desc: "Mark each control as Compliant, Partially Compliant, Non-Compliant, or Not Applicable."
  },
  {
    title: "3. Add evidence/notes",
    desc: "Optionally provide supporting evidence or notes for your assessment decision. Evidence strengthens compliance."
  },
  {
    title: "4. Progress tracking",
    desc: "Your progress is autosaved in your browser. Return later and resume where you left off."
  },
  {
    title: "5. Complete and export",
    desc: "Click 'Complete Assessment' when done to review and export a report of results."
  }
];

const AssessmentHelpDialog: React.FC<AssessmentHelpDialogProps> = ({ open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>How to use the Assessment</DialogTitle>
        <DialogDescription>Step-by-step guidance for your CMMC assessment</DialogDescription>
      </DialogHeader>
      <ol className="space-y-4 px-2 py-2">
        {steps.map((step, idx) => (
          <li key={idx} className="flex gap-2 items-start">
            <span className="font-semibold min-w-8">{step.title}</span>
            <span>{step.desc}</span>
          </li>
        ))}
      </ol>
      <DialogFooter>
        <Button onClick={() => onOpenChange(false)} className="w-full">
          Got it
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default AssessmentHelpDialog;
