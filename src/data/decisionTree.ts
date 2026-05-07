import type { Question, DecisionRule, QuestionId, Answers } from './types';

export const questions: Question[] = [
  {
    id: 'researchGoal',
    text: 'What is the primary goal of your analysis?',
    helpText: 'Choose the option that best describes what you want to find out.',
    options: [
      { value: 'describe', label: 'Describe or summarize my data', description: 'Report frequencies, averages, or distributions — no hypothesis testing' },
      { value: 'compare', label: 'Compare groups', description: 'e.g., Do boys and girls differ in test scores? Do three programs produce different outcomes?' },
      { value: 'correlate', label: 'Examine relationships between variables', description: 'e.g., Is study time related to GPA? Are two scale scores associated?' },
      { value: 'predict', label: 'Predict an outcome', description: 'e.g., Which factors predict graduation? What predicts student engagement scores?' },
      { value: 'explore-structure', label: 'Explore or validate a scale/construct', description: 'e.g., Do my survey items form coherent factors? Is my scale reliable?' },
      { value: 'change-over-time', label: 'Examine change over time', description: 'e.g., Did scores improve from pre- to post-test? How did attitudes shift across three surveys?' },
    ],
  },
  {
    id: 'outcomeType',
    text: 'What type is your main outcome variable (dependent variable)?',
    helpText: 'This is the variable you are trying to explain or predict.',
    options: [
      { value: 'continuous', label: 'Continuous', description: 'e.g., test score, GPA, age, income — measured on a scale with many possible values' },
      { value: 'binary', label: 'Binary / Dichotomous', description: 'e.g., pass/fail, graduated/not, yes/no — exactly two categories' },
      { value: 'categorical', label: 'Categorical (3 or more groups)', description: 'e.g., school type, grade level, major — unordered categories' },
      { value: 'ordinal', label: 'Ordinal / Likert scale', description: 'e.g., 1–5 agreement scale, letter grades (A/B/C) — ordered but unequal intervals' },
    ],
  },
  {
    id: 'predictorCount',
    text: 'How many predictor or grouping variables do you have?',
    helpText: 'Predictors are the variables you use to explain or predict your outcome (independent variables, group membership, demographics, etc.).',
    options: [
      { value: 'none', label: 'None — I have only one variable', description: 'You are summarizing or describing a single variable' },
      { value: '1', label: 'One predictor or grouping variable', description: 'e.g., comparing two schools, correlating two variables' },
      { value: '2+', label: 'Two or more predictors', description: 'e.g., predicting outcomes from multiple background variables' },
    ],
  },
  {
    id: 'dataStructure',
    text: 'Which best describes the structure of your data?',
    options: [
      { value: 'independent', label: 'Independent groups', description: 'Each participant appears only once; groups do not overlap' },
      { value: 'repeated', label: 'Repeated measures / Paired', description: 'Same participants measured at multiple time points or under multiple conditions' },
      { value: 'nested', label: 'Nested (hierarchical)', description: 'e.g., students within classrooms, classrooms within schools, employees within organizations' },
      { value: 'single-group', label: 'Single group', description: 'All participants come from one group — no comparison group' },
    ],
  },
  {
    id: 'sampleSize',
    text: 'Approximately how many participants are in your dataset?',
    options: [
      { value: '<30', label: 'Fewer than 30' },
      { value: '30-100', label: '30–100' },
      { value: '100-500', label: '100–500' },
      { value: '500+', label: 'More than 500' },
    ],
  },
  {
    id: 'missingData',
    text: 'Does your dataset have missing values?',
    options: [
      { value: 'no', label: 'No — data is complete' },
      { value: 'yes', label: 'Yes — some participants have missing responses', description: 'This will be noted in your recommendation' },
    ],
  },
];

