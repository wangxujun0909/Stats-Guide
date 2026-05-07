import type { Answers, ResolutionResult } from '../data/types';
import { rules } from '../data/decisionTree';
import { questions } from '../data/decisionTree';
import { methods } from '../data/methods';

/** Returns the human-readable label for an answer value */
function labelFor(questionId: string, value: string): string {
  const question = questions.find((q) => q.id === questionId);
  if (!question) return value;
  const option = question.options.find((o) => o.value === value);
  return option?.label ?? value;
}

/** Interpolates {key} placeholders in a template with human-readable answer labels */
function interpolate(template: string, answers: Answers): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const val = answers[key as keyof Answers];
    return val ? labelFor(key, val) : key;
  });
}

/** Returns true if ALL specified conditions in a rule match the given answers.
 *  If a rule specifies a condition for a question, that question must be answered
 *  with a matching value. Unanswered questions that a rule doesn't mention are wildcards. */
function ruleMatches(conditions: DecisionRule['conditions'], answers: Answers): boolean {
  for (const [key, expected] of Object.entries(conditions)) {
    const actual = answers[key as keyof Answers];
    if (actual === undefined) return false; // rule requires this answer — it's absent
    if (Array.isArray(expected)) {
      if (!expected.includes(actual)) return false;
    } else {
      if (actual !== expected) return false;
    }
  }
  return true;
}

type DecisionRule = (typeof rules)[number];

export function resolveMethod(answers: Answers): ResolutionResult {
  const hasNotSure = Object.values(answers).includes('not-sure');

  // Filter to matching rules, then sort by priority descending
  const matching = rules
    .filter((rule) => ruleMatches(rule.conditions, answers))
    .sort((a, b) => b.priority - a.priority);

  const winner = matching[0];

  if (!winner) {
    return {
      primary: methods['consult-advisor'],
      rationale: 'Your combination of answers could not be matched to a specific method. Please consult your advisor.',
      hasNotSure,
    };
  }

  const primary = methods[winner.methodId] ?? methods['consult-advisor'];
  const supporting = winner.supportingMethodId ? methods[winner.supportingMethodId] : undefined;
  const rationale = interpolate(winner.rationaleTemplate, answers);

  return { primary, supporting, rationale, hasNotSure };
}
