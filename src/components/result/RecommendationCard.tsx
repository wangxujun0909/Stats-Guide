import type { StatMethod } from '../../data/types';
import { AssumptionsList } from './AssumptionsList';
import { AlternativesList } from './AlternativesList';
import { SoftwareHints } from './SoftwareHints';

interface RecommendationCardProps {
  method: StatMethod;
  rationale?: string;
  isPrimary: boolean;
}

export function RecommendationCard({ method, rationale, isPrimary }: RecommendationCardProps) {
  return (
    <div className={`rounded-2xl border p-6 space-y-5 ${
      isPrimary
        ? 'border-navy-200 bg-navy-50/30 shadow-sm'
        : 'border-gray-200 bg-white'
    }`}>
      {isPrimary && (
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-tc-orange bg-tc-orange-light border border-tc-orange-border px-2.5 py-1 rounded-full">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Recommended Method
        </div>
      )}
      {!isPrimary && (
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Also Consider
        </div>
      )}

      <div>
        <h3 className={`font-bold leading-tight ${isPrimary ? 'text-2xl text-navy-600' : 'text-lg text-gray-800'}`}>
          {method.name}
        </h3>
        <p className="mt-1 text-gray-600 text-sm leading-relaxed">{method.oneLiner}</p>
      </div>

      {rationale && isPrimary && (
        <div className="bg-white border border-navy-100 rounded-xl px-4 py-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Why this method
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">{rationale}</p>
        </div>
      )}

      <AssumptionsList assumptions={method.assumptions} />

      {method.alternatives.length > 0 && (
        <AlternativesList alternatives={method.alternatives} />
      )}

      {method.software.length > 0 && (
        <SoftwareHints hints={method.software} />
      )}
    </div>
  );
}
