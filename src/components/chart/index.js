import React, { PureComponent } from 'react';
import { Pie } from 'react-chartjs-2';
import './style.css'

import { formatPieChartData } from '../../utils/format-pie-chart-data'

export default class PieChart extends PureComponent {
  render() {
    const { completedTasks } = this.props;
    const chartData = formatPieChartData(completedTasks);
    return <div className="chart-container">
      {
        completedTasks && chartData && <Pie data={chartData} />
      }
    </div>
  }
}