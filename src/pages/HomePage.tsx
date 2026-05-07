import { useNavigate } from 'react-router-dom';

const features = [
  { label: 'Describe or summarize data' },
  { label: 'Compare groups' },
  { label: 'Examine relationships' },
  { label: 'Predict outcomes' },
  { label: 'Validate a scale or construct' },
  { label: 'Analyze change over time' },
];

export function HomePage() {
  const navigate = useNavigate();
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-14">
      <div className="text-center space-y-7">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-navy-600 leading-tight tracking-tight">
            Statistical Method<br />Advisor
          </h1>
          <p className="text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            Answer a few questions about your data and research goal. We'll recommend the right statistical method — with assumptions, software instructions, and alternatives.
          </p>
        </div>

        <button
          onClick={() => navigate('/wizard')}
          className="inline-flex items-center gap-2 bg-navy-600 hover:bg-navy-700 active:bg-navy-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
        >
          Get Started
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <p className="text-xs text-gray-400">No account needed · No data uploaded · Completely free</p>
      </div>

      <div className="mt-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 text-center mb-4">
          Covers research goals including
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-tc-orange flex-shrink-0" />
              <span className="text-sm text-gray-700">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 border border-gray-200 rounded-xl px-5 py-4 bg-gray-50">
        <p className="text-sm text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-700">Note:</span> This tool provides general guidance for common education and social science research designs. For complex or high-stakes analyses, always discuss your methodology with your advisor or a statistical consultant.
        </p>
      </div>
    </main>
  );
}
