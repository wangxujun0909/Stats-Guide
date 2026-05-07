import { describe, it, expect } from 'vitest';
import { resolveMethod } from './resolver';

describe('resolveMethod', () => {
  it('describe + continuous → descriptive-stats', () => {
    const result = resolveMethod({ researchGoal: 'describe', outcomeType: 'continuous' });
    expect(result.primary.id).toBe('descriptive-stats');
  });

  it('describe + categorical → frequency-tables', () => {
    const result = resolveMethod({ researchGoal: 'describe', outcomeType: 'categorical' });
    expect(result.primary.id).toBe('frequency-tables');
  });

  it('describe + ordinal → frequency-tables', () => {
    const result = resolveMethod({ researchGoal: 'describe', outcomeType: 'ordinal' });
    expect(result.primary.id).toBe('frequency-tables');
  });

  it('compare + nested → hlm (highest priority)', () => {
    const result = resolveMethod({
      researchGoal: 'compare',
      outcomeType: 'continuous',
      predictorCount: '1',
      dataStructure: 'nested',
      sampleSize: '100-500',
    });
    expect(result.primary.id).toBe('hlm');
  });

  it('compare + continuous + independent + large n → independent-t-test', () => {
    const result = resolveMethod({
      researchGoal: 'compare',
      outcomeType: 'continuous',
      predictorCount: '1',
      dataStructure: 'independent',
      sampleSize: '30-100',
    });
    expect(result.primary.id).toBe('independent-t-test');
  });

  it('compare + continuous + independent + small n → mann-whitney-u', () => {
    const result = resolveMethod({
      researchGoal: 'compare',
      outcomeType: 'continuous',
      predictorCount: '1',
      dataStructure: 'independent',
      sampleSize: '<30',
    });
    expect(result.primary.id).toBe('mann-whitney-u');
  });

  it('compare + ordinal + independent + large n → mann-whitney-u', () => {
    const result = resolveMethod({
      researchGoal: 'compare',
      outcomeType: 'ordinal',
      predictorCount: '1',
      dataStructure: 'independent',
      sampleSize: '100-500',
    });
    expect(result.primary.id).toBe('mann-whitney-u');
  });

  it('compare + binary → chi-square', () => {
    const result = resolveMethod({
      researchGoal: 'compare',
      outcomeType: 'binary',
      predictorCount: '1',
      dataStructure: 'independent',
    });
    expect(result.primary.id).toBe('chi-square');
  });

  it('compare + continuous + repeated → repeated-measures-anova', () => {
    const result = resolveMethod({
      researchGoal: 'compare',
      outcomeType: 'continuous',
      dataStructure: 'repeated',
    });
    expect(result.primary.id).toBe('repeated-measures-anova');
  });

  it('compare + ordinal + repeated → wilcoxon', () => {
    const result = resolveMethod({
      researchGoal: 'compare',
      outcomeType: 'ordinal',
      dataStructure: 'repeated',
    });
    expect(result.primary.id).toBe('wilcoxon');
  });

  it('correlate + continuous → pearson-correlation', () => {
    const result = resolveMethod({ researchGoal: 'correlate', outcomeType: 'continuous' });
    expect(result.primary.id).toBe('pearson-correlation');
  });

  it('correlate + ordinal → spearman-correlation', () => {
    const result = resolveMethod({ researchGoal: 'correlate', outcomeType: 'ordinal' });
    expect(result.primary.id).toBe('spearman-correlation');
  });

  it('correlate + categorical → chi-square', () => {
    const result = resolveMethod({ researchGoal: 'correlate', outcomeType: 'categorical' });
    expect(result.primary.id).toBe('chi-square');
  });

  it('predict + nested → hlm', () => {
    const result = resolveMethod({
      researchGoal: 'predict',
      outcomeType: 'continuous',
      dataStructure: 'nested',
    });
    expect(result.primary.id).toBe('hlm');
  });

  it('predict + continuous + 1 predictor → simple-linear-regression', () => {
    const result = resolveMethod({
      researchGoal: 'predict',
      outcomeType: 'continuous',
      predictorCount: '1',
    });
    expect(result.primary.id).toBe('simple-linear-regression');
  });

  it('predict + continuous + multiple predictors → multiple-linear-regression', () => {
    const result = resolveMethod({
      researchGoal: 'predict',
      outcomeType: 'continuous',
      predictorCount: '2+',
      dataStructure: 'independent',
    });
    expect(result.primary.id).toBe('multiple-linear-regression');
  });

  it('predict + binary → binary-logistic-regression', () => {
    const result = resolveMethod({ researchGoal: 'predict', outcomeType: 'binary' });
    expect(result.primary.id).toBe('binary-logistic-regression');
  });

  it('predict + ordinal → ordinal-logistic-regression', () => {
    const result = resolveMethod({ researchGoal: 'predict', outcomeType: 'ordinal' });
    expect(result.primary.id).toBe('ordinal-logistic-regression');
  });

  it('explore-structure + no predictor → efa', () => {
    const result = resolveMethod({ researchGoal: 'explore-structure', predictorCount: 'none' });
    expect(result.primary.id).toBe('efa');
    expect(result.supporting?.id).toBe('cronbachs-alpha');
  });

  it('explore-structure + 1 predictor → cfa', () => {
    const result = resolveMethod({ researchGoal: 'explore-structure', predictorCount: '1' });
    expect(result.primary.id).toBe('cfa');
  });

  it('explore-structure + 2+ predictors → sem', () => {
    const result = resolveMethod({ researchGoal: 'explore-structure', predictorCount: '2+' });
    expect(result.primary.id).toBe('sem');
  });

  it('change-over-time + continuous + 1 predictor → paired-t-test', () => {
    const result = resolveMethod({
      researchGoal: 'change-over-time',
      outcomeType: 'continuous',
      predictorCount: '1',
    });
    expect(result.primary.id).toBe('paired-t-test');
  });

  it('change-over-time + continuous + multiple → repeated-measures-anova', () => {
    const result = resolveMethod({
      researchGoal: 'change-over-time',
      outcomeType: 'continuous',
      predictorCount: '2+',
    });
    expect(result.primary.id).toBe('repeated-measures-anova');
  });

  it('change-over-time + nested → hlm', () => {
    const result = resolveMethod({
      researchGoal: 'change-over-time',
      dataStructure: 'nested',
    });
    expect(result.primary.id).toBe('hlm');
  });

  it('does not flag hasNotSure', () => {
    const result = resolveMethod({ researchGoal: 'predict', outcomeType: 'continuous' });
    expect(result.hasNotSure).toBe(false);
  });
});
