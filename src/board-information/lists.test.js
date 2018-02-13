import testData from '../data/test-data';
import { getListId, listNames } from './lists';

describe('getListId', () => {
  test('should return identifier of the list', () => {
    expect(getListId(testData, listNames.DONE_OVERALL)).toBe("5a733b4ed468aab4c119cc8d");
  });

  test('should return undefined if such list does not exists', () => {
    expect(getListId(testData, "Does not exists")).toBeUndefined();
  });
});
