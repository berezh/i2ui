import { NumberUtil, SplitedNumberOptionsProps, SplitedNumberGroupProps } from '../../src/utils';

const testSeparator = '|';

function textSplitNumber(value: number, options: SplitedNumberOptionsProps, ...splits: SplitedNumberGroupProps[]) {
    expect(NumberUtil.splitNumber(value, options)).toMatchObject<SplitedNumberGroupProps[]>(splits);
}

it('NumberUtil.splitNumber', () => {
    textSplitNumber(0, {}, { text: '0' });
    textSplitNumber(1, {}, { text: '1' });
    textSplitNumber(12, {}, { text: '12' });
    textSplitNumber(123, {}, { text: '123' });
    textSplitNumber(1234, {}, { text: '1' }, { text: '234', separator: ',' });
});

it('NumberUtil.splitNumber decimalDigits', () => {
    textSplitNumber(0.1, {}, { text: '0' });
    textSplitNumber(0.1, { decimalDigits: 1 }, { text: '0' }, { text: '1', separator: '.' });
    textSplitNumber(0.1, { decimalDigits: 2 }, { text: '0' }, { text: '10', separator: '.' });

    textSplitNumber(0.123, { decimalDigits: 1 }, { text: '0' }, { text: '1', separator: '.' });
});

it('NumberUtil.splitNumber groupSeparator', () => {
    textSplitNumber(1234, { groupSeparator: testSeparator }, { text: '1' }, { text: '234', separator: testSeparator });
});

it('NumberUtil.splitNumber decimalSeparator', () => {
    textSplitNumber(
        0.1,
        { decimalDigits: 1, decimalSeparator: testSeparator },
        { text: '0' },
        { text: '1', separator: testSeparator }
    );
});
