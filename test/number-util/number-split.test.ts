import { NumberUtil, SplitedNumberOptionsProps, SplitedNumberGroupProps } from '../../src/utils';

const testSeparator = '|';

function textSplitNumber(
  value: number | undefined,
  options: SplitedNumberOptionsProps,
  ...splits: SplitedNumberGroupProps[]
) {
  expect(NumberUtil.splitNumber(value, options)).toMatchObject<SplitedNumberGroupProps[]>(splits);
}

describe('NumberUtil', () => {
  it('splitNumber', () => {
    textSplitNumber(0, {}, { text: '0' });
    textSplitNumber(1, {}, { text: '1' });
    textSplitNumber(12, {}, { text: '12' });
    textSplitNumber(123, {}, { text: '123' });
    textSplitNumber(1234, {}, { text: '1' }, { text: '234', separator: ',' });
  });

  it('splitNumber decimalDigits', () => {
    textSplitNumber(0.1, {}, { text: '0' });
    textSplitNumber(0.1, { decimalDigits: 1 }, { text: '0' }, { text: '1', separator: '.' });
    textSplitNumber(0.1, { decimalDigits: 2 }, { text: '0' }, { text: '10', separator: '.' });

    textSplitNumber(0.123, { decimalDigits: 1 }, { text: '0' }, { text: '1', separator: '.' });
  });

  describe('splitNumber.groupSeparator', () => {
    it('default', () => {
      textSplitNumber(1234, { groupSeparator: undefined }, { text: '1' }, { text: '234', separator: ',' });
    });

    it('custom', () => {
      textSplitNumber(
        1234,
        { groupSeparator: testSeparator },
        { text: '1' },
        { text: '234', separator: testSeparator }
      );
    });

    it('[empty]', () => {
      textSplitNumber(1234, { groupSeparator: '' }, { text: '1' }, { text: '234', separator: '' });
    });
  });

  it('splitNumber decimalSeparator', () => {
    textSplitNumber(
      0.1,
      { decimalDigits: 1, decimalSeparator: testSeparator },
      { text: '0' },
      { text: '1', separator: testSeparator }
    );
  });

  it('splitNumber undefined', () => {
    textSplitNumber(undefined, { decimalDigits: 1, decimalSeparator: testSeparator });
  });
});
