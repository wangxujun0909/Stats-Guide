export type QuestionId =
  | 'researchGoal'
  | 'outcomeType'
  | 'predictorCount'
  | 'dataStructure'
  | 'sampleSize'
  | 'missingData';

export interface Option {
  value: string;
  label: string;
  description?: string;
}

export interface Question {
  id: QuestionId;
  text: string;
  helpText?: string;
  options: Option[];
}

export type Answers = Partial<Record<QuestionId, string>>;

export type MethodTag =
  | 'descriptive'
  | 'comparison'
  | 'nonparametric'
  | 'correlation'
  | 'regression'
  | 'scale'
  | 'multilevel'
  | 'structural'
  | 'repeated';

export interface MethodRef {
  id: string;
  note: string;
}

export interface SoftwareHint {
  tool: 'SPSS' | 'R' | 'Stata';
  hint: string;
}

export interface StatMethod {
  id: string;
  name: string;
  oneLiner: string;
  assumptions: string[];
  alternatives: MethodRef[];
  software: SoftwareHint[];
  tags: MethodTag[];
}

export interface DecisionRule {
  id: string;
  conditions: Partial<Record<QuestionId, string | string[]>>;
  methodId: string;
  supportingMethodId?: string;
  priority: number;
  rationaleTemplate: string;
}

export interface ResolutionResult {
  primary: StatMethod;
  supporting?: StatMethod;
  rationale: string;
  hasNotSure: boolean;
}
