
import React from "react";
import { Check, RefreshCcw } from "lucide-react";

export interface AssessmentAutoSaveIndicatorProps {
  status: "idle" | "saving" | "saved";
}

const LABELS: Record<string, string> = {
  idle: "Idle",
  saving: "Saving...",
  saved: "Autosaved",
};

/** Tiny animated indicator for assessment autosave status. */
const AssessmentAutoSaveIndicator: React.FC<AssessmentAutoSaveIndicatorProps> = ({
  status
}) => {
  return (
    <div className="flex items-center ml-2 text-xs text-gray-400 min-w-20" aria-live="polite">
      {status === "saving" ? (
        <RefreshCcw className="animate-spin mr-1" size={14} />
      ) : (
        <Check className="text-cyber-green mr-1" size={14} />
      )}
      <span>
        {LABELS[status]}
      </span>
    </div>
  );
};

export default AssessmentAutoSaveIndicator;
