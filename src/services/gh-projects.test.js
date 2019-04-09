import { getDoneIssues, extractIssueNumber, fetchAllIssues } from './gh-projects';

describe('github projects', () => {
    test('it should return all issues with status "done"', () => {
        const issue1 = {
            number: 1,
            labels: ['tdd']
        };
        const issue2 = {
            number: 2,
            labels: ['communication']
        };
        const issue3 = {
            number: 3,
            labels: ['agile-methods']
        };

        const issues = [issue1, issue2, issue3];
    
        const cards = [
            {
                content_url: 'https://github.hc.ag/api/v3/repos/mheilig/apprenticeship/issues/1'
            },
            {
                content_url: 'https://github.hc.ag/api/v3/repos/mheilig/apprenticeship/issues/3'
            }
        ];
        
        expect(getDoneIssues(issues, cards)).toEqual([issue1, issue3]);
    })

    test('it should not return done issues without a label', () => {
        const issue1 = {
            number: 1,
            labels: []
        };
        const issue2 = {
            number: 2,
            labels: ['agile-methods']
        };
        const issues = [issue1, issue2];

        const cards = [
            {
                content_url: 'https://github.hc.ag/api/v3/repos/mheilig/apprenticeship/issues/1'
            },
            {
                content_url: 'https://github.hc.ag/api/v3/repos/mheilig/apprenticeship/issues/2'
            }
        ];
        
        expect(getDoneIssues(issues, cards)).toEqual([issue2]);
    })

    test('it should extract the issue number from a card', () => {
        const card = {
            content_url: 'https://github.hc.ag/api/v3/repos/mheilig/apprenticeship/issues/17'
        };
        expect(extractIssueNumber(card)).toBe(17);
    })
});
  