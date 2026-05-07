import { useState } from 'react';
import type { SoftwareHint } from '../../data/types';

interface SoftwareHintsProps {
  hints: SoftwareHint[];
}

export function SoftwareHints({ hints }: SoftwareHintsProps) {
  // Filter out Stata
  const filtered = hints.filter((h) => h.tool !== 'Stata');
  const [active, setActive] = useState<string>(filtered[0]?.tool ?? 'SPSS');
  const current = filtered.find((h) => h.tool === active);

  if (filtered.length === 0) return null;

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
        How to Run It
      </h4>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50">
          {filtered.map((h) => (
            <button
              key={h.tool}
              onClick={() => setActive(h.tool)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                active === h.tool
                  ? 'text-navy-600 bg-white border-b-2 border-navy-600 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {h.tool}
            </button>
          ))}
        </div>
        <div className="px-4 py-3 text-sm text-gray-700 font-mono leading-relaxed bg-white">
          {current?.hint}
        </div>
      </div>
    </div>
  );
}
