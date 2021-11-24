import {
  getColorByRulesClassnames,
  getWeightByRulesClassnames
} from '../utils';
import {
  COMPLETE_STATE,
  INCOMPLETE_STATE,
  DEFAULT_STATE,
  COMPLETE_STATUS,
  DEFAULT_STATUS,
  INCOMPLETE_STATUS
} from '../constants';

describe('utils', () => {
  const classnamesByStatus = {
    [DEFAULT_STATUS]: 'with-foo-idle',
    [COMPLETE_STATUS]: 'with-foo-complete',
    [INCOMPLETE_STATUS]: 'with-foo-complete'
  };

  describe('getWeightByRulesClassnames()', () => {
    it('should return an object mapping classes to state values', () => {
      expect(getWeightByRulesClassnames(classnamesByStatus)).toEqual({
        [DEFAULT_STATE]: 'with-foo-idle',
        [COMPLETE_STATE]: 'with-foo-complete',
        [INCOMPLETE_STATE]: 'with-foo-complete'
      });
    });
  });

  describe('getColorByRulesClassnames()', () => {
    it('should return an object mapping classes to state values', () => {
      expect(getColorByRulesClassnames(classnamesByStatus)).toEqual({
        [DEFAULT_STATE]: 'with-foo-idle',
        [COMPLETE_STATE]: 'with-foo-complete',
        [INCOMPLETE_STATE]: 'with-foo-complete'
      });
    });
  });
});
