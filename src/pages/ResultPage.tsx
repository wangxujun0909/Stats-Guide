import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ResolutionResult } from '../data/types';
import { RecommendationCard } from '../components/result/RecommendationCard';

const RESULT_KEY = 'statguide_result';

export function ResultPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<ResolutionResult | null>(null);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(RESULT_KEY);
    if (raw) {
      try {
        setResult(JSON.parse(raw) as ResolutionResult);
      } catch {
        setEmpty(true);
      }
    } else {
      setEmpty(true);
    }
  }, []);

  if (empty) {
    return (
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16 text-center space-y-4">
        <p className="text-gray-500">Please complete the questionnaire first.</p>
        <button
          onClick={() => navigate('/wizard')}
          className="text-navy-600 hover:underline text-sm font-medium"
        >
          Start the wizard →
        </button>
      </main>
    );
  }

  if (!result) return null;

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your Recommendation</h1>
        <button
          onClick={() => { sessionStorage.removeItem('statguide_answers'); navigate('/wizard'); }}
          className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Start Over
        </button>
      </div>

      {result.hasNotSure && (
        <div className="bg-tc-orange-light border border-tc-orange-border rounded-xl px-4 py-3 flex gap-3">
          <svg className="w-5 h-5 text-tc-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">You selected "not sure" for your outcome variable type.</span> The recommendation below is a conservative starting point — we suggest confirming your variable type with your advisor before proceeding.
          </p>
        </div>
      )}

      <RecommendationCard
        method={result.primary}
        rationale={result.rationale}
        isPrimary={true}
      />

      {result.supporting && (
        <RecommendationCard
          method={result.supporting}
          isPrimary={false}
        />
      )}

      <div className="text-center pt-4">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Back to home
        </button>
      </div>
    </main>
  );
}
