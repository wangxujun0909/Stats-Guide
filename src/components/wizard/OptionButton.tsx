import type { Option } from '../../data/types';

interface OptionButtonProps {
  option: Option;
  onClick: () => void;
}

export function OptionButton({ option, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-5 py-4 rounded-xl border border-gray-200 bg-white hover:border-navy-600 hover:bg-navy-50 active:bg-navy-100 transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-navy-600 flex-shrink-0 transition-colors" />
        <div>
          <div className="font-medium text-gray-900 text-sm leading-snug">{option.label}</div>
          {option.description && (
            <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{option.description}</div>
          )}
        </div>
      </div>
    </button>
  );
}
