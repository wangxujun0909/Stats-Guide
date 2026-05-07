import type { Question, QuestionId } from '../../data/types';
import { OptionButton } from './OptionButton';

interface QuestionCardProps {
  question: Question;
  onSelect: (questionId: QuestionId, value: string) => void;
}

export function QuestionCard({ question, onSelect }: QuestionCardProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 leading-snug">{question.text}</h2>
        {question.helpText && (
          <p className="mt-1 text-sm text-gray-500">{question.helpText}</p>
        )}
      </div>
      <div className="space-y-2">
        {question.options.map((option) => (
          <OptionButton
            key={option.value}
            option={option}
            onClick={() => onSelect(question.id, option.value)}
          />
        ))}
      </div>
    </div>
  );
}
