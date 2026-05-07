import type { StatMethod } from './types';

export const methods: Record<string, StatMethod> = {
  'descriptive-stats': {
    id: 'descriptive-stats',
    name: 'Descriptive Statistics',
    oneLiner: 'Summarizes and describes the main features of your dataset using measures like mean, median, and standard deviation.',
    assumptions: [
      'Data has been cleaned and coded consistently',
      'Variables are measured at their intended level (continuous, ordinal, etc.)',
    ],
    alternatives: [
      { id: 'frequency-tables', note: 'When your variables are categorical rather than continuous' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Descriptive Statistics > Descriptives (continuous) or Frequencies (categorical)' },
      { tool: 'R', hint: 'summary(df) or psych::describe(df) for detailed stats' },
      { tool: 'Stata', hint: 'summarize varname or tabstat varname, stats(mean sd min max)' },
    ],
    tags: ['descriptive'],
  },

  'frequency-tables': {
    id: 'frequency-tables',
    name: 'Frequency Tables & Bar Charts',
    oneLiner: 'Counts and displays how often each category occurs in your data.',
    assumptions: [
      'Variables are categorical (nominal or ordinal)',
      'Categories are mutually exclusive and exhaustive',
    ],
    alternatives: [
      { id: 'descriptive-stats', note: 'When summarizing continuous variables' },
      { id: 'cross-tabulation', note: 'When examining the relationship between two categorical variables' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Descriptive Statistics > Frequencies' },
      { tool: 'R', hint: 'table(df$var) or janitor::tabyl(df, var)' },
      { tool: 'Stata', hint: 'tabulate varname' },
    ],
    tags: ['descriptive'],
  },

  'cross-tabulation': {
    id: 'cross-tabulation',
    name: 'Cross-Tabulation (Crosstabs)',
    oneLiner: 'Displays the joint frequency distribution of two or more categorical variables in a contingency table.',
    assumptions: [
      'Both variables are categorical',
      'Observations are independent',
    ],
    alternatives: [
      { id: 'chi-square', note: 'To formally test whether the two variables are associated' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Descriptive Statistics > Crosstabs' },
      { tool: 'R', hint: 'table(df$var1, df$var2) or gmodels::CrossTable()' },
      { tool: 'Stata', hint: 'tabulate var1 var2' },
    ],
    tags: ['descriptive'],
  },

  'independent-t-test': {
    id: 'independent-t-test',
    name: 'Independent Samples t-test',
    oneLiner: 'Compares the means of a continuous outcome between two independent groups.',
    assumptions: [
      'Outcome variable is continuous',
      'Two independent, mutually exclusive groups',
      'Roughly normal distribution within each group (or n ≥ 30 per group)',
      'Homogeneity of variances (check Levene\'s test; use Welch\'s correction if violated)',
    ],
    alternatives: [
      { id: 'mann-whitney-u', note: 'When normality cannot be assumed or sample is small (n < 30)' },
      { id: 'one-way-anova', note: 'When comparing more than two groups' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Compare Means > Independent-Samples T Test' },
      { tool: 'R', hint: 't.test(outcome ~ group, data = df, var.equal = FALSE)' },
      { tool: 'Stata', hint: 'ttest outcome, by(group)' },
    ],
    tags: ['comparison'],
  },

  'paired-t-test': {
    id: 'paired-t-test',
    name: 'Paired Samples t-test',
    oneLiner: 'Compares means between two related measurements (e.g., pre-test and post-test from the same participants).',
    assumptions: [
      'Outcome is continuous',
      'Two related/paired measurements per participant',
      'Differences between pairs are approximately normally distributed',
    ],
    alternatives: [
      { id: 'wilcoxon', note: 'When the differences are not normally distributed or sample is small' },
      { id: 'repeated-measures-anova', note: 'When there are more than two time points' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Compare Means > Paired-Samples T Test' },
      { tool: 'R', hint: 't.test(pre, post, paired = TRUE, data = df)' },
      { tool: 'Stata', hint: 'ttest var1 == var2' },
    ],
    tags: ['comparison', 'repeated'],
  },

  'one-way-anova': {
    id: 'one-way-anova',
    name: 'One-Way ANOVA',
    oneLiner: 'Compares the means of a continuous outcome across three or more independent groups.',
    assumptions: [
      'Outcome variable is continuous',
      'Three or more independent groups',
      'Approximately normal distribution within each group',
      'Homogeneity of variances across groups (Levene\'s test)',
      'Follow up significant results with post-hoc tests (e.g., Tukey HSD)',
    ],
    alternatives: [
      { id: 'kruskal-wallis', note: 'When normality or homogeneity of variance is violated' },
      { id: 'two-way-anova', note: 'When examining two categorical predictors simultaneously' },
      { id: 'ancova', note: 'When controlling for a continuous covariate' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Compare Means > One-Way ANOVA; add Post Hoc tests' },
      { tool: 'R', hint: 'aov(outcome ~ group, data = df); TukeyHSD() for post hoc' },
      { tool: 'Stata', hint: 'oneway outcome group, tabulate bonferroni' },
    ],
    tags: ['comparison'],
  },

  'two-way-anova': {
    id: 'two-way-anova',
    name: 'Two-Way ANOVA',
    oneLiner: 'Examines the effects of two categorical predictors and their interaction on a continuous outcome.',
    assumptions: [
      'Outcome variable is continuous',
      'Two independent categorical predictors',
      'Normality of residuals within each cell',
      'Homogeneity of variances across cells',
      'Adequate cell sizes (n ≥ 5 per cell recommended)',
    ],
    alternatives: [
      { id: 'one-way-anova', note: 'When only one grouping factor is of interest' },
      { id: 'multiple-linear-regression', note: 'More flexible when mixing continuous and categorical predictors' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > General Linear Model > Univariate; add both factors' },
      { tool: 'R', hint: 'aov(outcome ~ factorA * factorB, data = df)' },
      { tool: 'Stata', hint: 'anova outcome factorA##factorB' },
    ],
    tags: ['comparison'],
  },

  'manova': {
    id: 'manova',
    name: 'MANOVA',
    oneLiner: 'Tests whether group membership predicts two or more continuous outcome variables simultaneously.',
    assumptions: [
      'Two or more continuous outcome variables',
      'Independent groups (one or more categorical predictors)',
      'Multivariate normality within groups',
      'Homogeneity of covariance matrices (Box\'s M test)',
      'Outcomes are moderately correlated — if uncorrelated, run separate ANOVAs',
    ],
    alternatives: [
      { id: 'one-way-anova', note: 'When you have only one outcome variable' },
      { id: 'multiple-linear-regression', note: 'When outcomes are treated separately or predictors are continuous' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > General Linear Model > Multivariate' },
      { tool: 'R', hint: 'manova(cbind(y1, y2) ~ group, data = df); summary() with Pillai test' },
      { tool: 'Stata', hint: 'manova y1 y2 = group' },
    ],
    tags: ['comparison'],
  },

  'mann-whitney-u': {
    id: 'mann-whitney-u',
    name: 'Mann-Whitney U Test',
    oneLiner: 'A nonparametric alternative to the independent t-test for comparing two groups when normality cannot be assumed.',
    assumptions: [
      'Outcome is ordinal or continuous',
      'Two independent groups',
      'Both groups come from distributions of the same shape (for median interpretation)',
    ],
    alternatives: [
      { id: 'independent-t-test', note: 'When normality is met and n ≥ 30 per group' },
      { id: 'kruskal-wallis', note: 'When comparing three or more groups' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Nonparametric Tests > Legacy Dialogs > 2 Independent Samples (Mann-Whitney U)' },
      { tool: 'R', hint: 'wilcox.test(outcome ~ group, data = df)' },
      { tool: 'Stata', hint: 'ranksum outcome, by(group)' },
    ],
    tags: ['comparison', 'nonparametric'],
  },

  'kruskal-wallis': {
    id: 'kruskal-wallis',
    name: 'Kruskal-Wallis Test',
    oneLiner: 'A nonparametric alternative to one-way ANOVA for comparing three or more independent groups.',
    assumptions: [
      'Outcome is ordinal or continuous',
      'Three or more independent groups',
      'Observations are independent within and across groups',
      'Follow up with Dunn\'s test for pairwise comparisons',
    ],
    alternatives: [
      { id: 'one-way-anova', note: 'When normality and homogeneity of variance are met' },
      { id: 'mann-whitney-u', note: 'When comparing exactly two groups' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Nonparametric Tests > Legacy Dialogs > K Independent Samples (Kruskal-Wallis)' },
      { tool: 'R', hint: 'kruskal.test(outcome ~ group, data = df); dunn.test::dunn.test() for post hoc' },
      { tool: 'Stata', hint: 'kwallis outcome, by(group)' },
    ],
    tags: ['comparison', 'nonparametric'],
  },

  'wilcoxon': {
    id: 'wilcoxon',
    name: 'Wilcoxon Signed-Rank Test',
    oneLiner: 'A nonparametric alternative to the paired t-test for comparing two related measurements.',
    assumptions: [
      'Two related/paired measurements per participant',
      'Outcome is ordinal or continuous',
      'Differences between pairs are symmetrically distributed around the median',
    ],
    alternatives: [
      { id: 'paired-t-test', note: 'When differences are approximately normally distributed' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Nonparametric Tests > Legacy Dialogs > 2 Related Samples (Wilcoxon)' },
      { tool: 'R', hint: 'wilcox.test(pre, post, paired = TRUE)' },
      { tool: 'Stata', hint: 'signrank var1 == var2' },
    ],
    tags: ['comparison', 'nonparametric', 'repeated'],
  },

  'chi-square': {
    id: 'chi-square',
    name: 'Chi-Square Test of Independence',
    oneLiner: 'Tests whether two categorical variables are statistically independent or associated.',
    assumptions: [
      'Both variables are categorical (nominal or ordinal)',
      'Observations are independent',
      'Expected cell frequency ≥ 5 in at least 80% of cells (use Fisher\'s Exact if violated)',
      'Each participant contributes to only one cell',
    ],
    alternatives: [
      { id: 'cross-tabulation', note: 'For descriptive examination without a significance test' },
      { id: 'binary-logistic-regression', note: 'When you want to control for other variables or predict group membership' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Descriptive Statistics > Crosstabs; check Chi-square in Statistics' },
      { tool: 'R', hint: 'chisq.test(table(df$var1, df$var2)) or fisher.test() for small cells' },
      { tool: 'Stata', hint: 'tabulate var1 var2, chi2' },
    ],
    tags: ['comparison'],
  },

  'pearson-correlation': {
    id: 'pearson-correlation',
    name: 'Pearson Correlation',
    oneLiner: 'Measures the linear relationship between two continuous variables.',
    assumptions: [
      'Both variables are continuous',
      'Linear relationship between variables',
      'Both variables are approximately normally distributed',
      'No significant outliers',
    ],
    alternatives: [
      { id: 'spearman-correlation', note: 'When variables are ordinal or normality is violated' },
      { id: 'simple-linear-regression', note: 'When you want to predict one variable from the other' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Correlate > Bivariate; select Pearson' },
      { tool: 'R', hint: 'cor.test(df$var1, df$var2, method = "pearson")' },
      { tool: 'Stata', hint: 'correlate var1 var2 or pwcorr var1 var2, sig' },
    ],
    tags: ['correlation'],
  },

  'spearman-correlation': {
    id: 'spearman-correlation',
    name: 'Spearman Rank Correlation',
    oneLiner: 'Measures the monotonic relationship between two variables using their ranks; suitable for ordinal data or non-normal distributions.',
    assumptions: [
      'Both variables are at least ordinal',
      'Monotonic (not necessarily linear) relationship',
      'No assumption of normality',
    ],
    alternatives: [
      { id: 'pearson-correlation', note: 'When both variables are continuous and normally distributed' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Correlate > Bivariate; select Spearman' },
      { tool: 'R', hint: 'cor.test(df$var1, df$var2, method = "spearman")' },
      { tool: 'Stata', hint: 'spearman var1 var2' },
    ],
    tags: ['correlation', 'nonparametric'],
  },

  'simple-linear-regression': {
    id: 'simple-linear-regression',
    name: 'Simple Linear Regression',
    oneLiner: 'Predicts a continuous outcome from a single predictor variable.',
    assumptions: [
      'Outcome variable is continuous',
      'Linear relationship between predictor and outcome',
      'Residuals are normally distributed',
      'Homoscedasticity (constant variance of residuals)',
      'Observations are independent',
    ],
    alternatives: [
      { id: 'multiple-linear-regression', note: 'When you have two or more predictors' },
      { id: 'pearson-correlation', note: 'When you only want to measure the strength of the relationship, not predict' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Regression > Linear; enter one predictor' },
      { tool: 'R', hint: 'lm(outcome ~ predictor, data = df); summary() for results' },
      { tool: 'Stata', hint: 'regress outcome predictor' },
    ],
    tags: ['regression'],
  },

  'multiple-linear-regression': {
    id: 'multiple-linear-regression',
    name: 'Multiple Linear Regression',
    oneLiner: 'Predicts a continuous outcome from two or more predictor variables while controlling for each.',
    assumptions: [
      'Outcome variable is continuous',
      'Linear relationship between each predictor and the outcome',
      'Residuals are normally distributed and homoscedastic',
      'No severe multicollinearity among predictors (check VIF < 10)',
      'Observations are independent',
    ],
    alternatives: [
      { id: 'simple-linear-regression', note: 'When you have only one predictor' },
      { id: 'hlm', note: 'When data are nested (students in classrooms, etc.)' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Regression > Linear; enter multiple predictors; check collinearity diagnostics' },
      { tool: 'R', hint: 'lm(outcome ~ pred1 + pred2 + pred3, data = df)' },
      { tool: 'Stata', hint: 'regress outcome pred1 pred2 pred3; estat vif' },
    ],
    tags: ['regression'],
  },

  'binary-logistic-regression': {
    id: 'binary-logistic-regression',
    name: 'Binary Logistic Regression',
    oneLiner: 'Predicts the probability of a binary outcome (yes/no, pass/fail) from one or more predictors.',
    assumptions: [
      'Outcome variable is binary (two categories)',
      'Observations are independent',
      'Little or no multicollinearity among predictors',
      'Large enough sample: at least 10–20 events per predictor variable',
      'No assumption of normality for predictors',
    ],
    alternatives: [
      { id: 'chi-square', note: 'When you only have a single categorical predictor and no covariates' },
      { id: 'ordinal-logistic-regression', note: 'When the outcome has more than two ordered categories' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Regression > Binary Logistic' },
      { tool: 'R', hint: 'glm(outcome ~ pred1 + pred2, data = df, family = binomial)' },
      { tool: 'Stata', hint: 'logit outcome pred1 pred2 or logistic for odds ratios' },
    ],
    tags: ['regression'],
  },

  'ordinal-logistic-regression': {
    id: 'ordinal-logistic-regression',
    name: 'Ordinal Logistic Regression',
    oneLiner: 'Predicts an ordered categorical outcome (e.g., Likert scale) from one or more predictors.',
    assumptions: [
      'Outcome variable is ordinal with 3+ ordered categories',
      'Proportional odds assumption (parallel regression assumption) — test with Brant test',
      'Observations are independent',
      'No severe multicollinearity',
    ],
    alternatives: [
      { id: 'binary-logistic-regression', note: 'When the outcome has only two categories' },
      { id: 'multiple-linear-regression', note: 'Some researchers treat 5+ point Likert scales as continuous — acceptable if distribution is roughly normal' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Regression > Ordinal' },
      { tool: 'R', hint: 'MASS::polr(outcome ~ pred1 + pred2, data = df, Hess = TRUE)' },
      { tool: 'Stata', hint: 'ologit outcome pred1 pred2; brant for proportional odds test' },
    ],
    tags: ['regression'],
  },

  'hlm': {
    id: 'hlm',
    name: 'Hierarchical Linear Modeling (HLM / MLM)',
    oneLiner: 'Models outcomes while accounting for data nested within groups (e.g., students in classrooms, employees in schools).',
    assumptions: [
      'Data has a genuine two-level or higher nested structure',
      'Adequate number of groups at Level 2 (≥ 20 groups recommended)',
      'Level-1 residuals are normally distributed',
      'Random effects are normally distributed at each level',
      'Sufficient within-group sample size at Level 1',
    ],
    alternatives: [
      { id: 'multiple-linear-regression', note: 'Only if the intraclass correlation (ICC) is negligible (< 0.05)' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Mixed Models > Linear (specify subjects and repeated structure)' },
      { tool: 'R', hint: 'lme4::lmer(outcome ~ pred + (1|group), data = df); lmerTest for p-values' },
      { tool: 'Stata', hint: 'mixed outcome pred || group:' },
    ],
    tags: ['regression', 'multilevel'],
  },

  'cronbachs-alpha': {
    id: 'cronbachs-alpha',
    name: "Cronbach's Alpha (Reliability Analysis)",
    oneLiner: 'Measures the internal consistency reliability of a multi-item scale (e.g., how well survey items measure the same construct).',
    assumptions: [
      'All items are intended to measure the same underlying construct',
      'Items are scored in the same direction (reverse-code negatively worded items first)',
      'Items use the same or comparable scale',
      'α ≥ 0.70 is generally acceptable; ≥ 0.80 is good',
    ],
    alternatives: [
      { id: 'efa', note: 'When you want to identify the underlying factor structure first' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Scale > Reliability Analysis; select Alpha' },
      { tool: 'R', hint: 'psych::alpha(df[, scale_items]) for alpha and item statistics' },
      { tool: 'Stata', hint: 'alpha item1 item2 item3, item asis' },
    ],
    tags: ['scale'],
  },

  'efa': {
    id: 'efa',
    name: 'Exploratory Factor Analysis (EFA)',
    oneLiner: 'Uncovers the latent factor structure underlying a set of observed variables without a pre-specified model.',
    assumptions: [
      'Variables are continuous or treated as interval-level',
      'Adequate sample size (rule of thumb: ≥ 5–10 participants per item, minimum n = 100)',
      'Variables are correlated enough for factoring (check KMO ≥ 0.60 and Bartlett\'s test)',
      'Choose extraction method (Principal Axis Factoring common in social science) and rotation (oblique if factors likely correlated)',
    ],
    alternatives: [
      { id: 'cfa', note: 'When you have an a priori theory about the factor structure to confirm' },
      { id: 'cronbachs-alpha', note: 'When you only need to assess reliability of an existing scale' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > Dimension Reduction > Factor; use PAF extraction, Oblimin rotation' },
      { tool: 'R', hint: 'psych::fa(df, nfactors = 3, rotate = "oblimin", fm = "pa")' },
      { tool: 'Stata', hint: 'factor items, pf factors(3); rotate, oblique promax' },
    ],
    tags: ['scale', 'structural'],
  },

  'cfa': {
    id: 'cfa',
    name: 'Confirmatory Factor Analysis (CFA)',
    oneLiner: 'Tests whether a pre-specified factor structure fits your data, typically to validate a scale or measure.',
    assumptions: [
      'A theoretically grounded factor model is specified in advance',
      'Variables are continuous or ordinal with appropriate estimator (MLR, WLSMV)',
      'Adequate sample size (n ≥ 200 recommended; larger with more parameters)',
      'Assess model fit: CFI/TLI ≥ 0.95, RMSEA ≤ 0.06, SRMR ≤ 0.08',
    ],
    alternatives: [
      { id: 'efa', note: 'When the factor structure is unknown or exploratory' },
      { id: 'sem', note: 'When you want to model relationships between latent factors and outcomes' },
    ],
    software: [
      { tool: 'R', hint: 'lavaan::cfa(model, data = df, estimator = "MLR"); summary(fit, fit.measures = TRUE)' },
      { tool: 'SPSS', hint: 'Requires SPSS AMOS (separate module) or use R/Stata instead' },
      { tool: 'Stata', hint: 'sem (Factor -> item1 item2 item3), cov(e.item1*e.item2)' },
    ],
    tags: ['scale', 'structural'],
  },

  'sem': {
    id: 'sem',
    name: 'Structural Equation Modeling (SEM)',
    oneLiner: 'Tests a network of hypothesized relationships among observed and/or latent variables simultaneously.',
    assumptions: [
      'Large sample size (n ≥ 200; more with complex models)',
      'Variables are approximately multivariate normal (or use robust estimator)',
      'The structural model is identified (more observed indicators than parameters)',
      'Evaluate fit indices: CFI/TLI ≥ 0.95, RMSEA ≤ 0.06, SRMR ≤ 0.08',
    ],
    alternatives: [
      { id: 'cfa', note: 'When only validating a measurement model without structural paths' },
      { id: 'multiple-linear-regression', note: 'Simpler and sufficient when variables are observed (not latent)' },
      { id: 'mediation-moderation', note: 'When testing mediation with observed variables only' },
    ],
    software: [
      { tool: 'R', hint: 'lavaan::sem(model, data = df, estimator = "MLR"); semPlot::semPaths() for visualization' },
      { tool: 'SPSS', hint: 'Requires SPSS AMOS (separate module)' },
      { tool: 'Stata', hint: 'sem (path specifications); estat gof for fit indices' },
    ],
    tags: ['structural'],
  },

  'repeated-measures-anova': {
    id: 'repeated-measures-anova',
    name: 'Repeated Measures ANOVA',
    oneLiner: 'Compares a continuous outcome across three or more time points or conditions within the same participants.',
    assumptions: [
      'Outcome variable is continuous',
      'Same participants measured at three or more occasions',
      'Sphericity: equal variances of all pairwise differences (check Mauchly\'s test; apply Greenhouse-Geisser correction if violated)',
      'Approximately normal distribution of residuals',
    ],
    alternatives: [
      { id: 'paired-t-test', note: 'When there are only two time points' },
      { id: 'hlm', note: 'For complex longitudinal designs or missing data at time points' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > General Linear Model > Repeated Measures; define within-subject factor' },
      { tool: 'R', hint: 'aov(outcome ~ time + Error(id/time), data = df_long) or afex::aov_ez()' },
      { tool: 'Stata', hint: 'anova outcome id time, repeated(time)' },
    ],
    tags: ['comparison', 'repeated'],
  },

  'ancova': {
    id: 'ancova',
    name: 'ANCOVA (Analysis of Covariance)',
    oneLiner: 'Compares group means on a continuous outcome while statistically controlling for one or more continuous covariates.',
    assumptions: [
      'Outcome variable is continuous',
      'One categorical grouping variable and one or more continuous covariates',
      'Homogeneity of regression slopes: the covariate\'s relationship to the outcome is the same across groups',
      'Normality of residuals within groups',
      'Covariate is measured reliably and is not affected by group membership',
    ],
    alternatives: [
      { id: 'one-way-anova', note: 'When there is no covariate to control for' },
      { id: 'multiple-linear-regression', note: 'More flexible framing of the same question' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Analyze > General Linear Model > Univariate; add group as Fixed Factor and covariate as Covariate' },
      { tool: 'R', hint: 'lm(outcome ~ group + covariate, data = df) or aov() with the covariate' },
      { tool: 'Stata', hint: 'regress outcome i.group covariate' },
    ],
    tags: ['comparison', 'regression'],
  },

  'mediation-moderation': {
    id: 'mediation-moderation',
    name: 'Mediation & Moderation Analysis',
    oneLiner: 'Tests whether a third variable explains (mediates) or conditions (moderates) the relationship between predictor and outcome.',
    assumptions: [
      'For mediation: predictor → mediator → outcome; use bootstrapped confidence intervals (PROCESS macro)',
      'For moderation: include the interaction term (predictor × moderator) in the regression',
      'Adequate sample size for bootstrapping (n ≥ 200 recommended)',
      'Outcome variable is continuous (for OLS-based approaches)',
    ],
    alternatives: [
      { id: 'multiple-linear-regression', note: 'If mediation/moderation is not a theoretical concern' },
      { id: 'sem', note: 'When mediators are latent variables' },
    ],
    software: [
      { tool: 'SPSS', hint: 'Use Hayes PROCESS macro (Model 4 for mediation, Model 1 for moderation); free download from processmacro.org' },
      { tool: 'R', hint: 'mediation::mediate() for mediation; include interaction term lm(y ~ x*mod) for moderation' },
      { tool: 'Stata', hint: 'mediation or sgmediation for mediation; include c.pred##c.mod in regress for moderation' },
    ],
    tags: ['regression'],
  },

  'consult-advisor': {
    id: 'consult-advisor',
    name: 'Consult Your Advisor',
    oneLiner: 'Your combination of research goals and data characteristics is complex — we recommend discussing your analysis plan with your advisor or a statistician.',
    assumptions: [
      'This tool could not confidently match your answers to a single recommended method',
      'Your research design may require methods not covered here (e.g., time series, survival analysis, Bayesian methods)',
    ],
    alternatives: [],
    software: [
      { tool: 'R', hint: 'Columbia\'s stats consulting lab (CSCU) offers free consultations for graduate students' },
      { tool: 'SPSS', hint: 'TC\'s Academic Computing provides SPSS workshops each semester' },
      { tool: 'Stata', hint: 'Consider booking office hours with your quantitative methods instructor' },
    ],
    tags: ['descriptive'],
  },
};
