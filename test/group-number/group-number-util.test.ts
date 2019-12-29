import { NumberUtil } from '../../src/utils';

it('NumberUtil.toGroups general', () => {
    expect(NumberUtil.toGroups('0')).toMatchObject(['0']);
    expect(NumberUtil.toGroups('12')).toMatchObject(['12']);
    expect(NumberUtil.toGroups('123')).toMatchObject(['123']);
    expect(NumberUtil.toGroups('1234')).toMatchObject(['1', '234']);
    expect(NumberUtil.toGroups('12345')).toMatchObject(['12', '345']);
    expect(NumberUtil.toGroups('123456')).toMatchObject(['123', '456']);
    expect(NumberUtil.toGroups('1234567')).toMatchObject(['1', '234', '567']);
});

it('NumberUtil.toGroups groupDigits', () => {
    // zero
    expect(NumberUtil.toGroups('123', 0)).toMatchObject(['123']);

    expect(NumberUtil.toGroups('123', 1)).toMatchObject(['1', '2', '3']);
    expect(NumberUtil.toGroups('123', 2)).toMatchObject(['1', '23']);
    expect(NumberUtil.toGroups('12345', 4)).toMatchObject(['1', '2345']);

    // minus
    expect(NumberUtil.toGroups('123', -2)).toMatchObject(['1', '23']);
});
