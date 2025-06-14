
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { AssessmentResult } from "@/utils/cmmcData";

type ComplianceDonutChartProps = {
  compliant: number;
  partiallyCompliant: number;
  nonCompliant: number;
  notApplicable: number;
  onStatusSelect?: (status: AssessmentResult['status']) => void;
};

const COLORS = [
  "#22c55e", // Compliant (cyber-green)
  "#eab308", // Partially (cyber-yellow)
  "#ef4444", // Non (cyber-red)
  "#9ca3af"  // N/A (gray-400)
];

const LABELS_AND_STATUSES: {label: string, status: AssessmentResult['status']}[] = [
  { label: "Compliant", status: 'compliant' },
  { label: "Partially Compliant", status: 'partially-compliant' },
  { label: "Non-Compliant", status: 'non-compliant' },
  { label: "Not Applicable", status: 'not-applicable' },
];

const ComplianceDonutChart: React.FC<ComplianceDonutChartProps> = ({
  compliant,
  partiallyCompliant,
  nonCompliant,
  notApplicable,
  onStatusSelect
}) => {
  const data = [
    { name: LABELS_AND_STATUSES[0].label, value: compliant, status: LABELS_AND_STATUSES[0].status },
    { name: LABELS_AND_STATUSES[1].label, value: partiallyCompliant, status: LABELS_AND_STATUSES[1].status },
    { name: LABELS_AND_STATUSES[2].label, value: nonCompliant, status: LABELS_AND_STATUSES[2].status },
    { name: LABELS_AND_STATUSES[3].label, value: notApplicable, status: LABELS_AND_STATUSES[3].status },
  ].filter(d => d.value > 0);

  const handlePieClick = (data: any) => {
    if (onStatusSelect && data.status) {
      onStatusSelect(data.status);
    }
  };

  return (
    <div className="w-full h-64 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={225}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            onClick={onStatusSelect ? handlePieClick : undefined}
            label={({ name, percent }) =>
              percent > 0.08 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
            }
          >
            {data.map((entry, idx) => {
              const originalIndex = LABELS_AND_STATUSES.findIndex(l => l.label === entry.name);
              return (
                <Cell
                  key={`cell-${idx}`}
                  fill={COLORS[originalIndex]}
                  stroke="#fff"
                  strokeWidth={2}
                  className={onStatusSelect ? "cursor-pointer transition-all hover:opacity-80" : "transition-all"}
                />
              )
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 flex gap-4 flex-wrap justify-center text-xs">
        {data.map((entry) => {
          const originalIndex = LABELS_AND_STATUSES.findIndex(l => l.label === entry.name);
          return (
            <div key={entry.name} className="flex items-center gap-2">
              <span style={{ background: COLORS[originalIndex] }} className="inline-block w-3 h-3 rounded-full"></span>
              {entry.name}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ComplianceDonutChart;