export const rules: DecisionRule[] = [
  // ─── DESCRIBE ────────────────────────────────────────────────────────────────
  {
    id: 'describe-continuous',
    conditions: { researchGoal: 'describe', outcomeType: 'continuous' },
    methodId: 'descriptive-stats',
    priority: 5,
    rationaleTemplate: 'Your goal is to describe a continuous variable. Descriptive statistics (mean, median, SD, range) are the standard starting point.',
  },
  {
    id: 'describe-categorical',
    conditions: { researchGoal: 'describe', outcomeType: ['binary', 'categorical', 'ordinal'] },
    methodId: 'frequency-tables',
    priority: 5,
    rationaleTemplate: 'Your goal is to describe a categorical or ordinal variable. Frequency tables and bar charts are the clearest way to present this.',
  },
  {
    id: 'describe-fallback',
    conditions: { researchGoal: 'describe' },
    methodId: 'descriptive-stats',
    priority: 1,
    rationaleTemplate: 'Your goal is to describe your data. Descriptive statistics provide the foundational summary you need.',
  },

  // ─── COMPARE ─────────────────────────────────────────────────────────────────
  // Nested data always → HLM (overrides everything)
  {
    id: 'compare-nested',
    conditions: { researchGoal: 'compare', dataStructure: 'nested' },
    methodId: 'hlm',
    priority: 15,
    rationaleTemplate: 'Your data has a nested structure. Hierarchical Linear Modeling accounts for the non-independence of observations within groups, which is essential to avoid inflated Type I error.',
  },
  // Two groups, continuous, independent, adequate n
  {
    id: 'compare-2groups-continuous-large',
    conditions: { researchGoal: 'compare', outcomeType: 'continuous', predictorCount: '1', dataStructure: 'independent', sampleSize: ['30-100', '100-500', '500+'] },
    methodId: 'independent-t-test',
    priority: 11,
    rationaleTemplate: 'You are comparing a continuous outcome between independent groups with adequate sample size. The independent samples t-test is the standard parametric choice.',
  },
  // Two groups, continuous, independent, small n
  {
    id: 'compare-2groups-continuous-small',
    conditions: { researchGoal: 'compare', outcomeType: ['continuous', 'ordinal'], predictorCount: '1', dataStructure: 'independent', sampleSize: '<30' },
    methodId: 'mann-whitney-u',
    priority: 11,
    rationaleTemplate: 'With a small sample, normality is harder to verify, so a nonparametric test is safer. Mann-Whitney U does not assume a normal distribution.',
  },
  // Two groups, ordinal, independent, adequate n
  {
    id: 'compare-2groups-ordinal-large',
    conditions: { researchGoal: 'compare', outcomeType: 'ordinal', predictorCount: '1', dataStructure: 'independent', sampleSize: ['30-100', '100-500', '500+'] },
    methodId: 'mann-whitney-u',
    priority: 10,
    rationaleTemplate: 'Your outcome is ordinal (e.g., a Likert scale). Mann-Whitney U respects the ordinal nature of the data without assuming equal intervals.',
  },
  // Three+ groups, continuous, independent
  {
    id: 'compare-3groups-continuous',
    conditions: { researchGoal: 'compare', outcomeType: 'continuous', predictorCount: '2+', dataStructure: 'independent' },
    methodId: 'one-way-anova',
    supportingMethodId: 'two-way-anova',
    priority: 10,
    rationaleTemplate: 'With multiple groups and a continuous outcome, ANOVA extends the t-test logic. With two grouping variables, Two-Way ANOVA also tests their interaction.',
  },
  // Three+ groups, ordinal/non-normal
  {
    id: 'compare-3groups-ordinal',
    conditions: { researchGoal: 'compare', outcomeType: 'ordinal', predictorCount: '2+', dataStructure: 'independent' },
    methodId: 'kruskal-wallis',
    priority: 10,
    rationaleTemplate: 'With an ordinal outcome across multiple groups, Kruskal-Wallis is the nonparametric equivalent of one-way ANOVA.',
  },
  // Categorical outcome — chi-square
  {
    id: 'compare-categorical',
    conditions: { researchGoal: 'compare', outcomeType: ['binary', 'categorical'] },
    methodId: 'chi-square',
    priority: 9,
    rationaleTemplate: 'When comparing groups on a categorical outcome, Chi-Square tests whether the distribution of categories differs significantly across groups.',
  },
  // Repeated measures
  {
    id: 'compare-repeated-continuous',
    conditions: { researchGoal: 'compare', outcomeType: 'continuous', dataStructure: 'repeated' },
    methodId: 'repeated-measures-anova',
    priority: 12,
    rationaleTemplate: 'Your data involves repeated measurements of the same participants. Repeated Measures ANOVA accounts for within-subject correlation across occasions.',
  },
  {
    id: 'compare-repeated-ordinal',
    conditions: { researchGoal: 'compare', outcomeType: 'ordinal', dataStructure: 'repeated' },
    methodId: 'wilcoxon',
    priority: 10,
    rationaleTemplate: 'With ordinal data and repeated measures, the Wilcoxon Signed-Rank Test is the nonparametric approach for paired comparisons.',
  },
  // MANOVA — multiple continuous outcomes
  {
    id: 'compare-manova',
    conditions: { researchGoal: 'compare', outcomeType: 'continuous', predictorCount: '2+' },
    methodId: 'manova',
    priority: 8,
    rationaleTemplate: 'When comparing groups on multiple continuous outcomes simultaneously, MANOVA controls the familywise error rate better than running separate ANOVAs.',
  },
  // Fallback compare
  {
    id: 'compare-fallback',
    conditions: { researchGoal: 'compare' },
    methodId: 'one-way-anova',
    priority: 1,
    rationaleTemplate: 'For group comparisons with a continuous outcome, ANOVA is the standard parametric approach.',
  },

  // ─── CORRELATE ───────────────────────────────────────────────────────────────
  {
    id: 'correlate-continuous',
    conditions: { researchGoal: 'correlate', outcomeType: 'continuous' },
    methodId: 'pearson-correlation',
    priority: 8,
    rationaleTemplate: 'Pearson correlation measures the strength and direction of the linear relationship between two continuous variables.',
  },
  {
    id: 'correlate-ordinal',
    conditions: { researchGoal: 'correlate', outcomeType: 'ordinal' },
    methodId: 'spearman-correlation',
    priority: 8,
    rationaleTemplate: 'Spearman correlation is appropriate for ordinal variables or when the normality assumption is not met.',
  },
  {
    id: 'correlate-categorical',
    conditions: { researchGoal: 'correlate', outcomeType: ['binary', 'categorical'] },
    methodId: 'chi-square',
    supportingMethodId: 'binary-logistic-regression',
    priority: 8,
    rationaleTemplate: 'For categorical outcomes, Chi-Square tests the association between two categorical variables. Logistic regression is a good follow-up if you want to control for other variables.',
  },
  {
    id: 'correlate-fallback',
    conditions: { researchGoal: 'correlate' },
    methodId: 'pearson-correlation',
    priority: 1,
    rationaleTemplate: 'Correlation analysis examines the relationship between two variables.',
  },

  // ─── PREDICT ─────────────────────────────────────────────────────────────────
  // Nested data → HLM
  {
    id: 'predict-nested',
    conditions: { researchGoal: 'predict', dataStructure: 'nested' },
    methodId: 'hlm',
    priority: 15,
    rationaleTemplate: 'With nested data, Hierarchical Linear Modeling is essential. Ignoring nesting structure inflates Type I error and produces biased standard errors.',
  },
  // Continuous outcome
  {
    id: 'predict-continuous-single',
    conditions: { researchGoal: 'predict', outcomeType: 'continuous', predictorCount: '1' },
    methodId: 'simple-linear-regression',
    priority: 10,
    rationaleTemplate: 'Simple linear regression predicts a continuous outcome from a single predictor, providing both a significance test and the effect size (R²).',
  },
  {
    id: 'predict-continuous-multiple',
    conditions: { researchGoal: 'predict', outcomeType: 'continuous', predictorCount: '2+' },
    methodId: 'multiple-linear-regression',
    priority: 10,
    rationaleTemplate: 'Multiple regression allows you to predict a continuous outcome from several variables simultaneously, isolating each predictor\'s unique contribution while controlling for the others.',
  },
  // Binary outcome
  {
    id: 'predict-binary',
    conditions: { researchGoal: 'predict', outcomeType: 'binary' },
    methodId: 'binary-logistic-regression',
    priority: 10,
    rationaleTemplate: 'Binary logistic regression predicts the probability of a dichotomous outcome. It produces odds ratios and does not assume normality of predictors.',
  },
  // Ordinal / not sure
  {
    id: 'predict-ordinal',
    conditions: { researchGoal: 'predict', outcomeType: 'ordinal' },
    methodId: 'ordinal-logistic-regression',
    priority: 10,
    rationaleTemplate: 'Ordinal logistic regression preserves the ordered nature of a Likert-scale or other ranked outcome. It avoids the "treating ordinal as continuous" assumption of linear regression.',
  },
  // Categorical outcome
  {
    id: 'predict-categorical',
    conditions: { researchGoal: 'predict', outcomeType: 'categorical' },
    methodId: 'binary-logistic-regression',
    priority: 9,
    rationaleTemplate: 'For a categorical outcome with multiple unordered groups, multinomial logistic regression (an extension of binary logistic regression) is appropriate.',
  },
  {
    id: 'predict-mediation',
    conditions: { researchGoal: 'predict', outcomeType: 'continuous', predictorCount: '2+', dataStructure: 'independent' },
    methodId: 'mediation-moderation',
    supportingMethodId: 'multiple-linear-regression',
    priority: 7,
    rationaleTemplate: 'With multiple predictors and an interest in mechanisms, mediation/moderation analysis may be appropriate alongside multiple regression.',
  },
  // Fallback predict
  {
    id: 'predict-fallback',
    conditions: { researchGoal: 'predict' },
    methodId: 'multiple-linear-regression',
    priority: 1,
    rationaleTemplate: 'Regression analysis is the standard approach for predicting outcomes from one or more variables.',
  },

  // ─── EXPLORE STRUCTURE ───────────────────────────────────────────────────────
  {
    id: 'structure-efa',
    conditions: { researchGoal: 'explore-structure', predictorCount: 'none' },
    methodId: 'efa',
    supportingMethodId: 'cronbachs-alpha',
    priority: 10,
    rationaleTemplate: 'When the factor structure of your scale is unknown, Exploratory Factor Analysis discovers latent dimensions in your items. Follow up with Cronbach\'s Alpha to assess the reliability of identified subscales.',
  },
  {
    id: 'structure-cfa',
    conditions: { researchGoal: 'explore-structure', predictorCount: '1' },
    methodId: 'cfa',
    priority: 10,
    rationaleTemplate: 'When you have a hypothesized factor structure (from theory or prior EFA), CFA tests how well your data fit that model.',
  },
  {
    id: 'structure-sem',
    conditions: { researchGoal: 'explore-structure', predictorCount: '2+' },
    methodId: 'sem',
    priority: 10,
    rationaleTemplate: 'When you want to model relationships between latent constructs, SEM combines measurement (CFA) and structural (path) models in one framework.',
  },
  {
    id: 'structure-reliability',
    conditions: { researchGoal: 'explore-structure', sampleSize: '<30' },
    methodId: 'cronbachs-alpha',
    priority: 6,
    rationaleTemplate: 'With a small sample, a full factor analysis is not recommended. Cronbach\'s Alpha provides a basic reliability check you can run first.',
  },
  {
    id: 'structure-fallback',
    conditions: { researchGoal: 'explore-structure' },
    methodId: 'efa',
    priority: 1,
    rationaleTemplate: 'EFA is typically the starting point when exploring the structure of a scale.',
  },

  // ─── CHANGE OVER TIME ────────────────────────────────────────────────────────
  {
    id: 'change-two-points-continuous',
    conditions: { researchGoal: 'change-over-time', outcomeType: 'continuous', predictorCount: '1' },
    methodId: 'paired-t-test',
    priority: 10,
    rationaleTemplate: 'For pre-test/post-test comparisons with a continuous outcome, the paired t-test is the standard approach — it accounts for the correlation between the two measurements.',
  },
  {
    id: 'change-two-points-ordinal',
    conditions: { researchGoal: 'change-over-time', outcomeType: 'ordinal', predictorCount: '1' },
    methodId: 'wilcoxon',
    priority: 10,
    rationaleTemplate: 'With an ordinal outcome at two time points, the Wilcoxon Signed-Rank Test is the nonparametric equivalent of the paired t-test.',
  },
  {
    id: 'change-multiple-points',
    conditions: { researchGoal: 'change-over-time', outcomeType: 'continuous', predictorCount: '2+' },
    methodId: 'repeated-measures-anova',
    priority: 10,
    rationaleTemplate: 'With three or more time points and a continuous outcome, Repeated Measures ANOVA tests whether the pattern of change across occasions is statistically significant.',
  },
  {
    id: 'change-nested',
    conditions: { researchGoal: 'change-over-time', dataStructure: 'nested' },
    methodId: 'hlm',
    priority: 15,
    rationaleTemplate: 'For longitudinal data with a nested structure, HLM (growth curve modeling) is the most appropriate approach — it models individual trajectories while accounting for group-level clustering.',
  },
  {
    id: 'change-fallback',
    conditions: { researchGoal: 'change-over-time' },
    methodId: 'repeated-measures-anova',
    priority: 1,
    rationaleTemplate: 'Repeated Measures ANOVA is the standard method for testing change across multiple time points.',
  },
];

/**
 * Compute which questions to show based on answers so far.
 * Questions are skipped when they are not relevant to the research goal.
 */
export function computeQuestionSequence(answers: Answers): QuestionId[] {
  const goal = answers.researchGoal;
  const base: QuestionId[] = ['researchGoal'];

  if (!goal) return base;

  // Describe — only need outcome type (to distinguish continuous vs categorical)
  if (goal === 'describe') {
    return [...base, 'outcomeType', 'sampleSize'];
  }

  // Explore structure — outcome type is not meaningful; predictor count acts as
  // "do you have a hypothesized model?" proxy
  if (goal === 'explore-structure') {
    return [...base, 'predictorCount', 'sampleSize'];
  }

  // All other goals: full sequence
  return [...base, 'outcomeType', 'predictorCount', 'dataStructure', 'sampleSize', 'missingData'];
}
