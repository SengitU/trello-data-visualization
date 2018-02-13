// TODO: Find out why webpack alias does not works
import testData from '../data/test-data';
import { filterWeeklyCompletedTasks, filterOverallCompletedTasks } from './filter-tasks';

describe('filterTasks', () => {
  test('should return 0 weekly completed tasks for given data', () => {
    expect(filterWeeklyCompletedTasks(testData).length).toBe(0);
  })

  test('should return 19 overall completed tasks for given data', () => {
    expect(filterOverallCompletedTasks(testData).length).toBe(19);
  })
});
