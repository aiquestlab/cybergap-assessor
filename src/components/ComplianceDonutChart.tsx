
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type ComplianceDonutChartProps = {
  compliant: number;
  partiallyCompliant: number;
  nonCompliant: number;
  notApplicable: number;
};

const COLORS = [
  "#22c55e", // Compliant (cyber-green)
  "#eab308", // Partially (cyber-yellow)
  "#ef4444", // Non (cyber-red)
  "#9ca3af"  // N/A (gray-400)
];

const LABELS = [
  "Compliant",
  "Partially Compliant",
  "Non-Compliant",
  "Not Applicable",
];

const ComplianceDonutChart: React.FC<ComplianceDonutChartProps> = ({
  compliant,
  partiallyCompliant,
  nonCompliant,
  notApplicable,
}) => {
  const data = [
    { name: LABELS[0], value: compliant },
    { name: LABELS[1], value: partiallyCompliant },
    { name: LABELS[2], value: nonCompliant },
    { name: LABELS[3], value: notApplicable },
  ].filter(d => d.value > 0);

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
            label={({ name, percent }) =>
              percent > 0.08 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
            }
          >
            {data.map((entry, idx) => (
              <Cell
                key={`cell-${idx}`}
                fill={COLORS[idx]}
                stroke="#fff"
                strokeWidth={2}
                className="transition-all"
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 flex gap-4 flex-wrap justify-center text-xs">
        {data.map((entry, idx) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span style={{ background: COLORS[idx] }} className="inline-block w-3 h-3 rounded-full"></span>
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceDonutChart;
