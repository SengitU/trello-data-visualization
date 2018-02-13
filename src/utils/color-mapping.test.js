import { getColorCode } from './color-mapping';

const SKY_BLUE_CODE = '#00c2e0';
const DEFAULT_CODE = '#fff';

describe('getColorCode', () => {
  test('should return exact code for color sky', () => {
    expect(getColorCode("sky")).toBe('#00c2e0');
  });

  test('should return default code for undefined input', () => {
    expect(getColorCode()).toBe(DEFAULT_CODE);
  });

  test('should return default code for unmatched color', () => {
    expect(getColorCode("not_a_color")).toBe(DEFAULT_CODE);
  });
});
