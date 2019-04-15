import { listNames } from '../board-information/lists';
import GitHub from 'github-api';

const labelColors = {
    'tdd': 'sky',
    'softwaredesign': 'blue',
    'communication': 'lime',
    'agile-methods': 'orange',
    'learning': 'green',
    'tools': 'black',
    'organizational stuff': 'yellow',
};

const getDoneColumnId = () => {
    return process.env.REACT_APP_GITHUB_ID_DONE_COLUMN;
};

const getGithubApiUrl = () => {
    return process.env.REACT_APP_GITHUB_API_URL;
};

const createAuthorizedHttpHeader = () => {
    const username = process.env.REACT_APP_GITHUB_USERNAME;
    const token = process.env.REACT_APP_GITHUB_TOKEN;   
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ":" + token));    
    return headers;
};

const fetchAllIssues = () => {
    const credentials = {
        username: process.env.REACT_APP_GITHUB_USERNAME,
        token: process.env.REACT_APP_GITHUB_TOKEN
    };
    const gh = new GitHub(credentials, process.env.REACT_APP_GITHUB_API_URL);
    return gh.getIssues(process.env.REACT_APP_GITHUB_USERNAME, 'apprenticeship')
        .listIssues()
        .then(response => response.data);
};

const fetchDoneCards = () => {
    const headers = createAuthorizedHttpHeader();

    // The Projects API is currently available for developers to preview.    
    // To access the API during the preview period, we have provide a custom media type in the Accept header.
    //  - for more information visit https://developer.github.com/v3/projects/
    headers.append('Accept', 'application/vnd.github.inertia-preview+json');

    const cardsUrl = `${getGithubApiUrl()}/projects/columns/${getDoneColumnId()}/cards`;
    return fetch(cardsUrl, { headers })
      .then(response => response.json());    
};

const convertIssuesToTrelloModel = (issues) => {    
    const idDoneColumn = getDoneColumnId();

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
            const allIssues = values[0];
            const doneCards = values[1];
            const doneIssues = getDoneIssues(allIssues, doneCards);
            return convertIssuesToTrelloModel(doneIssues);
        });
};
