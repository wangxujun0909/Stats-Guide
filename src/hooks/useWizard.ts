import { useState, useCallback } from 'react';
import type { Answers, QuestionId } from '../data/types';
import { computeQuestionSequence, questions } from '../data/decisionTree';

const STORAGE_KEY = 'statguide_answers';

function loadAnswers(): Answers {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Answers) : {};
  } catch {
    return {};
  }
}

function saveAnswers(answers: Answers) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export interface WizardState {
  currentStep: number;
  answers: Answers;
  questionOrder: QuestionId[];
  currentQuestion: (typeof questions)[number] | undefined;
  isComplete: boolean;
  totalSteps: number;
}

export interface WizardActions {
  answer: (questionId: QuestionId, value: string) => void;
  back: () => void;
  reset: () => void;
}

export function useWizard(): [WizardState, WizardActions] {
  const [answers, setAnswers] = useState<Answers>(loadAnswers);

  const questionOrder = computeQuestionSequence(answers);
  const currentStep = questionOrder.findIndex((id) => answers[id] === undefined);
  const isComplete = currentStep === -1 && questionOrder.length > 0 && Object.keys(answers).length >= 1;

  const currentQuestionId = currentStep >= 0 ? questionOrder[currentStep] : undefined;
  const currentQuestion = currentQuestionId
    ? questions.find((q) => q.id === currentQuestionId)
    : undefined;

  const answer = useCallback((questionId: QuestionId, value: string) => {
    setAnswers((prev) => {
      // When re-answering an earlier question, clear all subsequent answers
      // to avoid stale state from a previous path
      const newAnswers: Answers = {};
      const seq = computeQuestionSequence(prev);
      const idx = seq.indexOf(questionId);
      for (let i = 0; i < idx; i++) {
        const id = seq[i];
        if (prev[id] !== undefined) newAnswers[id] = prev[id];
      }
      newAnswers[questionId] = value;
      saveAnswers(newAnswers);
      return newAnswers;
    });
  }, []);

  const back = useCallback(() => {
    setAnswers((prev) => {
      const seq = computeQuestionSequence(prev);
      // Find the last answered question and remove it
      const lastAnswered = [...seq].reverse().find((id) => prev[id] !== undefined);
      if (!lastAnswered) return prev;
      const next = { ...prev };
      delete next[lastAnswered];
      saveAnswers(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAnswers({});
  }, []);

  const state: WizardState = {
    currentStep: Math.max(0, currentStep),
    answers,
    questionOrder,
    currentQuestion,
    isComplete,
    totalSteps: questionOrder.length,
  };

  return [state, { answer, back, reset }];
}
