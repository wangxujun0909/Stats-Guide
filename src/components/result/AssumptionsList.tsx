interface AssumptionsListProps {
  assumptions: string[];
}

export function AssumptionsList({ assumptions }: AssumptionsListProps) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
        Key Assumptions to Check
      </h4>
      <ul className="space-y-2">
        {assumptions.map((assumption, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
            <div className="mt-0.5 w-4 h-4 rounded border border-gray-300 flex-shrink-0" />
            <span>{assumption}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
