import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
        <img
          src="/tc-logo.png"
          alt="Teachers College, Columbia University — Graduate Student Life & Development"
          className="h-16 w-auto"
        />
        {!isHome && (
          <button
            onClick={() => { sessionStorage.removeItem('statguide_answers'); navigate('/'); }}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </button>
        )}
      </div>
    </header>
  );
}
