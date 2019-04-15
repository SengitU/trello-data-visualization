import { getDoneIssues, extractIssueNumber, getDoneGithubIssues } from './gh-projects';
import { listNames } from '../board-information/lists';

describe('github projects', () => {
    test('it should return all issues with status "done"', () => {
        const issue1 = { number: 1, labels: [{ name: 'tdd' }] };
        const issue2 = { number: 2, labels: [{ name: 'communication' }] };
        const issue3 = { number: 3, labels: [{ name: 'agile-methods' }] };
        const allIssues = [issue1, issue2, issue3];

        const doneCards = [
            { content_url: 'https://www.github.com/api/v3/repos/mheilig/apprenticeship/issues/1' },
            { content_url: 'https://www.github.com/api/v3/repos/mheilig/apprenticeship/issues/3' }
        ];

        expect(getDoneIssues(allIssues, doneCards)).toEqual([issue1, issue3]);
    })

    test('it should ignore issues without a label', () => {
        const issueWithoutLabel = { number: 1, labels: [] };
        const issueWithOneLabel = { number: 2, labels: ['agile-methods'] };
        const issueWithMultipleLabels = { number: 3, labels: ['tdd', 'communication'] };
        const issues = [issueWithoutLabel, issueWithOneLabel, issueWithMultipleLabels];

        const doneCards = [
            { content_url: 'https://www.github.com/api/v3/repos/mheilig/apprenticeship/issues/1' },
            { content_url: 'https://www.github.com/api/v3/repos/mheilig/apprenticeship/issues/2' },
            { content_url: 'https://www.github.com/api/v3/repos/mheilig/apprenticeship/issues/3' }
        ];

        expect(getDoneIssues(issues, doneCards)).toEqual([issueWithOneLabel, issueWithMultipleLabels]);
    })

    test('it should extract the issue number from a card', () => {
        const card = { content_url: 'https://www.github.com/api/v3/repos/mheilig/apprenticeship/issues/17' };
        expect(extractIssueNumber(card)).toBe(17);
    })

    test('it should return all issues from column "Done" which have at least one label', () => {
        const issueFetcher = () => Promise.resolve([
            { number: 1, name: 'Issue #1', labels: [] },
            { number: 2, name: 'Issue #2', labels: [{ name: 'tdd', id: 12 }] },
            { number: 3, name: 'Issue #3', labels: [{ name: 'agile-methods', id: 15 }] },
            { number: 4, name: 'Issue #4', labels: [{ name: 'communication', id: 20 }] },
        ]);

        const doneCardFetcher = () => Promise.resolve([
            { content_url: 'https://github.com/api/v3/repos/mheilig/apprenticeship/issues/1' },
            { content_url: 'https://github.com/api/v3/repos/mheilig/apprenticeship/issues/2' },
            { content_url: 'https://github.com/api/v3/repos/mheilig/apprenticeship/issues/3' },
        ]);

        process.env.REACT_APP_GITHUB_ID_DONE_COLUMN = 123;

        expect.assertions(1);
        getDoneGithubIssues(issueFetcher, doneCardFetcher)
            .then(issuesInTrelloFormat => {
                expect(issuesInTrelloFormat).toEqual({
                    lists: [{ name: listNames.DONE_OVERALL, id: process.env.REACT_APP_GITHUB_ID_DONE_COLUMN }],
                    cards: [
                        {
                            idList: process.env.REACT_APP_GITHUB_ID_DONE_COLUMN,
                            labels: [{
                                color: "sky",
                                id: 12,
                                name: "tdd",
                            }]
                        },
                        {
                            idList: process.env.REACT_APP_GITHUB_ID_DONE_COLUMN,
                            labels: [{
                                color: "orange",
                                id: 15,
                                name: "agile-methods",
                            }]
                        },
                    ]
                });
            });
    })
});
