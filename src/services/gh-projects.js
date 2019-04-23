import { listNames } from '../board-information/lists';
import GitHub from 'github-api';

const githubCredentials = {
    username: process.env.REACT_APP_GITHUB_USERNAME,
    token: process.env.REACT_APP_GITHUB_TOKEN
};
const githubClient = new GitHub(githubCredentials, process.env.REACT_APP_GITHUB_API_URL);

const labelColors = {
    'tdd': 'sky',
    'softwaredesign': 'blue',
    'communication': 'lime',
    'agile-methods': 'orange',
    'learning': 'green',
    'tools': 'black',
    'organizational stuff': 'yellow',
};

const fetchAllIssues = () => {
    return githubClient
        .getIssues(process.env.REACT_APP_GITHUB_USERNAME, process.env.REACT_APP_GITHUB_REPO_NAME)
        .listIssues()
        .then(response => response.data);
};

const fetchDoneCards = () => {
    return githubClient
        .getProject(process.env.REACT_APP_GITHUB_ID_PROJECT)
        .listColumnCards(process.env.REACT_APP_GITHUB_ID_DONE_COLUMN)
        .then(response => response.data);
};

const convertIssuesToTrelloModel = (issues) => {
    const idDoneColumn = process.env.REACT_APP_GITHUB_ID_DONE_COLUMN;

    const lists = [{
        name: listNames.DONE_OVERALL,
        id: idDoneColumn
    }];

    const cards = issues.map(issue => {
        const labels = issue.labels.map(label => {
            return {
                color: labelColors[label.name],
                id: label.id,
                name: label.name
            };
        });
        return {
            idList: idDoneColumn, labels: labels
        }
    });

    return { lists, cards };
};

export const extractIssueNumber = (card) => {
    return +card.content_url.match(/\d+$/)[0];
};

export const getDoneIssues = (issues, cards) => {
    const doneIssueIds = cards.map(extractIssueNumber);
    return issues.filter(issue => issue.labels && issue.labels.length > 0 && doneIssueIds.includes(issue.number));
};

export const getDoneGithubIssues = (allIssueFetcher = fetchAllIssues, doneCardsFetcher = fetchDoneCards) => {
    return Promise.all([allIssueFetcher(), doneCardsFetcher()])
        .then((values) => {
            const [allIssues, doneCards] = values;
            const doneIssues = getDoneIssues(allIssues, doneCards);
            return convertIssuesToTrelloModel(doneIssues);
        });
};
