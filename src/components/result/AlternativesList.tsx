import type { MethodRef } from '../../data/types';
import { methods } from '../../data/methods';

interface AlternativesListProps {
  alternatives: MethodRef[];
}

export function AlternativesList({ alternatives }: AlternativesListProps) {
  if (alternatives.length === 0) return null;

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
        Alternative Methods
      </h4>
      <ul className="space-y-2">
        {alternatives.map((alt) => {
          const method = methods[alt.id];
          if (!method) return null;
          return (
            <li key={alt.id} className="text-sm">
              <span className="font-medium text-gray-800">{method.name}</span>
              <span className="text-gray-500"> — {alt.note}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
