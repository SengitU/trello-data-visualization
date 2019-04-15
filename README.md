# Data Visualization Over Trello

Project aims to visualize amount of tasks completed on each category. To see actual board, follow [this](https://trello.com/b/KlLdup7o/ugurcan-sengit-apprenticeship-board) link.

You can find a live demo [here](https://gracious-booth-c323f1.netlify.com/)

Useful commands:

- `npm install` to install dependencies,
- `npm run start` to run project locally,
- `npm run test` to run tests

## Setup environment for Github-Projects
In order to make this app work with github-projects you have to define the following environment variables:

1. REACT_APP_GITHUB_API_URL='GITHUB API URL GOES HERE (e.g. https://api.github.com)'
2. REACT_APP_GITHUB_USERNAME='YOUR GITHUB USERNAME GOES HERE'
3. REACT_APP_GITHUB_TOKEN='AUTHORIZATION TOKEN GOES HERE'
4. REACT_APP_ID_DONE_COLUMN=ID OF DONE COLUMN (check https://gist.github.com/markusheilig/2e9765a91bd450a3113aecfaa7a98d43)
5. REACT_APP_GITHUB_ID_PROJECT=ID OF GITHUB PROJECT (check https://gist.github.com/markusheilig/2e9765a91bd450a3113aecfaa7a98d43)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).