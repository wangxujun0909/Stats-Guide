import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard } from '../hooks/useWizard';
import { resolveMethod } from '../engine/resolver';
import { QuestionCard } from '../components/wizard/QuestionCard';
import { ProgressBar } from '../components/wizard/ProgressBar';
import { BackButton } from '../components/wizard/BackButton';
import type { QuestionId } from '../data/types';

const RESULT_KEY = 'statguide_result';

export function WizardPage() {
  const navigate = useNavigate();
  const [state, actions] = useWizard();

  useEffect(() => {
    if (state.isComplete) {
      const result = resolveMethod(state.answers);
      sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
      navigate('/result');
    }
  }, [state.isComplete, state.answers, navigate]);

  if (!state.currentQuestion) return null;

  const isFirstStep = state.currentStep === 0;

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
      <div className="space-y-8">
        <div className="space-y-4">
          <BackButton
            onClick={isFirstStep ? () => navigate('/') : actions.back}
            disabled={false}
          />
          <ProgressBar current={state.currentStep} total={state.totalSteps} />
        </div>

        <QuestionCard
          question={state.currentQuestion}
          onSelect={(questionId: QuestionId, value: string) => actions.answer(questionId, value)}
        />
      </div>
    </main>
  );
}
