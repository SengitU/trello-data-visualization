import { getWeightFactor, removeWeightFactor, weightTask } from './weight-tasks';

describe('weight tasks', () => {
    test('it should return 1 as weight factor when a task has no weight label', () => {
        const task = { labels: [{color: 'green', id: 'green', name: 'tdd'}] };
        expect(getWeightFactor(task)).toBe(1);
    })
    test('it should return 2 as weight factor when a task has a label "L"', () => {
        const task = { labels: [{color: 'green', id: '1', name: 'tdd'}, {color: 'red', id: '2', name: 'L'}] };
        expect(getWeightFactor(task)).toBe(2);
    })
    test('it should return 3 as weight factor when a task has a label "XL"', () => {
        const task = { labels: [{color: 'green', id: '0', name: 'tdd'}, {color: 'red', id: '2', name: 'XL'}] };
        expect(getWeightFactor(task)).toBe(3);
    })
    test('it should remove the weight factor of a task', () => {
        const taskWithWeightFactor = { labels: [{color: 'green', id: '0', name: 'tdd'}, {color: 'red', id: '2', name: 'XL'}] };
        const taskWithoutWeightFactor = { labels: [{color: 'green', id: '0', name: 'tdd'}] };
        expect(removeWeightFactor(taskWithWeightFactor)).toEqual(taskWithoutWeightFactor.labels);
    })
    test('it should weight a task by a weight factor', () => {
        const unweightedTask = { labels: [{color: 'green', id: '0', name: 'tdd'}, {color: 'red', id: '2', name: 'L'}] };
        const weightedTask = { labels: [{color: 'green', id: '0', name: 'tdd'}, {color: 'green', id: '0', name: 'tdd'}] };
        expect(weightTask(unweightedTask)).toEqual(weightedTask);
    })
})