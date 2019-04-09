import React, { Component } from 'react';
import PieChart from './components/chart';
import './App.css';

import { filterOverallCompletedTasks, filterWeeklyCompletedTasks } from './services/filter-tasks'
import { getDoneGithubIssues } from './services/gh-projects';
import { weightTasks } from './services/weight-tasks';

const URL_TO_BOARD = `https://trello.com/b/KlLdup7o.json`;

class App extends Component {
  constructor(args) {
    super(args);

    this.state = {};
    this.calculateTasks = this.calculateTasks.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasksFromTrello() {
    fetch(URL_TO_BOARD).then(response => response.json()).then(json => {      
      this.setState({ ...this.state, data: json });
    })
  }

  fetchTasksFromGithubProjects() {
    getDoneGithubIssues().then(doneIssues => {
      this.setState({ ...this.state, data: doneIssues });
    })    
  }

  useGithubProjectsBoard() {
    const queryParameters = new URLSearchParams(window.location.search);
    return queryParameters.get('boardType') === 'githubProjects';    
  }

  fetchTasks() {
    if (this.useGithubProjectsBoard()) {
      this.fetchTasksFromGithubProjects();
    } else {      
      this.fetchTasksFromTrello();
    }
  }

  isTaskWeightingEnabled() {
    const queryParameters = new URLSearchParams(window.location.search);
    return queryParameters.get('weightTasks') === 'true';    
  }

  calculateTasks() {
    const filteredTasks = filterOverallCompletedTasks(this.state.data);
    if (this.isTaskWeightingEnabled()) {
      return weightTasks(filteredTasks);
    } else {
      return filteredTasks;
    }    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Data Visualisation Over Trello Board</h1>
        </header>
        {
          this.state.data && <PieChart completedTasks={this.calculateTasks()} />
        }
      </div>
    );
  }
}

export default App;
